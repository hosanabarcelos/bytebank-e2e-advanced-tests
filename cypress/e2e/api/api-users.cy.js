describe('Requests to API',() => {
    context('GET /users',() => {
        it('returns a list of users', () => {
           cy.request('GET', 'http://localhost:8000/users').then((response) => {
            expect(response.status).to.eq(200);
              expect(response.body).length.to.be.greaterThan(1);
            });
        });
    });

    context('GET /users/:userId', () => {
        it('returns a single user', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/7b086318-3c99-4ddb-ae65-6c8f5174f530'
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('nome');
            });
        });

        it('returns an error when the user is invalid', () => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:8000/users/7b086318-3c99-0',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body).to.eq('Not Found');
            });
        });
    });

    context('network requests', () => {
        it('intercept POST users/login', () => {
            cy.intercept('POST', 'users/login').as('loginRequest');
            cy.login('alien@email.com', '123456');
            // cy.wait('@loginRequest').then((interception) => {
            //     interception.response = {
            //         statusCode: 200,
            //         body: {
            //             success: true,
            //             message: 'Login bem sucedido!'
            //         }
            //     }
            // });
            cy.visit('/home');
            cy.getByData('titulo-boas-vindas').should(
                'contain.text',
                  'Bem vindo de volta!'
           );
        });
    });
});
