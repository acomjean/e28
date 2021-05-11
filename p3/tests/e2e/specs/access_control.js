describe('Access Control Itinerary Page', () => {

    // check if access controls prevent access to the itinerary page

    // loosely based on https://docs.cypress.io/guides/getting-started/testing-your-app#Logging-in
    // but separate api controling login complicates it a bit.

    const user = {
        name: 'Jill Harvard',
        email: 'jill@harvard.edu',
        password: 'asdfasdf'
    }
    beforeEach(() => {
        // logout
        cy.request('GET', '/logout', {
        });
    })


    // Good Login

    it('access of itinerary page', () => {
        cy.visit('/itinerary');

        // check results
        cy.contains('h2', 'Required')

        //login  (there is a better way by we'll just go to the page )

        cy.visit('/login');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type(user.password);
        cy.get('[data-test=login-button]').click();
        cy.wait(3000);  // anti patern
        cy.visit('/itinerary');
        cy.contains('h2', 'Itinerary')


    })
})