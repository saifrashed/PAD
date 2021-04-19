/**
 * Responsible for handling the actions happening on welcome view
 * For now it uses the roomExampleRepository to get some example data from server
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class LandingController {
    constructor() {
        $.get("views/landing.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    setup(data) {
        this.landingView = $(data);

        // code

        $(".content").empty().append(this.landingView);
    }


    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
