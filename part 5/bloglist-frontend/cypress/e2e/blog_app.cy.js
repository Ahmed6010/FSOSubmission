describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      username: 'sidou',
      name: 'sidou sid',
      password: 'sidou'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('sidou')
      cy.get('#password').type('sidou')
      cy.get('#login-button').click()

      cy.contains('sidou sid logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('midou')
      cy.get('#password').type('sidou')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'sidou sid logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'sidou', password: 'sidou' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Village Hidden in the Leaves')
      cy.get('#author').type('Minato Namikaze')
      cy.get('#url').type('exo-5.19.com')
      cy.get('#create').click()

      cy.contains('a new blog ( Village Hidden in the Leaves ) by sidou sid added')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Village Hidden in the Leaves Minato Namikaze')

    })

    describe('interacting with blogs', function(){
      beforeEach(function(){
        cy.createBlog({
          title :'Uchiha clan',
          url : 'exo-5.20.com',
          author : 'Madara Uchiha'
        })
      })

      it('the users can like a blog', function(){
        cy.contains('view').click()
        cy.contains('like').parent().should('contain', '0')
        cy.contains('like').click()
        cy.contains('like').parent().should('contain', '1')
      })

      it('a user who created a blog can delete it', function(){
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Uchiha clan Madara Uchiha')
      })

      it('unauthorized user can\'t delete a blog', function(){
        cy.contains('logout').click()

        const anotherUser = {
          username: 'lee',
          name: 'Rock Lee',
          password: 'lee'
        }
        cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
        cy.login({ username: 'lee', password: 'lee' })

        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })

    describe.only('several blogs exist', function(){
      beforeEach(function() {
        cy.createBlog({ title :'Village Hidden by Sand', url : 'exo-5.22.com', author : 'Gaara Yuzawa' })
        cy.createBlog({ title :'Uchiha clan', url : 'exo-5.22 (2).com', author : 'Madara Uchiha' })
        cy.createBlog({ title :'The Hidden Mist Village', url : 'exo-5.22 (3).com', author : 'Kisame Hoshigaki' })
      })

      it('the blogs are ordered according to likes', function(){
        cy.contains('The Hidden Mist Village').parent().find('button').click()  // view button
        cy.contains('The Hidden Mist Village').parent().find('button:contains("like")')
          .click()
          .wait(3000)
          .click()
        cy.contains('The Hidden Mist Village').parent().find('button:contains("hide")')
          .click()

        cy.contains('Uchiha clan').parent().find('button').click()  // view button
        cy.contains('Uchiha clan').parent().find('button:contains("like")')
          .click()
        cy.contains('Uchiha clan').parent().find('button:contains("hide")')
          .click()

        cy.get('.blog').eq(0).should('contain', 'The Hidden Mist Village')
          .wait(3000)
        cy.get('.blog').eq(1).should('contain', 'Uchiha clan')
          .wait(3000)
        cy.get('.blog').eq(2).should('contain', 'Village Hidden by Sand')
      })
    })

  })
})
