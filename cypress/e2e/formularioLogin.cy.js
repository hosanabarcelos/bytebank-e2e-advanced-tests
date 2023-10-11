describe('Login Form', ()=>{
  it.only('access the home page', ()=>{
    cy.login('alien@email.com', '123456');
    cy.visit('/home');
    cy.getByData('titulo-boas-vindas').should('contain', 'Bem vindo de volta!');
  });

  it('should not allow an invalid email', ()=>{
    cy.getByData('botao-login').click()
    cy.getByData('email-input').type('alienigena@email.com')
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido')
  });

  it('should not allow a blank field', ()=>{
    cy.getByData('botao-login').click()
    cy.getByData('senha-input').type('123456')
    cy.getByData('botao-enviar').click()
    cy.getByData('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório')
  });
});