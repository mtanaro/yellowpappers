/// <reference types="cypress"/>

describe('Store source test', () => {

    beforeEach(() => {
        cy.fixture("userAuth").then(function (userAuth) {
            this.userAuth = userAuth;
        }).then(function () {
            cy.login(this.userAuth.userName, this.userAuth.userPass);
        }).then(function (response) {
            expect(response).property('status').to.equal(200);
            let str= (response.body);
            this.userAuth.sessionID = str.split(':')[1].trim();
 
        })

    })

    it("GET - Get inventory", function () {
        
        var endpoint='inventory';
        cy.fixture('data').then(function (uri) {
            cy.getStoreInventory(uri,endpoint).then((res)=>{
                expect(res).property('status').to.equal(200);
                expect(res.body).not.be.null;
                
                cy.log("inventory has: "+JSON.stringify(res.body))
            });
        })

    })
    
    it("POST - Add an order for a pet", function () {
        var data;
        var endpoint='order'
        cy.fixture('inventoryData').then((petData)=> {
            data=petData;
            cy.fixture('data').then(function (uri) {

                cy.postStoreOrder(uri,endpoint,data).then((res)=>{
                    expect(res).property('status').to.equal(200);
                    expect(res.body).not.be.null;
                    
                    cy.log("inventory has: "+JSON.stringify(res.body))
                    cy.deleteElementByID(uri,uri.storeSource,endpoint,res.body.id).then((delResponse)=>{
                        expect(delResponse).property('status').to.equal(200);
                    });   
                });
            })
        })

    })
    
    it("GET - Get purchase order by id", function () {
        var data;
        var endpoint='order'
        cy.fixture('inventoryData').then((petData)=> {
            data=petData;
            cy.fixture('data').then(function (uri) {

                cy.postStoreOrder(uri,endpoint,data).then((res)=>{
                    expect(res).property('status').to.equal(200);
                    expect(res.body).not.be.null;
                  

                    cy.log("inventory has: "+JSON.stringify(res.body))
                    cy.getStoredOrderyById(uri,endpoint,res.body.id).then(result=>{
                        expect(result).property('status').to.equal(200);
                        expect(result.body.id).equal(res.body.id);

                        cy.log("Result body for ID criteria: "+JSON.stringify(result.body) )
                    })
                                      
                    cy.deleteElementByID(uri,uri.storeSource,endpoint,res.body.id).then((delResponse)=>{
                        expect(delResponse).property('status').to.equal(200);
                    });   
                });
            })
        })
          
    })
})

    
