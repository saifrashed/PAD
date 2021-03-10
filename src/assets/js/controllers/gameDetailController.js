/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class GameDetailController {
    constructor(gameID) {
        this.gameRepository = new GameRepository();
        this.gameID = gameID;
        $.get("views/gameDetail.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called when the welcome.html has been loaded
    async setup(data) {
        //Load the welcome-content into memory
        this.welcomeView = $(data);
        const game = await this.gameRepository.get(this.gameID);
        console.log(game);
        //Set the name in the view from the session
        this.welcomeView.find(".name").html(sessionManager.get("username"));
        this.welcomeView.find(".breadcrumb-item a").on("click", this.handleClickBreadCrumb);
        this.welcomeView.find(".breadcrumb-item a").on("click", this.handleClickBreadCrumb);

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.welcomeView);

    }

    handleClickBreadCrumb() {

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
