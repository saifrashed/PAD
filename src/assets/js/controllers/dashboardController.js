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

        $.get("views/dashboard.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    async setup(data) {
        this.dashboardView = $(data);
        this.games         = await this.gameRepository.getAll();
        this.materials     = await this.gameRepository.getMaterials();
        this.grades        = await this.gameRepository.getGrades();

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

        this.dashboardView.find('#create-form').submit((e) => {
            this.createGame(e)
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
            const deleteGame     = await gameRepository.delete($(this).attr('data-id'));

            new DashboardController()
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

            this.dashboardView.find("[name='update-id']").val(game.gameID);
            this.dashboardView.find("[name='update-name']").val(game.title);
            this.dashboardView.find("[name='update-description']").val(game.description);
            this.dashboardView.find("[name='update-minPlayers']").val(game.minPlayers);
            this.dashboardView.find("[name='update-type']").val(game.type);
            this.dashboardView.find("[name='update-grade").val(game.gradeID);

            for (var index = 0; index < gameMaterial.length; index++) {
                this.dashboardView.find("option[value='" + gameMaterial[index].materialID + "'").attr("selected", "selected");
            }


        } catch (e) {
            console.log(e);
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
        } catch(e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');

        }
    }

    async createGame(e) {
        try {
            e.preventDefault();

            let body = {
                title:       this.dashboardView.find("[name='create-name']").val(),
                description: this.dashboardView.find("[name='create-description']").val(),
                imageUrl: "./assets/img/games/placeholder.png",
                floorplanUrl: "./assets/img/games/floorplan/placeholder.png",
                minPlayers:  this.dashboardView.find("[name='create-minPlayers']").val(),
                type:        this.dashboardView.find("[name='create-type']").val(),
                gradeID:     this.dashboardView.find("[name='create-grade").val(),
                materials:   this.dashboardView.find("[name='create-material").val()
            };

            console.log(body);
            await this.gameRepository.create(body);
            notificationManager.alert("success",  this.dashboardView.find("[name='create-name']").val() + " is toegevoegd!");

        } catch(e) {
            console.log(e);
            notificationManager.alert("error", 'Er is wat misgegaan...');

        }
    }


    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}



