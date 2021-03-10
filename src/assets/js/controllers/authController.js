/**
 * Controller responsible for all events in view and setting data
 *
 * @author Pim Meijer
 */
class AuthController {

    constructor(isLogged) {
        this.isLogged = isLogged;

        $.get("views/authbox.html")
         .done((data) => {
             this.setup(data)
         })
         .fail(() => this.error());
    }

    //Called when the login.html has been loaded
    async setup(data) {
        //Load the login-content into memory
        const authBox = $(data);

        if (this.isLogged) {

            const user = await this.fetchUser(sessionManager.get("userID"));

            console.log(user);

            authBox.find("#pills-profile-tab").addClass("active");
            authBox.find("#pills-login").removeClass("active show");
            authBox.find("#pills-profile").addClass("active show");

            authBox.find("#pills-login-tab").remove();
            authBox.find("#pills-registration-tab").remove();

            authBox.find("#logout-btn").on("click", this.handleLogout);

            authBox.find("#user-name").html(user.firstname + " " + user.lastname);
            authBox.find("#user-email").html(user.email);


            if (user.favorites) {
                authBox.find('.masonry').html(user.favorites.map(FavoriteBrick).join(''));
            } else {
                authBox.find('.masonry').html("U hebt geen favorieten spellen.");
            }

        } else {

            authBox.find("#pills-profile-tab").remove();
            authBox.find("#pills-favorites-tab").remove();

            authBox.find(".login-form").on("submit", this.handleLogin);
            authBox.find(".register-form").on("submit", this.handleRegistration);
        }


        $(".authbox").empty().append(authBox);
    }


    /**
     * Async function that does a login request via repository
     * @param event
     */
    async handleLogin(event) {
        try {

            //prevent actual submit and page refresh
            event.preventDefault();

            const userRepository = new UserRepository();


            //Find the username and password
            const email    = $(this).find("[name='login-email']").val();
            const password = $(this).find("[name='login-password']").val();

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
            const user = await userRepository.login(email, password);

            sessionManager.set("userID", user.userID);
            notificationManager.alert("success", "U wordt ingelogd!");
            location.reload();
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

            const userRepository = new UserRepository();

            const firstName      = $(this).find("[name='register-firstname']").val();
            const lastName       = $(this).find("[name='register-lastname']").val();
            const email          = $(this).find("[name='register-email']").val();
            const password       = $(this).find("[name='register-password']").val();
            const passwordRepeat = $(this).find("[name='register-passwordrepeat']").val();


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
            const user = await userRepository.register(firstName.toLowerCase(), lastName.toLowerCase(), email.toLowerCase(), password);

            notificationManager.alert("success", "U bent geregistreerd!");
            sessionManager.set("userID", user.userID);
            location.reload();
        } catch (e) {
            if (e.code === 401) {
                notificationManager.alert("error", e.reason);
            } else {
                console.log(e);
            }
        }
    }

    async handleLogout() {
        const userRepository = new UserRepository();
        userRepository.logout();
        location.reload();
    }

    async fetchUser(id) {
        try {
            const userRepository = new UserRepository();
            return await userRepository.get(id);
        } catch (e) {
            console.log(e);
        }
    }

    //Called when the login.html failed to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
