import { faker } from '@faker-js/faker';

describe('Update user data', () => {
    const newUserData = {
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

            cy.getByData('app-home').find('a').eq(1).click();

            cy.url().should('include', '/minha-conta');

            cy.getByData('botao-salvar-alteracoes').should('be.disabled');

            cy.get('[name = "nome"]').type(newUserData.name);
            cy.get('[name = "senha"]').type(newUserData.password);

            cy.getByData('botao-salvar-alteracoes').should('not.be.disabled');
            cy.getByData('botao-salvar-alteracoes').click();

            cy.on('window:alert', (alertText) => {
                expect(alertText).to.equal('Alterações salvas com sucesso!');
            });

            cy.url().should('include', '/home');

            //api
            cy.window().then((win) => {
                expect(win.localStorage.getItem('nomeUsuario')).to.equal(
                newUserData.name
                );

                const userId = win.localStorage.getItem('userId');
                cy.request('GET', `http://localhost:8000/users/${userId}`).then(
                    (response) => {
                      expect(response.status).to.eq(200);
                      expect(response.body.nome).to.be.equal(newUserData.name);
                      expect(response.body.senha).to.be.equal(newUserData.password);
                });
            });
        });
    });
});