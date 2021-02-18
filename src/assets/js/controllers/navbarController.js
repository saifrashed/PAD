/**
 * Responsible for handling the actions happening on sidebar view
 *
 * @author Lennard Fonteijn, Pim Meijer
 */
class NavbarController {
    constructor() {
        $.get("views/navbar.html")
         .done((data) => this.setup(data))
         .fail(() => this.error());
    }

    //Called when the navbar.html has been loaded
    setup(data) {
        //Load the sidebar-content into memory
        const sidebarView = $(data);

        //Find all anchors and register the click-event
        sidebarView.find("a").on("click", this.handleClickMenuItem);
        sidebarView.find("button.menu-toggle").on("click", this.handleMenuToggle);
        $(document).mouseup(this.handleOffCanvas);


        //TODO: Add logic here to determine which menu items should be visible or not

        //Empty the sidebar-div and add the resulting view to the page
        $(".sidebar").empty().append(sidebarView);
    }

    handleClickMenuItem() {
        //Get the data-controller from the clicked element (this)
        const controller = $(this).attr("data-controller");

        //Pass the action to a new function for further processing
        app.loadController(controller);

        $('body').removeClass('show-sidebar');
        $("button.burger").removeClass('active');

        //Return false to prevent reloading the page
        return false;
    }


    handleMenuToggle(e) {
        var $this = $(this);

        if ($('body').hasClass('show-sidebar')) {
            $('body').removeClass('show-sidebar');
            $this.removeClass('active');
        } else {
            $('body').addClass('show-sidebar');
            $this.addClass('active');
        }

        e.preventDefault();
    }

    handleOffCanvas(e) {
        var container = $(".sidebar");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('show-sidebar')) {
                $('body').removeClass('show-sidebar');
                $('body').find('.menu-toggle').removeClass('active');
            }
        }
    }

    //Called when the login.html failed to load
    error() {
        $(".content").html("Failed to load the sidebar!");
    }
}
