describe('Browse Artist List Page', () => {

  // check Itinerary page

  // right now artists need to be added to this page from the browsing page.
  // so Need a start state, rather than building up from scratch

  // TODO need a Start State

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

  it('access of itinerary page after logging in', () => {
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