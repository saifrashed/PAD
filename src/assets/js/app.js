/**
 * Entry point front end application - there is also an app.js for the backend (server folder)!
 *
 * Available: `sessionManager` or `networkManager` or `app.loadController(..)`
 *
 * You only want one instance of this class, therefor always use `app`.
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
const CONTROLLER_SIDEBAR    = "sidebar";
const CONTROLLER_AUTH       = "auth";
const CONTROLLER_LOGOUT     = "logout";
const CONTROLLER_LANDING    = "landing";
const CONTROLLER_GAMES      = "games";
const CONTROLLER_GAMEDETAIL = "gamedetail";
const CONTROLLER_UPLOAD     = "upload";

const sessionManager      = new SessionManager();
const networkManager      = new NetworkManager();
const notificationManager = new NotificationManager();

class App {

    init() {
        //Always load the sidebar
        this.loadController(CONTROLLER_SIDEBAR);
        this.loadController(CONTROLLER_AUTH);

        //Attempt to load the controller from the URL, if it fails, fall back to the welcome controller.
        this.loadControllerFromUrl(CONTROLLER_LANDING);
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
            case CONTROLLER_SIDEBAR:
                new NavbarController();
                break;

            case CONTROLLER_AUTH:
                new AuthController();
                break;

            case CONTROLLER_LOGOUT:
                this.setCurrentController(name);
                this.handleLogout();
                break;

            case CONTROLLER_LANDING:
                this.setCurrentController(name);
                new LandingController;
                break;

            case CONTROLLER_GAMES:
                this.setCurrentController(name);
                new GamesController();
                break;

            case CONTROLLER_GAMEDETAIL:
                this.setCurrentController(name);
                new GameDetailController();
                break;

            case CONTROLLER_UPLOAD:
                new UploadController();
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
        if (sessionManager.get("userID")) {
            whenYes();
        } else {
            whenNo();
        }
    }

    /**
     * Removes username via sessionManager and loads the login screen
     */
    handleLogout() {
        sessionManager.remove("username");

        //go to login screen
        this.loadController(CONTROLLER_LOGIN);
    }
}

const app = new App();

//When the DOM is ready, kick off our application.
$(function () {
    app.init();
});


/**
 * Google translate
 */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'nl'}, 'google_translate_element');
}
