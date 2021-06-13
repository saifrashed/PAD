//Context: Login
describe("testRating", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:63342/team-7/PAD/src/index.html?_ijt=ephb62vghnljpce73rukgcsjfs#landing");

    });

    //Test: Test Rating
    it("Test Successful rating", function () {
        cy.server();

        cy.get('.modal').invoke('show'); // Invoke the jQuery 'show' function

        cy.get("input[name=login-username]").type("DunstopMe");

        cy.get("input[name=login-password]").type("Kaily00!");

        cy.get(".login-form button").click();

        cy.get('.burger').click();
        cy.get('.spellenLink').click();
        cy.get('.brick a[data-id="1"]').click();

        cy.wait(2500);

        cy.get('.stars i[data-value="4"]').click();

        //After a rating, an element containing our success-message should be shown.
        cy.get(".notie-alert").should("exist")
    });

    //Test: Test Rating
    it("Test failed rating", function () {
        cy.server();

        cy.get('.burger').click();
        cy.get('.spellenLink').click();
        cy.get('.brick a[data-id="1"]').click();

        cy.wait(2500);

        cy.get('.stars i[data-value="4"]').click();

        //After a rating, an element containing our success-message should be shown.
        cy.get(".modal").should("exist")
    })

});
