import { faker } from '@faker-js/faker';

describe('SignUp user', () => {
    const user = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    it('regiter user', () => {
        cy.visit('/');

        cy.getByData('botao-cadastro').click();
        cy.getByData('nome-input').type(user.name);
        cy.getByData('email-input').type(user.email);
        cy.getByData('senha-input').type(user.password);
        cy.getByData('checkbox-input').check();
        cy.getByData('botao-enviar').click({ force: true });

        cy.getByData('mensagem-sucesso')
            .should('exist')
            .contains('Usuário cadastrado com sucesso!');

        cy.request('GET', 'http://localhost:8000/users').then((resposta) => {
            expect(resposta.body).to.have.lengthOf.at.least(1);
            expect(resposta.body[resposta.body.length - 1]).to.deep.include(user);
        });
    });
});