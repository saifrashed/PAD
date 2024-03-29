/**
 * Controller responsible for all events in view and setting data
 *
 */
class AuthController {
    constructor() {
        this.gameRepository = new GameRepository();
        this.userRepository = new UserRepository();

        $.get("views/authbox.html")
         .done((data) => {
             this.setup(data)
         })
         .fail(() => this.error());
    }

    //Called when the login.html has been loaded
    async setup(data) {
        //Load the login-content into memory
        this.authBox = $(data);


        const isAdmin = await this.userRepository.isAdmin(sessionManager.get("userID"));

        if (sessionManager.get("userID")) {
            if (isAdmin[0].isAdmin) {
                this.authBox.find(".admin-symbol a").on("click", (e) => this.handleDashbboardClick(e));
            } else {
                this.authBox.find(".admin-symbol").remove();
            }
        } else {
            this.authBox.find(".admin-symbol").remove();
        }

        if (sessionManager.get("userID")) {

            this.user = await this.fetchUser(sessionManager.get("userID"));

            this.authBox.find("#pills-profile-tab").addClass("active");
            this.authBox.find("#pills-login").removeClass("active show");
            this.authBox.find("#pills-profile").addClass("active show");

            this.authBox.find("#pills-login-tab").remove();
            this.authBox.find("#pills-registration-tab").remove();

            this.authBox.find("#logout-btn").on("click", this.handleLogout);

            this.authBox.find("#user-name").html(this.user.firstname + " " + this.user.lastname);
            this.authBox.find("#user-username").html("@" + this.user.username);

            this.authBox.find(".actions-lesson .return-lesson").on("click", (e) => this.handleRenderLessons(e));
            this.authBox.find(".actions-lesson .add-lesson").on("click", (e) => this.handleRenderCreateLesson(e));


            await this.handleRenderFav();
            await this.handleRenderLessons();
        } else {

            this.authBox.find("#pills-profile-tab").remove();
            this.authBox.find("#pills-favorites-tab").remove();
            this.authBox.find("#pills-lessons-tab").remove();

            this.authBox.find(".login-form").on("submit", this.handleLogin);
            this.authBox.find(".register-form").on("submit", this.handleRegistration);
        }


        $(".authbox").empty().append(this.authBox);

    }


    /**
     * Async function that does a login request via repository
     * @param event
     */
    async handleLogin(event) {
        try {

            //prevent actual submit and page refresh
            event.preventDefault();

            const userRepository = new UserRepository();


            //Find the username and password
            const username = $(this).find("[name='login-username']").val();
            const password = $(this).find("[name='login-password']").val();

            // Check if value exists
            if (!username || !password) {
                notificationManager.alert("warning", "Vul alle velden in!");
                return false;
            }


            if (password.length < 6) {
                notificationManager.alert("warning", "Wachtwoord is te kort!");
                return false;
            }

            //await keyword 'stops' code until data is returned - can only be used in async function
            const user = await userRepository.login(username, password);

            sessionManager.set("userID", user.userID);
            notificationManager.alert("success", "U wordt ingelogd!");
            location.reload();
        } catch (e) {
            console.log(e);
            notificationManager.alert("error", "Account bestaat niet");
        }
    }

    /**
     * Async function that does a login request via repository
     * @param event
     */
    async handleRegistration(event) {
        try {

            //prevent actual submit and page refresh
            event.preventDefault();

            const userRepository = new UserRepository();

            const firstName      = $(this).find("[name='register-firstname']").val();
            const lastName       = $(this).find("[name='register-lastname']").val();
            const username       = $(this).find("[name='register-username']").val();
            const password       = $(this).find("[name='register-password']").val();
            const passwordRepeat = $(this).find("[name='register-passwordrepeat']").val();

            if (!firstName || !lastName || !username || !password) {
                notificationManager.alert("warning", "Vul alle velden in!");
                return false;
            }

            if (password.length < 6) {
                notificationManager.alert("warning", "Wachtwoord is te kort!");
                return false;
            }

            if (password != passwordRepeat) {
                notificationManager.alert("warning", "Wachtwoorden komen niet overeen!");
                return false;
            }

            const user = await userRepository.register(firstName.toLowerCase(), lastName.toLowerCase(), username.toLowerCase(), password);

            notificationManager.alert("success", "U bent geregistreerd!");
            sessionManager.set("userID", user.userID);
            location.reload();
        } catch (e) {
            (e.code === 401) ? notificationManager.alert("error", e.reason) : console.log(e);
        }
    }

