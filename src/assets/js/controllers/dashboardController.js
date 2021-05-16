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
        this.games     = await this.gameRepository.getAll();

        this.handleRenderMasonry(this.games);

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
                    gameID:     value.gameID,
                    title:      value.title,
                    imageUrl:   value.imageUrl,
                    type:       value.type,
                    gradeID:    value.gradeID,
                })
            }));

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