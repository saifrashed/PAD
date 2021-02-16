class UploadController {
    constructor() {
        $.get("views/upload.html")
            .done((data) => this.setup(data))
            .fail(() => this.error());
    }

    //Called when the upload.html has been loaded
    setup(data) {
        console.log("UploadController")
    }

    //Called when the login.html fails to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
