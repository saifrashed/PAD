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
        this.authBox = $(data);

        if (this.isLogged) {

            this.user = await this.fetchUser(sessionManager.get("userID"));

            console.log(this.user);

            this.authBox.find("#pills-profile-tab").addClass("active");
            this.authBox.find("#pills-login").removeClass("active show");
            this.authBox.find("#pills-profile").addClass("active show");

            this.authBox.find("#pills-login-tab").remove();
            this.authBox.find("#pills-registration-tab").remove();

            this.authBox.find("#logout-btn").on("click", this.handleLogout);

            this.authBox.find("#user-name").html(this.user.firstname + " " + this.user.lastname);
            this.authBox.find("#user-username").html("@" + this.user.username);


            await this.handleRenderFav();

        } else {

            this.authBox.find("#pills-profile-tab").remove();
            this.authBox.find("#pills-favorites-tab").remove();
            this.authBox.find("#pills-lessons-tab").remove();

            this.authBox.find(".login-form").on("submit", this.handleLogin);
            this.authBox.find(".register-form").on("submit", this.handleRegistration);
        }


        $(".authbox").empty().append(this.authBox);
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
            const username = $(this).find("[name='login-username']").val();
            const password = $(this).find("[name='login-password']").val();

            // Check if value exists
            if (!username || !password) {
                notificationManager.alert("warning", "Vul alle velden in!");
                return false;
            }


            if (password.length < 6) {
                notificationManager.alert("warning", "Wachtwoord is te kort!");
                return false;
            }

            //await keyword 'stops' code until data is returned - can only be used in async function
            const user = await userRepository.login(username, password);

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
            const username       = $(this).find("[name='register-username']").val();
            const password       = $(this).find("[name='register-password']").val();
            const passwordRepeat = $(this).find("[name='register-passwordrepeat']").val();

            // Check if value exists
            if (!firstName || !lastName || !username || !password) {
                notificationManager.alert("warning", "Vul alle velden in!");
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
            const user = await userRepository.register(firstName.toLowerCase(), lastName.toLowerCase(), username.toLowerCase(), password);

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

    async handleRenderFav() {
        try {
            this.user = await this.fetchUser(sessionManager.get("userID"));

            if (this.user.favorites) {
                this.authBox.find('.masonry').html(this.user.favorites.map(FavoriteBrick).join(''));
                this.authBox.find(".remove-favorite").on("click", (e) => this.handleDeleteFav(e));
            } else {
                this.authBox.find('.masonry').html("<div style='margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);'>U hebt nog geen favorieten </div>");
            }
        } catch (e) {
            console.log(e);
        }
    }

    async handleDeleteFav(e) {
        try {
            const userRepository = new UserRepository();
            const userID         = sessionManager.get("userID");
            const gameID         = $(e.target).parent().siblings().attr("data-id");

            await userRepository.deleteFavorite(userID, gameID);
            await this.handleRenderFav();

            notificationManager.alert("success", 'Verwijderd van favorieten');
        } catch (e) {
            console.log(e);
        }
    }

    //Called when the login.html failed to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
