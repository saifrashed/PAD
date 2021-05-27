/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class LandingController {
    constructor() {
        this.gameRepository = new GameRepository();

        // all events to listen
        this.events = [
            {
                selector:  ".brickSlider .share-btn",
                eventType: "click",
                cb:        this.handleClickGame
            }
        ];

        $.get("views/landing.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    async setup(data) {
        this.landingView = $(data);
        this.games     = await this.gameRepository.getAll();

        let sortedGamesRating = this.games.sort(LandingController.compare);

        console.log(sortedGamesRating);
        console.log(this.games);

        await this.landingView.find('.gamesSlider').html(this.games.reverse().map(SliderBrick));

        // set event listeners
        this.setEventListeners();

        // code
        $(".content").empty().append(this.landingView);
        $('.gamesSlider').slick({
            autoplay:true,
            autoplaySpeed:1000,
            slidesToShow:4,
            slidesToScroll:1,
            infinite: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    }


    /**
     * Sets all registered events
     * @returns {Promise<void>}
     */
    async setEventListeners() {
        try {
            this.events.map((value => {
                this.landingView.find(value.selector).on(value.eventType, value.cb);
            }));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Handles game click
     * @returns {Promise<void>}
     */
    async handleClickGame(e) {
        try {
            console.log($(this).attr("data-id"));

            window.scrollTo(0, 0);
            new GameDetailController($(this).attr("data-id"));
            return false;
        } catch (e) {
            console.log(e);
            notificationManager.alert("warning", 'Oeps er gaat hier iets mis, fout in de server');
        }
    }

    static compare( a, b ) {
        if ( a.averageRating < b.averageRating ){
            return -1;
        }
        if ( a.averageRating > b.averageRating ){
            return 1;
        }
        return 0;
    }


    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
