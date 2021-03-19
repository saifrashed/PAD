/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class GamesController {
    constructor(isLogged) {
        this.gameRepository = new GameRepository();
        this.isLogged       = isLogged;
        this.filterOptions  = [];

        $.get("views/games.html")
         .done((data) => {
             this.setup(data)
         })
         .fail(() => this.error());
    }

    //Called when the welcome.html has been loaded
    async setup(data) {
        //Load the welcome-content into memory
        this.gamesView = $(data);

        // fetch games
        const games    = await this.gameRepository.getAll();
        const grades   = await this.gameRepository.getGrades();
        const material = await this.gameRepository.getMaterials();

        let randomNumber = Math.floor(Math.random() * 3);

        // game highlighted
        this.gamesView.find('.highlighted-game').html(Highlighted({
            id:          games[randomNumber].gameID,
            title:       games[randomNumber].title,
            imageUrl:    games[randomNumber].imageUrl,
            description: games[randomNumber].description
        }));

        this.gamesView.find('#gradeFilter').html(grades.map((value) => {
            return GradeFilterButton({
                gradeID:     value.gradeID,
                description: value.description,
                variant:     "grades"
            })
        }));

        this.gamesView.find('#materialFilter').html(material.map((value) => {
            return MaterialFilterButton({
                materialID:  value.materialID,
                description: value.description,
                variant:     "material"
            })
        }));

        this.gamesView.find('.games .masonry').html(games.map((value) => {

            console.log(value);

            return Brick({
                gameID:   value.gradeID,
                title:    value.title,
                imageUrl: value.imageUrl,
                type:     value.type,
                gradeID:  value.gradeID,
            })
        }));


        // game bricks
        this.gamesView.find('input.search').on("input", this.handleSearchFilter);


        this.gamesView.find(".brick a").on("click", this.handleClickGameItem);
        this.gamesView.find(".highlighted-game a").on("click", this.handleClickGameItem);

        // filter clicks

        this.gamesView.find(".js-collection-section-tag").on("click", (e) => this.handleClickFilter(e));

        if (this.isLogged) {

            this.gamesView.find(".favorite-btn").removeAttr("data-target");
            this.gamesView.find(".favorite-btn").removeData("data-toggle");

            this.gamesView.find(".add-btn").removeAttr("data-target");
            this.gamesView.find(".add-btn").removeData("data-toggle");

            // action handlers
            this.gamesView.find(".favorite-btn").on("click", this.handleClickFavorites);
            this.gamesView.find(".add-btn").on("click", this.handleClickAddTo);
        }


        this.gamesView.find(".share-btn").on("click", () => this.handleClickShare());


        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.gamesView);
    }

    handleClickGameItem() {
        window.scrollTo(0, 0);


        //Get the data-controller from the clicked element (this)
        const gameID = $(this).attr("data-id");
        new GameDetailController(gameID);

        //Pass the action to a new function for further processing
        //app.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }

    handleClickShare() {
        console.log(this);

        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard("lol");
            return;
        }
        navigator.clipboard.writeText("lol").then(function () {
            notificationManager.alert("success", 'Gekopieerd');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }


    handleSearchFilter() {
        let searchQuery = $(this).val();

        $(".games .masonry .brick .brick__top .brick__title").each(function (index) {

            if (!searchQuery) {
                $(this).parent().parent().parent().css({display: "inline-block"});
            } else {
                if (!$(this).text().trim().toLowerCase().includes(searchQuery.toLowerCase())) {
                    $(this).parent().parent().parent().css({display: "none"})
                }
            }
        });


    }

    async handleClickFilter(e) {
        e.preventDefault();

        let optionObj = {
            description: $(e.target).text(),
            variant:     $(e.target).attr("data-variant"),
            id:          $(e.target).attr("data-id")
        };


        if ($(e.target).hasClass("filterbtn-active")) {

            this.filterOptions = this.filterOptions.filter(function (el) {
                return el.id !== optionObj.id || el.variant !== optionObj.variant;
            });

            $(e.target).removeClass("filterbtn-active");

        } else {
            // hiJ wordt niet gefilterd en moet er dus bij

            this.filterOptions.push(optionObj);
            $(e.target).addClass("filterbtn-active");
        }

        this.handleFilterRender();
    };


    async handleFilterRender() {

        let selectedGrades    = [];
        let selectedMaterials = [];

        this.filterOptions.map((option) => {
            if (option.variant === "grades") {
                selectedGrades.push(option.id)
            }

            if (option.variant === "material") {
                selectedMaterials.push(parseInt(option.id))
            }
        });


        console.log(selectedMaterials);


        this.gamesView.find(".brick").map(async (index, element) => {

            $(element).css({
                display: "inline-block"
            });

            if (selectedGrades.length) {
                if (!selectedGrades.includes($(element).attr("data-grade"))) {
                    $(element).css({
                        display: "none"
                    })
                }
            }

            // // get materials for the check
            // let gameMaterials = await this.gameRepository.getMaterial($(element).attr("data-id"));
            //
            //
            // if (selectedMaterials.length && gameMaterials.length) {
            //     $(element).css({
            //         display: "none"
            //     })
            //     gameMaterials.map((value) => {
            //
            //         if (selectedMaterials.includes(value.materialID - 1)) {
            //             $(element).css({
            //                 display: "inline-block"
            //             })
            //         }
            //     });
            // }

        });

    }


    handleClickAddTo() {
        let choices = [
            {
                text:    'Groep 6 lesrooster',
                handler: function () {
                    notie.alert({text: 'Toegevoegd aan spellenlijst', position: 'bottom'})
                }
            },
            {
                text:    'Groep 3 spellenuur',
                handler: function () {
                    notie.alert({text: 'Toegevoegd aan spellenlijst', position: 'bottom'})
                }
            },
            {
                text:    'Kleuter fun lijst',
                handler: function () {
                    notie.alert({text: 'Toegevoegd aan spellenlijst', position: 'bottom'})
                }
            },
        ];

        notificationManager.select('Toevoegen aan spellenlijst', choices);
    }

    async handleClickFavorites() {
        try {
            const userRepository = new UserRepository();
            const userID         = sessionManager.get("userID");
            const gameID         = $(this).parent().siblings().attr("data-id");
            const newfav         = await userRepository.createFavorite(userID, gameID);
            notificationManager.alert("success", 'Toegevoegd aan favorieten');
            app.loadController("auth");
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }


    }

    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
