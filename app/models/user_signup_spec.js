
// If code is to be ran more than once the databse must be reset
describe('User Signup and Sign_in', function() {
  it('Checks if User Signup works', function() {
      cy.server()
      // cy.request('DELETE', 'http://localhost:3000/users')
      // cy.exec('rake db:reset').its('code').should('eq', 0)

      // Start at home page
      cy.visit('/users')
      // Click the sign up link in the top right navbar
      cy.get('ul li:nth-child(3)').click()
      cy.url().should('match', /users/)
      cy.server()
      // Use the stubbed out json file '/cypress/fixtures/user.json' that contains the user data
      cy.fixture('user').then((json) => {

      cy.get('#user_name')
      .type(json.name)
      .should('have.value', 'Reader')

      cy.get('#user_email')
      .type(json.email)
      .should('have.value', 'fake@email.com')

      cy.get('#user_password')
      .type(json.password)
      .should('have.value', 'password')

      cy.get('#user_password_confirmation')
      .type(json.password)
      .should('have.value', 'password')

      cy.get('#user_role_reader')
      .click(json.role)
      .should('have.value', "reader")

      cy.get('.actions input.btn.btn-default').click()
      cy.url().should('include', '/')

      cy.server().should(function(server){
        expect(server.method).to.eq('GET')
        // Check if the server proccessed te request successfully
        expect(server.status).to.eq(200)
      })
    })
  })
  // Sign in with same user that signed up
  it('Checks if User Sign_in works', function() {
    cy.get('ul.nav.navbar-nav.navbar-right li ').click()
    // cy.visit('/users/sign_in')
    // Check that the test starts in the correct page
    cy.url().should('include', 'users/sign_in')
    cy.get('#user_email')
    .type('fake@email.com')
    .should('have.value', 'fake@email.com')

    cy.get('#user_password')
    .type('password')
    .should('have.value', 'password')
    // Click the logout link
    cy.get('.actions input.btn.btn-default').click()
    cy.url().should('include', '/')

    cy.server().should(function(server){
      expect(server.method).to.eq('GET')
      // Check if the server proccessed te request successfully
      expect(server.status).to.eq(200)

    })
  })
})


// ------------------ When using rails commands in the terminal as seen below cypress returns the following error ----------------
// ------------------ To stop this error I would have to use kill -9 command for the rails server, the cypress server and restart the server for cypress to run properly
// This is the Error: There are two other sessions using the database error code
// cy.exec('rake db:reset').its('code').should('eq', 0)
// cy.exec('rake db:seed').its('code').should('eq', 0)
// cy.exec('rake db:reset').its('code').should('eq', 0)

// ------------------ Attempt to use AJAX to create a temporary user to test for sign_in via XMLHTTP POST request ----------------
// cy.request({
//     method: 'POST',
//     url: '/users',
//     form: true,
//     body: {
//       name: 'jim',
//       email: 'jim@email.com',
//       password: "password",
//       role: "author",
//     }
// })
// ------------------ Attempt to use created user to test for sign_in via XMLHTTP GET request ----------------

// .then(function(response){
// // cy.route( 'GET', '/users/6.json').as('getUser6')
// // cy.visit('http://localhost:3000/users/6')
// // expect(response.status).to.eq(200)
//   expect(response.body).to.have.property('name', 'jim') // true
// })
// cy.getCookie('cypress-session-cookie').should('exist')
