/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class GamesController {
    constructor(isLogged) {
        this.gameRepository = new GameRepository();
        this.userRepository = new UserRepository();
        this.isLogged       = isLogged;

        $.get("views/games.html")
         .done((data) => {
             this.setup(data)
         })
         .fail(() => this.error());
    }

    async setup(data) {
        this.gamesView = $(data);
        let user       = null;

        if (sessionManager.get("userID")) {
            user = await this.userRepository.get(sessionManager.get("userID"));
        }

        const games    = await this.gameRepository.getAll(9);
        const grades   = await this.gameRepository.getGrades();
        const material = await this.gameRepository.getMaterials();

        console.log(games);

        let randomNumber = Math.floor(Math.random() * games.length);

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

            let found = false;

            if (sessionManager.get("userID") && user.favorites != null) {
                found = user.favorites.some(el => el.gameID === value.gameID);
            }
            return Brick({
                gameID:     value.gameID,
                title:      value.title,
                imageUrl:   value.imageUrl,
                type:       value.type,
                isFavorite: found
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
            this.gamesView.find(".add-btn").on("click", this.handleClickAddToLesson);
        }


        this.gamesView.find(".share-btn").on("click", () => this.handleClickShare());


        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.gamesView);
    }




    handleClickGameItem() {
        window.scrollTo(0, 0);

        //Get the data-controller from the clicked element (this)
        new GameDetailController($(this).attr("data-id"));

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

        if ($(e.target).hasClass("filterbtn-active")) {

            console.log($(e.target).attr("data-id"));

            $(e.target).removeClass("filterbtn-active");

        } else {
            console.log($(e.target).attr("data-id"));


            // hiJ wordt niet gefilterd en moet er dus bij
            $(e.target).addClass("filterbtn-active");
        }

    };


    handleClickAddToLesson() {
        let choices = [
            {
                text:    'Groep 6 lesrooster',
                handler: function () {
                    notie.alert({text: 'Toegevoegd aan les!', position: 'bottom', type: "success"})
                }
            },
            {
                text:    'Groep 3 spellenuur',
                handler: function () {
                    notie.alert({text: 'Toegevoegd aan les!', position: 'bottom', type: "success"})
                }
            },
            {
                text:    'Kleuter fun lijst',
                handler: function () {
                    notie.alert({text: 'Toegevoegd aan les!', position: 'bottom', type: "success"})
                }
            },
        ];

        notificationManager.select('Toevoegen aan een les!', choices);
    }

    async handleClickFavorites() {
        try {
            const userRepository = new UserRepository();
            const userID         = sessionManager.get("userID");
            const gameID         = $(this).parent().siblings().attr("data-id");
            const newfav         = await userRepository.createFavorite(userID, gameID);
            notificationManager.alert("success", 'Toegevoegd aan favorieten');
            app.loadController("auth");
            app.loadController("games");

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
