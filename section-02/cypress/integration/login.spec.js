describe('The login process', () => {
    it('should login a user, flash a message, and redirect to the home', () => {
        //mocking server - testing client side

        cy.server() //any outgoing api it intercepted by cypress fixture

        cy.fixture('user').as('user')

        cy.route('POST', '/api/v1/auth/login', '@user') //intercepted, cypress returns fixtured 'user'

        cy.visit('/auth/login')

        cy.get('input[name="email"]').type("doctor@strange.com")
        cy.get('input[name="password"]').type('password')

        cy.get('[data-cy=submit-button]').click()

        cy.get('#confirm-email').should('contain', 'Please confirm your email address.')
        cy.get('#auth-username').should('contain', 'Hey, doctor')
        cy.get('#auth-logout').should('contain', 'Logout')
    })



})