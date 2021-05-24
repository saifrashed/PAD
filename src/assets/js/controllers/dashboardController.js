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
        this.games = await this.gameRepository.getAll();

        this.handleRenderMasonry(this.games);
        this.dashboardView.find('#uploadMainImg').on('change', (e) => {
            this.readMainURL(e)
        });
        this.dashboardView.find('#uploadFloorplanImg').on('change', (e) => {
            this.readFloorplanURL(e)
        });
        this.dashboardView.find('#deleteGame').on('click', this.deleteGame)


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
                    gameID: value.gameID,
                    title: value.title,
                    imageUrl: value.imageUrl,
                    type: value.type,
                    gradeID: value.gradeID,
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

    /**
     * Delete game
     * @returns {Promise<void>}
     */
    async deleteGame(){
        try {

            const gameRepository = new GameRepository();
            const deleteGame = await gameRepository.delete($(this).attr('data-id'));

            new DashboardController()
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



