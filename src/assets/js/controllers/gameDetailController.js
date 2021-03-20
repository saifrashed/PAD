/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class GameDetailController {
    constructor(gameID) {
        this.gameRepository = new GameRepository();
        this.gameID         = gameID;
        $.get("views/gameDetail.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    //Called when the welcome.html has been loaded
    async setup(data) {
        //Load the welcome-content into memory
        this.gameDetailView = $(data);
        const game          = await this.gameRepository.get(this.gameID);

        // filling of content
        this.gameDetailView.find("#gamedetail-title").text(game.title);
        this.gameDetailView.find("#gamedetail-type").text(game.type);
        this.gameDetailView.find("#gamedetail-image").css({backgroundImage: "url(" + game.imageUrl + ")"});
        this.gameDetailView.find("#gamedetail-breadcrumb").text(game.title);
        this.gameDetailView.find("#gamedetail-desc").text(game.description);
        this.gameDetailView.find("#gamedetail-floorplan").attr('src', game.floorplanUrl);
        this.gameDetailView.find('#gameRules').html(game.rules.map(RuleListItem));
        this.gameDetailView.find('#gameMaterial').html(game.materials.map(MaterialListItem));
        this.gameDetailView.find('.product-rating').html(game.ratings[0].averageRating.toFixed(1));
        this.gameDetailView.find('.rating-text').html(game.ratings[0].amountRatings + " keer beoordeeld.");
        this.gameDetailView.find(".name").html(sessionManager.get("username"));
        this.gameDetailView.find(".breadcrumb-item a").on("click", this.handleClickBreadCrumb);
        this.gameDetailView.find(".breadcrumb-item a").on("click", this.handleClickBreadCrumb);
        this.gameDetailView.find(".breadcrumb-item a").on("click", this.handleClickBreadCrumb);
        this.gameDetailView.find("#exportBtn").on("click", this.handleGeneratePDF);


        if (sessionManager.get("userID")) {
            this.gameDetailView.find(".stars i").each(function () {
                $(this).removeAttr("data-target");
                $(this).removeAttr("data-toggle");

            });

            this.gameDetailView.find(".stars i").on("click", (e) => {
                this.handleClickRating(e)
            });
        }

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.gameDetailView);

    }

    handleClickBreadCrumb() {

        //Get the data-controller from the clicked element (this)
        const controller = $(this).attr("data-controller");

        //Pass the action to a new function for further processing
        app.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }


    handleClickRating(e) {
        try {
            e.preventDefault();

            let body = {
                userID: sessionManager.get("userID"),
                gameID: this.gameID,
                rating: $(e.target).attr("data-value")
            };

            const setRating = this.gameRepository.setRating(body);


            console.log(setRating);

            notificationManager.alert("success", 'Bedankt voor de beoordeling!');

            new GameDetailController(this.gameID);

        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');
        }
    }

    handleGeneratePDF() {
        console.log("pdf")



        // Choose the element that our invoice is rendered in.
        const element = document.getElementById("exportBtn");
        // Choose the element and save the PDF for our user.

        $('.ignore').hide(); //before the addHTML()

        var pdf = new jsPDF("a4");
        pdf.addHTML($('html'), function() {
            pdf.save('spel.pdf');
        });

        $('.ignore').show(); //and directly after its finished


        notificationManager.alert("success", 'Uw spel wordt gedownload!');

    }


    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
