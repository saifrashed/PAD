//Context: Login
describe("Login", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:8080/Sites/projecten/HvA/PAD/src/#landing");
    });

    //Test: Validate login form
    it("Valid login form", function() {
        //Find the field for the username, check if it exists.
        cy.get("input[name=login-username]").should("exist");

        //Find the field for the password, check if it exists.
        cy.get("input[name=login-password]").should("exist");

        //Find the button to login, check if it exists.
        cy.get(".login-form button").should("exist");
    });

    //Test: Successful login
    it("Successful login", function () {
        //Start a fake server
        cy.server();


        cy.get('.modal').invoke('show'); // Invoke the jQuery 'show' function


        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested
        //Give the stub the alias: @login
        cy.route("POST", "/user/login", {"username": "saifeddine101"}).as("login");

        //Find the field for the username and type the text "test".
        cy.get("input[name=login-username]").type("saifeddine101");

        //Find the field for the password and type the text "test".
        cy.get("input[name=login-password]").type("Rashed112");

        //Find the button to login and click it.
        cy.get(".login-form button").click();

        //Wait for the @login-stub to be called by the click-event.
        cy.wait("@login");

        //The @login-stub is called, check the contents of the incoming request.
        cy.get("@login").should((xhr) => {
            //The username should match what we typed earlier
            expect(xhr.request.body.username).equals("saifeddine101");

            //The password should match what we typed earlier
            expect(xhr.request.body.password).equals("Rashed112");
        });

        //After a successful login, the URL should now contain #welcome.
        cy.url().should("contain", "#landing");
    });

    //Test: Failed login
    it("Failed login", function () {
        //Start a fake server
        cy.server();

        cy.get('.modal').invoke('show'); // Invoke the jQuery 'show' function

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested and set the status-code tot 401.
        //Give the stub the alias: @login
        cy.route({
            method: "POST",
            url: "/user/login",
            response: {
                reason: "ERROR"
            },
            status: 401
        }).as("login");

        //Find the field for the username and type the text "test".
        cy.get("input[name=login-username]").type("test101");

        //Find the field for the password and type the text "test".
        cy.get("input[name=login-password]").type("test112");

        //Find the button to login and click it.
        cy.get(".login-form button").click();

        //Wait for the @login-stub to be called by the click-event.
        cy.wait("@login");

        //After a failed login, an element containing our error-message should be shown.
        cy.get(".notie-alert").should("exist")
    });
});
