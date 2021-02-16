const CONTROLLER_AUTH = "authentication";

const sessionManager = new SessionManager();
const networkManager = new NetworkManager();

class App {

    init() {
        //Always load the sidebar
        this.loadController(CONTROLLER_AUTH);

        // //Attempt to load the controller from the URL, if it fails, fall back to the welcome controller.
        // this.loadControllerFromUrl(CONTROLLER_AUTH);


    }

    /**
     * Loads a controller
     * @param name - name of controller - see constants
     * @param controllerData - data to pass from on controller to another
     * @returns {boolean} - successful controller change
     */
    loadController(name, controllerData) {
        console.log("loadController: " + name);

        if (controllerData) {
            console.log(controllerData);
        } else {
            controllerData = {};
        }

        switch (name) {
            case CONTROLLER_AUTH:
                this.setCurrentController(name);
                new AuthController();
                this.isLoggedIn(() => console.log("Logged in"), () => console.log("Not Logged in"));
                break;
            default:
                return false;
        }

        return true;
    }

    /**
     * Alternative way of loading controller by url
     * @param fallbackController
     */
    loadControllerFromUrl(fallbackController) {
        const currentController = this.getCurrentController();

        if (currentController) {
            if (!this.loadController(currentController)) {
                this.loadController(fallbackController);
            }
        } else {
            this.loadController(fallbackController);
        }
    }

    getCurrentController() {
        return location.hash.slice(1);
    }

    setCurrentController(name) {
        location.hash = name;
    }

    /**
     * Convenience functions to handle logged-in states
     * @param whenYes - function to execute when user is logged in
     * @param whenNo - function to execute when user is logged in
     */
    isLoggedIn(whenYes, whenNo) {
        if (sessionManager.get("username")) {
            whenYes();
        } else {
            whenNo();
        }
    }
}

const app = new App();

//When the DOM is ready, kick off our application.
$(function () {
    app.init();
});
