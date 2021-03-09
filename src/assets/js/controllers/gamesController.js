/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class GamesController {
    constructor() {
        this.gameRepository = new GameRepository();

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

        await this.renderGames();

        //Empty the content-div and add the resulting view to the page
        $(".content").empty().append(this.gamesView);
    }


    /**
     * Renders games and assigns actions to its buttons
     * @param data
     * @returns {Promise<void>}
     */
    async renderGames() {
        try {
            const games = await this.gameRepository.getAll();

            let randomNumber = Math.floor(Math.random() * 3);

            // game highlighted
            this.gamesView.find('.highlighted-game').html(Highlighted({title: games[randomNumber].title, imageUrl: games[randomNumber].imageUrl, description: games[randomNumber].description}));

            // game bricks
            this.gamesView.find('.games .masonry').html(games.map(Brick).join(''));

            this.gamesView.find(".brick a").on("click", this.handleClickGameItem);
            this.gamesView.find(".highlighted-game a").on("click", this.handleClickGameItem);
            // action handlers
            this.gamesView.find(".favorite-btn").on("click", this.handleClickFavorites);
            this.gamesView.find(".add-btn").on("click", this.handleClickAddTo);
            this.gamesView.find(".share-btn").on("click", this.handleClickShare);
        } catch (e) {
            console.log(e);
        }
    }

    handleClickGameItem() {
        //Get the data-controller from the clicked element (this)
        const controller = $(this).attr("data-controller");

        //Pass the action to a new function for further processing
        app.loadController(controller);

        //Return false to prevent reloading the page
        return false;
    }

    handleClickShare() {
        console.log(this);

        let choices = [
            {
                text:    'Afdrukken',
                handler: function () {
                    notie.alert({text: 'Afdrukken', position: 'bottom'})
                }
            },
            {
                text:    'PDF',
                handler: function () {
                    notie.alert({text: 'PDF', position: 'bottom'})
                }
            },
            {
                text:    'Delen',
                handler: function () {
                    notie.alert({text: 'Kopieerd', position: 'bottom'})
                }
            },
        ];

        notificationManager.select('Delen', choices);
    }

    handleClickAddTo() {
        console.log(this);


        console.log(this);

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

    handleClickFavorites() {
        console.log(this);

        notificationManager.alert("success", 'Toegevoegd aan favorieten');
    }

    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
