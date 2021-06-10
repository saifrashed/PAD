
describe("Register", function () {
    beforeEach(() => {
        cy.visit("http://localhost/projecten/team-7/src/#landing");
    });

    //Test: Validate register form
    it("Valid register form", function () {

        //Find the field for the username, check if it exists.
        cy.get("input[name=register-firstname]").should("exist");

        //Find the field for the username, check if it exists.
        cy.get("input[name=register-lastname]").should("exist");

        //Find the field for the username, check if it exists.
        cy.get("input[name=register-username]").should("exist");

        //Find the field for the password, check if it exists.
        cy.get("input[name=register-password]").should("exist");

        //Find the button to login, check if it exists.
        cy.get("input[name=register-passwordrepeat]").should("exist");
    });

    it("Succesfull register", function () {

        cy.server();

        cy.route("POST", "/register", {"firstname": "Yasser", "lastname": "Ali", "username": "ressay012", "password": "yasser012"}).as("registerAccount");

        cy.get("#createAccount").click();

        cy.get("#pills-registration-tab").click();

        cy.get("#registerFirstname").type("Yasser");

        cy.get("#registerLastname").type("Ali");

        cy.get("#registerUsername").type("ressay012");

        cy.get("#registerPassword").type("yasser012");

        cy.get("#registerPasswordRepeat").type("yasser012");

        cy.get("#registerButton").click();
    });

    it("Failed register", function () {

        cy.server();

        cy.route({
            method:   "POST",
            url:      "/user/register",
            response: {
                reason: "ERROR"
            },
            status:   401
        }).as("register");

        cy.get("#createAccount").click();

        cy.get("#pills-registration-tab").click();

        cy.get("#registerFirstname").type("Yasser");

        cy.get("#registerLastname").type("Ali");

        cy.get("#registerUsername").type("ressay012");

        cy.get("#registerPassword").type("2");

        cy.get("#registerPasswordRepeat").type("1");

        cy.get("#registerButton").click();
    });

});