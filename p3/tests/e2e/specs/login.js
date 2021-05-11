describe('Login Page', () => {

    // based on zipfoods

    const user = {
        name: 'Jill Harvard',
        email: 'jill@harvard.edu',
        password: 'asdfasdf'
    }


    const user2 = {
        name: 'Jill Harvard',
        email: 'jill@harvard.edu',
        password: 'asdfasdf'
    }

    it('reports bad login', () => {
        cy.visit('/login');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type('bad password');
        cy.get('[data-test=login-button]').click();


        cy.contains('These credentials do not match our records');
    })

    it('reports good login', () => {
        cy.visit('/login');
        cy.get('[data-test=email-input]').clear().type(user.email);
        cy.get('[data-test=password-input]').clear().type(user.password);
        cy.get('[data-test=login-button]').click();

        // check results
        cy.contains('[data-test="login-ok"]', user.name);
        cy.get('[data-test=logout-button]').click();

        // We know logout works if we see the login button again
        cy.get('[data-test="login-button"]').should('exist');
    })
})