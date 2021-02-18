/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class GamesController {
    constructor() {
        this.roomExampleRepository = new RoomExampleRepository();

        $.get("views/games.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called when the welcome.html has been loaded
    setup(data) {
        //Load the welcome-content into memory
        this.welcomeView = $(data);

        //Set the name in the view from the session
        this.welcomeView.find(".name").html(sessionManager.get("username"));
        this.welcomeView.find(".brick a").on("click", this.handleClickGameItem);


        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.welcomeView);
    }

    handleClickGameItem() {
        //Get the data-controller from the clicked element (this)
        const controller = $(this).attr("data-controller");

        //Pass the action to a new function for further processing
        app.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }

    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
