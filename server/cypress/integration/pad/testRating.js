//Context: Login
describe("testRating", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:63342/team-7/PAD/src/index.html?_ijt=gldru2tvimshmfsnvvjsdefhmf#landing");
    });

    //Test: Test login form
    it("Test login form", function () {
        cy.get("input[name=login-username]").should("exist");

        cy.get("input[name=login-password]").should("exist");

        cy.get(".login-form button").should("exist");
    });


    //Test: Test Rating
    it("Test Rating", function () {
        cy.server();

        cy.get('.modal').invoke('show'); // Invoke the jQuery 'show' function

        cy.route("POST", "/user/login", {"username": "DunstopMe"}).as("login");

        cy.get("input[name=login-username]").type("DunstopMe");

        cy.get("input[name=login-password]").type("Kaily00!");

        cy.get(".login-form button").click();

        cy.wait("@login");

        cy.get("@login").should((xhr) => {
            expect(xhr.request.body.username).equals("DunstopMe");

            expect(xhr.request.body.password).equals("Kaily00!");
        });

        cy.url().should("contain", "#landing");




        cy.get('.burger').click()
        cy.get('.spellenLink').click()
        cy.get('.brick a[data-id="1"]').click()
        cy.get('.stars i[data-value="4"]').click()

    })



});
