/**
 * Responsible for handling the actions happening on sidebar view
 *
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
        sidebarView.find("a.menu-item").on("click", this.handleClickMenuItem);
        sidebarView.find("button.menu-toggle").on("click", this.handleMenuToggle);
        $(document).mouseup(this.handleOffCanvas);


        //Empty the sidebar-div and add the resulting view to the page
        $(".sidebar").empty().append(sidebarView);
    }

    /**
     * Menu item click handler
     * @returns {boolean}
     */
    handleClickMenuItem() {
        app.loadController($(this).attr("data-controller"));

        $('body').removeClass('show-sidebar');
        $("button.burger").removeClass('active');

        //Return false to prevent reloading the page
        return false;
    }

    /**
     * Sidebar toggle logic
     * @param e
     */
    handleMenuToggle(e) {
        if ($('body').hasClass('show-sidebar')) {
            $('body').removeClass('show-sidebar');
            $(this).removeClass('active');
        } else {
            $('body').addClass('show-sidebar');
            $(this).addClass('active');
        }

        e.preventDefault();
    }

    /**
     * Sidebar display logic
     * @param e
     */
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
