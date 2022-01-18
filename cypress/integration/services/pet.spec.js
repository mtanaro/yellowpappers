/// <reference types="cypress"/>

describe('Pet source test', () => {

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

    it("GET - Sucessfull searching an existing pet by status == available", function () {
        
        var status="available";
        var findBy="Status"
        cy.findPetBy(findBy, status).as('res');      
        cy.get('@res').then((response)=>{
            cy.validateBody(response.body,findBy,status);
            cy.get('@isCorrectID').then(isCorrectID=>{
                expect(isCorrectID).to.be.true;
            })
            expect(response).property('status').to.equal(200);
            expect(response.body).not.be.null;
            cy.log("Response body is: " + JSON.stringify(response.body));
        })
    })

    it("GET - Sucessfull searching an existing pet by status == pending", function () {
        
        var status="pending";
        var findBy="Status"
        cy.findPetBy(findBy, status).as('res');      
        cy.get('@res').then((response)=>{
            cy.validateBody(response.body,findBy,status);
            cy.get('@isCorrectID').then(isCorrectID=>{
                expect(isCorrectID).to.be.true;
            })
            expect(response).property('status').to.equal(200);
            expect(response.body).not.be.null;
            cy.log("Response body is: " + JSON.stringify(response.body));
        })
    })
    it("GET - Sucessfull searching an existing pet by status == sold", function () {
      
        var status="sold";
        var findBy="Status"
        cy.findPetBy(findBy, status).as('res');      
        cy.get('@res').then((response)=>{
            cy.validateBody(response.body,findBy,status);
            cy.get('@isCorrectID').then(isCorrectID=>{
                expect(isCorrectID).to.be.true;
            })
            expect(response).property('status').to.equal(200);
            expect(response.body).not.be.null;
            cy.log("Response body is: " + JSON.stringify(response.body));
        })
    })
    it("GET - Sucessfull searching an existing pet by id == 2", function () {
       
        var id="2";
        var findBy="id"
        cy.findPetBy(findBy, id).as('res');      
        cy.get('@res').then((response)=>{
            cy.validateBody(response.body,findBy,id);
            cy.get('@isCorrectID').then(isCorrectID=>{
                expect(isCorrectID).to.be.true;
            })
        
            expect(response).property('status').to.equal(200);
            expect(response.body).not.be.null;

            cy.log("Response body is: " + JSON.stringify(response.body));
         })
    })
 

    it("GET - Sucessfull searching an existing pet by random id ", function () {
        var id=Math.floor(Math.random() * 10)+1;
        var findBy="id"
      
        cy.findPetBy(findBy, id).as('res');      
        cy.get('@res').then((response)=>{ 
            cy.validateBody(response.body,findBy,id);
            cy.get('@isCorrectID').then(isCorrectID=>{
                expect(isCorrectID).to.be.true;
            })
        
            expect(response).property('status').to.equal(200);
            expect(response.body).not.be.null;

            cy.log("Response body is: " + JSON.stringify(response.body));
         })
    })

     it("POST - CRUD Operation - Add new pet ", function () {
        var data;
        cy.fixture("petData").then((petData)=> {
               data=petData;
           
             cy.fixture('data').then(function (uri) {
                    cy.postRequest(uri,petData).then((response)=>{
                    expect(response).property('status').to.equal(200);
                    expect(response.body).not.be.null;
                    expect(response.body.name).equal(data.name)

                    cy.log("Body has: "+JSON.stringify(response.body))
                    cy.deletRequestByID(uri,response.body.id).then((delResponse)=>{
                        expect(response).property('status').to.equal(200);
                    });    
        
            })
            

           })

        });
       
     })

     it("PUT - CRUD Operation - update existing pet ", function () {
        var data;
        const newPetData = {name:'Sultan',status:'sold'};

        cy.fixture("petData").then((petData)=> {
               data=petData;
           
             cy.fixture('data').then(function (uri) {
                    cy.postRequest(uri,petData).then((resp)=>{
                        data=resp.body;
                        data.name=newPetData.name;
                        data.status=newPetData.status;
                        cy.putRqeuest(uri,data).then((response)=>{
                            expect(response).property('status').to.equal(200);
                            expect(response.body).not.be.null;
                            expect(response.body.name).equal(data.name)

                            cy.log("Body has: "+JSON.stringify(response.body))
                            cy.deletRequestByID(uri,response.body.id).then((delResponse)=>{
                                expect(response).property('status').to.equal(200);
                            });   
                    });
  
            });
           });
      });
     })

     it("POST - CRUD Operation - update a pet by ID ", function () {
        var data;
        //We will use id for an existing pet in roder to be sure we are editing the same data
        

        cy.fixture("petData").then((petData)=> {
               data=petData;
               const newPetData = {name:'Rita',status:'sold'};
           
             cy.fixture('data').then(function (uri) {
                    cy.postRequest(uri,petData).then((response)=>{                       
                        expect(response).property('status').to.equal(200);
                        expect(response.body).not.be.null;
                        expect(response.body.name).equal(data.name)

                        cy.log("Body has: "+JSON.stringify(response.body))
                        cy.postRequestByID(uri,response.body.id,newPetData.name,newPetData.status).then((res=>{
                            expect(res).property('status').to.equal(200);
                            expect(res.body).not.be.null;
                            expect(res.body.id).equal(response.body.id);
                            expect(res.body.name).equal(newPetData.name);
                            expect(res.body.status).equal(newPetData.status);
                            cy.deletRequestByID(uri,response.body.id).then((delResponse)=>{
                                expect(delResponse).property('status').to.equal(200);
                            });   

                        }))
                    });
   
           });

        });
       
     });

   
})

