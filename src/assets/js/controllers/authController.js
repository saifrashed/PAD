/**
 * Controller responsible for all events in view and setting data
 *
 * @author Pim Meijer
 */
class AuthController {

    constructor() {
        this.userRepository      = new UserRepository();
        this.notificationManager = new NotificationManager();

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
            const email    = this.authView.find("[name='email']").val();
            const password = this.authView.find("[name='password']").val();

            //await keyword 'stops' code until data is returned - can only be used in async function
            const user = await this.userRepository.login(email, password);

            sessionManager.set("userID", user.userID);
            this.notificationManager.alert("success", "U wordt ingelogd!");

        } catch (e) {
            if (e.code === 401) {
                this.notificationManager.alert("error", e.reason);
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


            const firstName      = this.authView.find("[name='firstname']").val().toLowerCase();
            const lastName       = this.authView.find("[name='lastname']").val().toLowerCase();
            const email          = this.authView.find("[name='user-email']").val().toLowerCase();
            const password       = this.authView.find("[name='user-password']").val();
            const passwordRepeat = this.authView.find("[name='user-passwordrepeat']").val();


            // Check if value exists
            if (!firstName || !lastName || !email || !password) {
                this.notificationManager.alert("warning", "Vul alle velden in!");
                return false;
            }

            // Check email
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(mailformat)) {
                this.notificationManager.alert("warning", "Email is niet correct!");
                return false;
            }

            if (password.length < 6) {
                this.notificationManager.alert("warning", "Wachtwoord is te kort!");
                return false;
            }

            if (password != passwordRepeat) {
                this.notificationManager.alert("warning", "Wachtwoorden komen niet overeen!");
                return false;
            }


            //await keyword 'stops' code until data is returned - can only be used in async function
            const user = await this.userRepository.register(firstName, lastName, email, password);

            this.notificationManager.alert("success", "U bent geregistreerd!");
            sessionManager.set("userID", user.userID);

        } catch (e) {
            if (e.code === 401) {
                this.notificationManager.alert("error", e.reason);
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
