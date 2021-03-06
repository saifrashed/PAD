/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 */
class GameDetailController {
    constructor(gameID) {
        this.userRepository = new UserRepository();
        this.gameRepository = new GameRepository();
        this.gameID         = gameID;

        // all events to listen
        this.events = [
            {
                selector:  ".breadcrumb-item a",
                eventType: "click",
                cb:        this.handleClickBreadCrumb
            },
            {
                selector:  "#exportBtn",
                eventType: "click",
                cb:        (e) => this.handleGeneratePDF(e)
            },
            {
                selector:  ".stars i",
                eventType: "click",
                cb:        (e) => this.handleClickRating(e)
            }
        ];

        $.get("views/gameDetail.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    async setup(data) {
        this.gameDetailView   = $(data);
        this.game             = await this.gameRepository.get(this.gameID);
        this.gameDifficulties = await this.gameRepository.getDifficulty(this.gameID);

        this.handleRenderDifficulties();
        this.handleRenderingContent();

        // set event listeners
        this.setEventListeners();

        // reset and append content
        $(".content").empty().append(this.gameDetailView);
    }

    /**
     * Sets all registered events
     * @returns {Promise<void>}
     */
    async setEventListeners() {
        try {
            this.events.map((value => {
                this.gameDetailView.find(value.selector).on(value.eventType, value.cb);
            }));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Handles ordinary content for games
     * @returns {Promise<void>}
     */
    async handleRenderingContent() {
        try {

            if (this.game.ratings[0].averageRating) {
                this.gameDetailView.find('.product-rating').html(this.game.ratings[0].averageRating.toFixed(1));
            } else {
                this.gameDetailView.find('.product-rating').html("0.0");
            }

            const userRating = await this.userRepository.getRating(sessionManager.get("userID"), this.gameID);

            this.gameDetailView.find("#gamedetail-title").text(this.game.title);
            this.gameDetailView.find("#gamedetail-type").text(this.game.type);
            this.gameDetailView.find("#gamedetail-image").css({backgroundImage: "url(" + this.game.imageUrl + ")"});
            this.gameDetailView.find("#gamedetail-breadcrumb").text(this.game.title);
            this.gameDetailView.find("#gamedetail-desc").text(this.game.description);
            this.gameDetailView.find("#gamedetail-floorplan").attr('src', this.game.floorplanUrl);
            this.gameDetailView.find('#gameRules').html(this.game.rules.map(RuleListItem));

            console.log(this.game.materials);
            this.gameDetailView.find('#gameMaterial').html(this.game.materials.map(MaterialListItem));
            this.gameDetailView.find('.rating-text').html(this.game.ratings[0].amountRatings + " keer beoordeeld. </br>" + (userRating.length > 0 ? "Uw beoordeling: "+ userRating[0].rating+ " sterren" : "" ));
            this.gameDetailView.find(".name").html(sessionManager.get("username"));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Handles the complexities rendering of difficulties
     * @param difficulties
     */
    handleRenderDifficulties() {
        let moeilijkheidsGraden = [];

        this.gameDifficulties.map((value) => {
            const found = moeilijkheidsGraden.some(el => el.moeilijkheidsgraad === value.moeilijkheidsgraad);

            if (!found) {
                moeilijkheidsGraden.push(value);
            } else {
                let index = moeilijkheidsGraden.findIndex(el => el.moeilijkheidsgraad == value.moeilijkheidsgraad);

                moeilijkheidsGraden[index].beschrijving = moeilijkheidsGraden[index].beschrijving + "<br><br>" + value.beschrijving
            }
        });

        this.gameDetailView.find("#v-pills-tab").html(moeilijkheidsGraden.map(DifficulyListItem));
        this.gameDetailView.find("#v-pills-tabContent").html(moeilijkheidsGraden.map(DifficulyDesc));
    }


    /**
     * Handles breadcrumb navigation
     * @returns {boolean}
     */
    handleClickBreadCrumb() {
        app.loadController($(this).attr("data-controller"));
        return false; //Return false to prevent reloading the page
    }

    /**
     * Handles rating buttons
     * @param e
     */
    async handleClickRating(e) {
        try {
            if (sessionManager.get("userID")) {
                this.gameDetailView.find(".stars i").each(function () {
                    $(this).removeAttr("data-target");
                    $(this).removeAttr("data-toggle");

                });

                await this.gameRepository.setRating({
                    userID: sessionManager.get("userID"),
                    gameID: this.gameID,
                    rating: $(e.target).attr("data-value")
                });

                new GameDetailController(this.gameID);

                notificationManager.alert("success", 'Bedankt voor de beoordeling!');
            }

            e.preventDefault();
        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');
        }
    }

    /**
     * Generates a pdf of the game detail
     */
    handleGeneratePDF() {
        $('.ignore').hide();

        // var pdf = new jsPDF('p','pt','a4');
        //
        // new jsPDF("a4").addHTML($('html'), function () {
        //     pdf.save('spel.pdf');
        //     notificationManager.alert("success", 'Uw spel wordt gedownload!');
        // });

        var pdf = new jsPDF('p','pt','a4');
        pdf.addHTML(document.body,function() {
            pdf.save('spel.pdf');
        });

        $('.ignore').show();
    }

    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
