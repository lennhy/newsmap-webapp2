// This code is only to be ran once
describe('The Home Page', function() {
  it('Checks if User Signup works', function() {
      cy.visit('/users')
      cy.get('ul li:nth-child(3)').click()
      cy.url().should('match', /users/)
      cy.server()
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
        // the default options on server
        // you can override any of these options
        expect(server.method).to.eq('GET')
        expect(server.status).to.eq(200)
      })
    })
  })
  it('Checks if User Sign_in works', function() {
  // cy.visit('/')
  // cy.url().should('include', 'users/sign_in')
  // cy.get('#user_email')
  // .type('test@gmail.com')
  // .should('have.value', 'test@gmail.com')
  //
  //
  // cy.get('#user_password')
  // .type('password')
  // .should('have.value', 'password')
  //
  // cy.get('.actions input.btn.btn-default').click()
  // cy.url().should('include', '/')
  //
  // cy.server().should(function(server){
  //   // the default options on server
  //   // you can override any of these options
  //   expect(server.method).to.eq('GET')
  //   expect(server.status).to.eq(200)
  })
})

//   // Reader account "lem"
//   // Visit a web page
// beforeEach(function(){
//   // cy.request('http://localhost:3000/db/seed')
//   cy.exec('rake db:seed').its('code').should('eq', 0)
//
// })
// There are two other sessions using the database error code
// cy.exec('rake db:reset').its('code').should('eq', 0)
// cy.exec('rake db:seed').its('code').should('eq', 0)
// cy.exec('rake db:reset').its('code').should('eq', 0)


  // cy.visit('/')
  // cy.url().should('include', 'users/sign_in')
  // cy.get('#user_email')
  // .type('test@gmail.com')
  // .should('have.value', 'test@gmail.com')
  //
  //
  // cy.get('#user_password')
  // .type('password')
  // .should('have.value', 'password')
  //
  // cy.get('.actions input.btn.btn-default').click()
  // cy.url().should('include', '/')
  //
  // cy.server().should(function(server){
  //   // the default options on server
  //   // you can override any of these options
  //   expect(server.method).to.eq('GET')
  //   expect(server.status).to.eq(200)

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
    // .then(function(response){
    // // cy.route( 'GET', '/users/6.json').as('getUser6')
    // // cy.visit('http://localhost:3000/users/6')
    //   // expect(response.status).to.eq(200)
    //   expect(response.body).to.have.property('name', 'jim') // true
    // })
    // cy.getCookie('cypress-session-cookie').should('exist')


// describe('The user that signsup is gets the correct role via Network Requests', function() {
//   it('cy.server() - control behavior of network requests and responses', function(){
//     // https://on.cypress.io/server
//     cy.server().should(function(server){
//       // the default options on server
//       // you can override any of these options
//       expect(server.method).to.eq('GET')
//       expect(server.status).to.eq(200)
//     })
//     cy.visit('http://localhost:3000/')
//     cy.request('users/6.json')
//     cy.request('/users/6').its('body').should('include', 'lem')

    // cy.route( 'GET', '/users/6').as('user')
    // cy.visit('/users/6')
    // cy.get()

      // method: 'GET',      // Route all GET requests
      // url: '/users/*',    // that have a URL that matches '/users/*'
      // force404: false,
      // response: []        // and force the response to be: []

    // cy.route('GET', '/user', 'fixture:user.json')
    // cy.fixture("users/6.json").as('@userJSON') //returns dogs.png as Base64
    // cy.fixture("users/6.json").should('include', '"name":"lem"')


  // if user.role is reader then
  // text will be displayed.
  // and there will be no input box to submit an article.
  //
  // if user.role is author then
  // text will display
  // and there will be an input box to submit a review
//   })
// })
//
// describe('The Home Page', function(){
//   beforeEach(function(){
//     // reset and seed the database prior to every test
//     cy.exec('npm run db:reset && npm run db:seed')
//
//     // seed a user in the DB that we can control from our tests
//     // assuming it generates a random password for us
//     cy.request('POST', '/test/seed/user', { username: 'jane lane' })
//       .its('body')
//       .as('currentUser')
//   })
//
//   it('logs in programmatically without using the UI', function(){
//     // destructuring assignment of the this.currentUser object
//     const { username, password } = this.currentUser
//
//     // programmatically log us in without needing the UI
//     cy.request('POST', '/users/sign_in', {
//       username,
//       password
//     })
//
//     // now that we're logged in, we can visit
//     // any kind of restricted route!
//     cy.visit('/users')
//
//     // our auth cookie should be present
//     cy.getCookie('your-session-cookie').should('exist')
//
//     // UI should reflect this user being logged in
//     cy.get('li.pull-left').should('contain', 'jane lane')
//   })
// })
