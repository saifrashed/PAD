/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class DashboardController {
    constructor() {
        this.gameRepository = new GameRepository();
        this.userRepository = new UserRepository();
        this.generalRepository = new GeneralRepository();

        $.get("views/dashboard.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    async setup(data) {
        this.dashboardView = $(data);
        this.user          = await this.userRepository.get(sessionManager.get("userID"));
        this.games         = await this.gameRepository.getAll();
        this.materials     = await this.gameRepository.getMaterials();
        this.grades        = await this.gameRepository.getGrades();

        // statistics
        const averageRating = await this.generalRepository.getAverageRating();
        const amountUsers = await this.generalRepository.getAmountUsers();
        const amountFavorites = await this.generalRepository.getAmountFavorites();

        console.log(averageRating[0].averageRating);
        console.log(amountUsers[0].amountUsers);
        console.log(amountFavorites[0].amountFavorites);

        this.dashboardView.find("#adminHeading").html("Welkom " + this.user.firstname);

        this.dashboardView.find("#averageRating").html(averageRating[0].averageRating.toFixed(2));
        this.dashboardView.find("#amountUsers").html(amountUsers[0].amountUsers);
        this.dashboardView.find("#amountFavorites").html(amountFavorites[0].amountFavorites);


        this.handleRenderMasonry(this.games);
        this.dashboardView.find('#uploadMainImg').on('change', (e) => {
            this.readMainURL(e)
        });
        this.dashboardView.find('#uploadFloorplanImg').on('change', (e) => {
            this.readFloorplanURL(e)
        });

        this.materials.map((value) => {
            this.dashboardView.find(".field-materials").append("<option value='" + value.materialID + "'>" + value.description + "</option>")
        });

        this.grades.map((value) => {
            this.dashboardView.find(".field-grades").append("<option value='" + value.gradeID + "'>" + value.description + "</option>")
        });

        this.dashboardView.find('#deleteGame').on('click', this.deleteGame);

        this.dashboardView.find('#updateGame').on('click', (e) => {
            this.handleUpdateGameClick(e)
        });

        this.dashboardView.find('#update-form').submit((e) => {
            this.updateGame(e)
        });

        this.dashboardView.find('.game-add').on("click", (e) => {
            this.createGame(e)
        });

        this.dashboardView.find(".addUpdateRules").on("click", (e) => {
            this.handleAddRule(e);
        });

        this.dashboardView.find(".resetRules").on("click", (e) => {
            this.handleResetRules(e)
        });


        $(".content").empty().append(this.dashboardView);
    }


    /**
     * Handles masonry games section
     * @param games
     * @returns {Promise<void>}
     */
    async handleRenderMasonry(games) {
        try {
            this.dashboardView.find('.masonry').html(games.map((value) => {
                return DashboardBrick({
                    gameID:   value.gameID,
                    title:    value.title,
                    imageUrl: value.imageUrl,
                    type:     value.type,
                    gradeID:  value.gradeID,
                })
            }));
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    /**
     * Read image URL
     * @param input
     */
    readMainURL(e) {
        console.log(e);

        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#mainImageResult')
                    .attr('src', e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    /**
     * Read image URL
     * @param input
     */
    readFloorplanURL(e) {
        console.log(e);

        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#floorplanImageResult')
                    .attr('src', e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    async deleteGame() {
        try {

            const gameRepository = new GameRepository();

            notificationManager.confirm('Weet je zeker dat u dit wilt verwijderen?', async () => {
                await gameRepository.delete($(this).attr('data-id'));
                new DashboardController()
            });

        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');
        }
    }

    /**
     * Handles adding a rule
     * @param e
     * @returns {Promise<void>}
     */
    async handleAddRule(e) {
        try {
            const gameRepository = new GameRepository();

            let value = notificationManager.input("Maak een regel aan!", async (input) => {
                console.log($(e.target).attr('data-id'));
                console.log(input);

                if (input) {
                    let body = {
                        gameID:      $(e.target).attr('data-id'),
                        description: input
                    };

                    await gameRepository.addRules(body);

                    const gameRules = await gameRepository.getRules($(e.target).attr('data-id'));

                    this.dashboardView.find(".gameUpdateRules").html("");
                    this.dashboardView.find(".gameUpdateRules").append(gameRules.map(RuleTableItem));

                    notificationManager.alert("success", "Nieuwe regel is toegevoegd!")
                } else {
                    notificationManager.alert("error", 'Vul een regel in.');
                }
            });
        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');
        }
    }

    async handleResetRules(e) {
        try {

            await this.gameRepository.deleteRules({
                gameID: $(e.target).attr('data-id')
            });

            await this.gameRepository.getRules($(e.target).attr('data-id'));
            this.dashboardView.find(".gameUpdateRules").html("");
            notificationManager.alert("success", "Regels zijn gereset!")


        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');
        }
    }

    async handleUpdateGameClick(e) {
        try {
            const gameRepository = new GameRepository();
            const game           = await gameRepository.get($(e.target).attr('data-id'));
            const gameMaterial   = await gameRepository.getMaterial($(e.target).attr('data-id'));
            const gameRules      = await gameRepository.getRules($(e.target).attr('data-id'));


            this.dashboardView.find("[name='update-id']").val(game.gameID);
            this.dashboardView.find("[name='update-name']").val(game.title);
            this.dashboardView.find("[name='update-description']").val(game.description);
            this.dashboardView.find("[name='update-minPlayers']").val(game.minPlayers);
            this.dashboardView.find("[name='update-type']").val(game.type);
            this.dashboardView.find("[name='update-grade").val(game.gradeID);

            this.dashboardView.find(".gameUpdateRules").html("");
            this.dashboardView.find(".gameUpdateRules").append(gameRules.map(RuleTableItem));
            this.dashboardView.find(".addUpdateRules").attr("data-id", $(e.target).attr('data-id'));
            this.dashboardView.find(".resetRules").attr("data-id", $(e.target).attr('data-id'));

            for (var index = 0; index < gameMaterial.length; index++) {
                this.dashboardView.find("option[value='" + gameMaterial[index].materialID + "'").attr("selected", "selected");
            }


        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');
        }
    }

    async updateGame(e) {
        try {
            e.preventDefault();

            let body = {
                gameID:      this.dashboardView.find("[name='update-id']").val(),
                title:       this.dashboardView.find("[name='update-name']").val(),
                description: this.dashboardView.find("[name='update-description']").val(),
                minPlayers:  this.dashboardView.find("[name='update-minPlayers']").val(),
                type:        this.dashboardView.find("[name='update-type']").val(),
                gradeID:     this.dashboardView.find("[name='update-grade").val(),
                materials:   this.dashboardView.find("[name='update-material").val()
            };

            console.log(body);
            await this.gameRepository.update(body);
            notificationManager.alert("success", this.dashboardView.find("[name='update-name']").val() + " is bijgewerkt!");
        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');
        }
    }

    async createGame(e) {
        try {
            e.preventDefault();

            let imageName = this.dashboardView.find("[name='create-name']").val().replace(/\s+/g, '-').toLowerCase();

            let body = {
                title:        this.dashboardView.find("[name='create-name']").val(),
                description:  this.dashboardView.find("[name='create-description']").val(),
                imageUrl:     "./assets/img/games/" + imageName + ".jpg",
                floorplanUrl: "./assets/img/games/floorplan/" + imageName + ".jpg",
                minPlayers:   this.dashboardView.find("[name='create-minPlayers']").val(),
                type:         this.dashboardView.find("[name='create-type']").val(),
                gradeID:      this.dashboardView.find("[name='create-grade").val(),
                materials:    this.dashboardView.find("[name='create-material").val(),
            };

            this.dashboardView.find("#mainImgUrl").val("assets/img/games/" + imageName + ".jpg");
            this.dashboardView.find("#floorplanImgUrl").val("assets/img/games/floorplan/" + imageName + ".jpg");

            const newGame = await this.gameRepository.create(body);

            this.dashboardView.find("#create-form").submit();


            notificationManager.alert("success", this.dashboardView.find("[name='create-name']").val() + " is toegevoegd!");

            notificationManager.confirm('Ga naar nieuwe spel', async () => {
                new GameDetailController(newGame.insertId)
            });

        } catch (e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');

        }
    }


    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}



