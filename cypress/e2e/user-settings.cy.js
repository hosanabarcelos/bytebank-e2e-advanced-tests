import { faker } from '@faker-js/faker';

describe('Update user data', () => {
  const newUserdata = {
    name: faker.name.fullName(),
    password: faker.internet.password(),
  };

  it('update user data', () => {
    cy.fixture('users').as('users');
    cy.get('@users').then((user) => {
      cy.login(user[0].email, user[0].password);

      cy.visit('/home');
      cy.url().should('include', '/home');

      cy.contains(user[0].name).should('be.visible')
    })
  });
});