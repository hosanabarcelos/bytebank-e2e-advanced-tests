describe('Requests to API',()=>{
    context('GET /users',()=>{
        it('return a list of users', ()=>{
           cy.request('GET', 'http://localhost:8000/users').then((response)=>{
            expect(response.status).to.eq(200);
              expect(response.body).length.to.be.greaterThan(1);
            });
        });
    });
});
