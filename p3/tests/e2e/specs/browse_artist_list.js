import { _ } from "core-js";

describe('Browse Artist List Page', () => {

    // check if access controls prevent access to the itinerary page

    // loosely based on https://docs.cypress.io/guides/getting-started/testing-your-app#Logging-in
    // but separate api controling login complicates it a bit.

    // TODO need a reset script

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



    it('browse some artists', () => {
        cy.visit('/browse-artists');

        // check results
        cy.contains('h2', 'Build An Itinerary')

        // make sure there no cards at the start
        cy.get('[data-test="artistcard"]').should('not.exist');

        // get books and paper artists
        cy.get('[data-test="medium-books"]').click();

        // make sure there are some cards
        cy.get('[data-test="artistcard"]').its('length').should('be.gte', 3);

        //login  (there is a better way by we'll just go to the page )
        /*
                cy.visit('/login');
                cy.get('[data-test=email-input]').clear().type(user.email);
                cy.get('[data-test=password-input]').clear().type(user.password);
                cy.get('[data-test=login-button]').click();
                cy.wait(3000);  // anti patern
                cy.visit('/itinerary');
                cy.contains('h2', 'Itinerary')
        */

    })

    it('add artists to itinerary', () => {


        cy.visit('/browse-artists');

        // check results
        cy.contains('h2', 'Build An Itinerary')

        // make sure there no cards at the start
        cy.get('[data-test="login-button"]').should('exist');

        //login  (there is a better way by we'll just go to the page )

        cy.visit('/login');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type(user.password);
        cy.get('[data-test=login-button]').click();
        cy.wait(3000);  // anti patern


        cy.visit('/browse-artists');
        cy.contains('h2', 'Build An Itinerary')


        // get books and paper artists
        cy.get('[data-test="medium-books"]').click();

        // make sure there are some artist that show up
        cy.get('[data-test="artistcard"]').its('length').should('be.gte', 3);


        // check the count iterated
        // https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Variables
        cy.get('[data-test="itin-count"]').then(($span) => {
            const itinCount1 = parseInt($span.text());
            // get first button with "add" and click it.
            cy.get('[data-test="artistcard-add"]').first().click().then(() => {
                const itinCount2 = parseInt($span.text());
                expect(itinCount2).to.eq(itinCount1)
            })

        })

        cy.get('[data-test="artistcard-remove"]').its('length').should('be.gte', 1);

        //cy.get('[data-test="artistcard-remove"]').first().click();


    })
})

