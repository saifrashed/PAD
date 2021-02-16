class AuthController {

    constructor() {
        this.authRepository = new AuthRepository();

        this.setup();
    }

    setup(data) {
        this.authView = $("#authenticationBox");

        this.authView.find("#loginForm").on("submit", (e) => this.handleLogin(e));
        this.authView.find("#logoutBtn").on("click", (e) => this.handleLogout(e));
    }

    async handleLogin(event) {
        try {

            event.preventDefault();

            const username = this.authView.find("[name='username']").val();
            const password = this.authView.find("[name='password']").val();

            const user = await this.authRepository.login(username, password);

            sessionManager.set("username", user.username);


            this.success("Welkom: " + user.username);

            // app.loadController(CONTROLLER_WELCOME);

        } catch (e) {
            if (e.code === 401) {
                this.authView
                    .find(".error")
                    .html(e.reason);

                this.error("Oops... Er is wat misgegaan.");
            } else {
                console.log(e);
                this.error("Inloggen is mislukt");
            }
        }
    }

    /**
     * Removes username via sessionManager and loads the login screen
     */
    handleLogout() {
        sessionManager.remove("username");
    }


    //Called when the login.html failed to load
    success(message) {
        notie.alert({type: 'success', text: message, position: 'bottom'})
    }

    //Called when the login.html failed to load
    error(message) {
        notie.alert({type: 'error', text: message, position: 'bottom'})
    }
}
