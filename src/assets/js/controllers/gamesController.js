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

    /**
     * Setup function
     * @param data
     * @returns {Promise<void>}
     */
    async setup(data) {
        this.gamesView = $(data);

        if (sessionManager.get("userID")) {
            this.user = await this.userRepository.get(sessionManager.get("userID"));
        }

        this.games     = await this.gameRepository.getAll();
        this.grades    = await this.gameRepository.getGrades();
        this.materials = await this.gameRepository.getMaterials();

        this.handleRenderHighlighted(this.games);
        this.handleRenderMasonry(this.games);
        this.handleRenderGradeFilter(this.grades);
        this.handleRenderMaterialFilter(this.materials);

        this.gamesView.find('input.search').on("input", (e) => this.handleSearchFilter(e));
        this.gamesView.find(".brick a").on("click", this.handleClickGame);
        this.gamesView.find(".highlighted-game a").on("click", this.handleClickGame);
        this.gamesView.find(".js-collection-section-tag").on("click", (e) => this.handleClickFilter(e));

        $(".content").empty().append(this.gamesView);
    }

    /**
     * Renders highlighted game section
     * @param games
     * @returns {Promise<void>}
     */
    async handleRenderHighlighted(games) {
        try {
            let randomNumber = Math.floor(Math.random() * games.length);

            // game highlighted
            this.gamesView.find('.highlighted-game').html(Highlighted({
                id:          games[randomNumber].gameID,
                title:       games[randomNumber].title,
                imageUrl:    games[randomNumber].imageUrl,
                description: games[randomNumber].description
            }));
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Handles masonry games section
     * @param games
     * @returns {Promise<void>}
     */
    async handleRenderMasonry(games) {
        try {
            this.gamesView.find('.games .masonry').html(games.map((value) => {

                let found = false;

                if (sessionManager.get("userID") && this.user.favorites != null) {
                    found = this.user.favorites.some(el => el.gameID === value.gameID);
                }
                return Brick({
                    gameID:     value.gameID,
                    title:      value.title,
                    imageUrl:   value.imageUrl,
                    type:       value.type,
                    gradeID:    value.gradeID,
                    isFavorite: found
                })
            }));

            if (this.isLogged) {
                this.gamesView.find(".favorite-btn").removeAttr("data-target");
                this.gamesView.find(".favorite-btn").removeData("data-toggle");

                this.gamesView.find(".add-btn").removeAttr("data-target");
                this.gamesView.find(".add-btn").removeData("data-toggle");

                // action handlers
                this.gamesView.find(".favorite-btn").on("click", this.handleClickFavorites);
                this.gamesView.find(".add-btn").on("click", this.handleClickAddTo);
            }

        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Renders grade filters
     * @param grades
     * @returns {Promise<void>}
     */
    async handleRenderGradeFilter(grades) {
        try {
            this.gamesView.find('#gradeFilter').html(grades.map((value) => {
                return GradeFilterButton({
                    gradeID:     value.gradeID,
                    description: value.description,
                    variant:     "grades"
                })
            }));
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Renders material filters
     * @param materials
     * @returns {Promise<void>}
     */
    async handleRenderMaterialFilter(materials) {
        try {
            this.gamesView.find('#materialFilter').html(materials.map((value) => {
                return MaterialFilterButton({
                    materialID:  value.materialID,
                    description: value.description,
                    variant:     "material"
                })
            }));
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Handles game click
     * @returns {Promise<void>}
     */
    async handleClickGame() {
        try {
            window.scrollTo(0, 0);
            new GameDetailController($(this).attr("data-id"));
            return false;
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Handles search filter
     * @param e
     * @returns {Promise<void>}
     */
    async handleSearchFilter(e) {
        try {
            this.handleRenderMasonry(this.games.filter(d => d.title.toLowerCase().includes($(e.target).val().toLowerCase())));
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Handles filter modal clicks
     * @param e
     * @returns {Promise<void>}
     */
    async handleClickFilter(e) {
        try {
            e.preventDefault();

            this.handleRenderMasonry(this.games.filter(d => d.gradeID < $(e.target).attr("data-id")));

            $(".filterbtn-active").each(function () {
                $(this).removeClass("filterbtn-active");
            });

            $(e.target).addClass("filterbtn-active");
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    };

    /**
     * Handles add to lesson clicks
     * @returns {Promise<void>}
     */
    async handleClickAddTo() {
        try {
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
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Handles favorites clicks
     * @returns {Promise<void>}
     */
    async handleClickFavorites() {
        try {
            await new UserRepository().createFavorite(sessionManager.get("userID"), $(this).parent().siblings().attr("data-id"));
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
