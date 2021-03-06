/**
 * Controller responsible for all events in view and setting data
 *
 * @author Pim Meijer
 */
class AuthController {

    constructor() {
        this.userRepository = new UserRepository();

        $.get("views/navbar.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    //Called when the login.html has been loaded
    setup(data) {
        //Load the login-content into memory
        this.authView = $(".authentication");

        this.authView.find(".login-form").on("submit", (e) => this.handleLogin(e));
        this.authView.find(".register-form").on("submit", (e) => this.handleRegistration(e));

    }

    /**
     * Async function that does a login request via repository
     * @param event
     */
    async handleLogin(event) {
        try {
            //prevent actual submit and page refresh
            event.preventDefault();

            //Find the username and password
            const email    = this.authView.find("[name='login-email']").val();
            const password = this.authView.find("[name='login-password']").val();


            // Check if value exists
            if (!email || !password) {
                notificationManager.alert("warning", "Vul alle velden in!");
                return false;
            }

            // Check email
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(mailformat)) {
                notificationManager.alert("warning", "Email is niet correct!");
                return false;
            }

            if (password.length < 6) {
                notificationManager.alert("warning", "Wachtwoord is te kort!");
                return false;
            }

            //await keyword 'stops' code until data is returned - can only be used in async function
            const user = await this.userRepository.login(email, password);

            sessionManager.set("userID", user.userID);
            notificationManager.alert("success", "U wordt ingelogd!");

        } catch (e) {
            if (e.code === 401) {
                notificationManager.alert("error", e.reason);
            } else {
                console.log(e);
            }
        }
    }

    /**
     * Async function that does a login request via repository
     * @param event
     */
    async handleRegistration(event) {
        try {

            //prevent actual submit and page refresh
            event.preventDefault();


            const firstName      = this.authView.find("[name='register-firstname']").val().toLowerCase();
            const lastName       = this.authView.find("[name='register-lastname']").val().toLowerCase();
            const email          = this.authView.find("[name='register-email']").val().toLowerCase();
            const password       = this.authView.find("[name='register-password']").val();
            const passwordRepeat = this.authView.find("[name='register-passwordrepeat']").val();


            // Check if value exists
            if (!firstName || !lastName || !email || !password) {
                notificationManager.alert("warning", "Vul alle velden in!");
                return false;
            }

            // Check email
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(mailformat)) {
                notificationManager.alert("warning", "Email is niet correct!");
                return false;
            }

            if (password.length < 6) {
                notificationManager.alert("warning", "Wachtwoord is te kort!");
                return false;
            }

            if (password != passwordRepeat) {
                notificationManager.alert("warning", "Wachtwoorden komen niet overeen!");
                return false;
            }


            //await keyword 'stops' code until data is returned - can only be used in async function
            const user = await this.userRepository.register(firstName, lastName, email, password);

            notificationManager.alert("success", "U bent geregistreerd!");
            sessionManager.set("userID", user.userID);

        } catch (e) {
            if (e.code === 401) {
                notificationManager.alert("error", e.reason);
            } else {
                console.log(e);
            }
        }
    }


    //Called when the login.html failed to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