    async handleLogout() {
        const userRepository = new UserRepository();
        userRepository.logout();
        location.reload();
    }

    async fetchUser(id) {
        try {
            const userRepository = new UserRepository();
            return await userRepository.get(id);
        } catch (e) {
            console.log(e);
        }
    }

    async handleRenderFav() {
        try {
            this.user = await this.fetchUser(sessionManager.get("userID"));

            if (this.user.favorites) {
                this.authBox.find('.masonry').html(this.user.favorites.map(FavoriteBrick).join(''));
                this.authBox.find(".remove-favorite").on("click", (e) => this.handleDeleteFav(e));
            } else {
                this.authBox.find('.masonry').html("<div style='margin: 0; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);'>U hebt nog geen favorieten </div>");
            }
        } catch (e) {
            console.log(e);
        }
    }

    async handleDeleteFav(e) {
        try {
            const userRepository = new UserRepository();
            const userID         = sessionManager.get("userID");
            const gameID         = $(e.target).parent().siblings().attr("data-id");

            await userRepository.deleteFavorite(userID, gameID);
            await this.handleRenderFav();

            notificationManager.alert("success", 'Verwijderd van favorieten');
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Lesson functionality
     */
    async handleRenderLessons() {
        try {
            const lessons = await this.gameRepository.getLessons(sessionManager.get("userID"));
            this.authBox.find(".lesson-screen-title").html("Uw lessen");


            if (lessons.length) {
                this.authBox.find(".lessons").html(lessons.map(LessonsLayout));
            } else {
                this.handleRenderCreateLesson();
            }

            // lessons
            this.authBox.find(".lessons .brick").on("click", (e) => this.handleRenderLessonDetail(e));
        } catch (e) {
            console.log(e)
        }
    }

    async handleRenderLessonDetail(e) {
        try {

            const lessonGames    = await this.gameRepository.getLessonGames($(e.target).closest(".brick").attr("data-id"));
            const selectedLesson = await this.gameRepository.getLesson($(e.target).closest(".brick").attr("data-id"));

            this.authBox.find(".lesson-screen-title").html(selectedLesson[0].title);

            if (lessonGames.length > 0) {
                this.authBox.find(".lessons").html(LessonsDetailLayout({
                    lessonID:        $(e.target).closest(".brick").attr("data-id"),
                    title:           selectedLesson[0].title,
                    description:     selectedLesson[0].description,
                    lessonGamesHTML: lessonGames.map(LessonGames).join('')
                }));
            } else {
                this.authBox.find(".lessons").html("<div class='lesson-alert'>Voeg spellen toe vanuit de spellen pagina.</div>")
            }

            this.authBox.find(".lessons .lesson-delete").on("click", (e) => this.handleDeleteLesson(e));
        } catch (e) {
            console.log(e)
        }
    }

    async handleRenderCreateLesson() {
        this.authBox.find(".lesson-screen-title").html("Maak een les aan");
        this.authBox.find(".lessons").html(LessonsCreateLayout);

        this.authBox.find(".auth-button-container").on("click", (e) => this.handleCreateLesson(this.authBox.find(".lesson-title").val(), this.authBox.find(".lesson-description").val()));
    }

    async handleCreateLesson(title, description) {
        try {
            console.log(title);
            console.log(description);

            if (!title || !description) {
                notificationManager.alert("warning", "Vul alle velden in!");
                return false;
            }

            await this.gameRepository.addLesson({
                userID:      sessionManager.get("userID"),
                title:       title,
                description: description,
            });

            this.handleRenderLessons();
            notificationManager.alert("success", 'Les aangemaakt! Ga naar spellen pagina voor toevoegen.');

        } catch (e) {
            console.log(e);
        }
    }

    async handleDeleteLesson(e) {
        try {

            const deletedLesson = await this.gameRepository.deleteLesson({
                lessonID: $(e.target).attr("data-id"),
                userID:   sessionManager.get("userID")
            });

            this.handleRenderLessons();
            notificationManager.alert("success", 'Verwijderd!');
        } catch (e) {
            console.log(e)
        }
    }


    async handleDashbboardClick(e) {
        await new DashboardController();
        notificationManager.alert("success", 'Welkom Admin!');
    }


    //Called when the login.html failed to load
    error() {
        $(".content").html("Failed to load content!");
    }
}
