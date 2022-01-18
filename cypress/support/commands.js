
/************Function to validate content body by specific criteria **************
 ********** For example: Validate if the response.body has the ID needed ************/
Cypress.Commands.add('validateBody',(obj,node,criteria)=>{
    let isCorrectID=true;
    if(node=="status")
        obj.forEach(function (el){
            if(el.status!=criteria)
            isCorrectID=false;
            
        });
    else if(node=="id")
        for(var i=0;i<obj.lenght;i++){
            if( obj[i].id!=criteria)
            isCorrectID= false;
        }
    
    cy.wrap(isCorrectID).as('isCorrectID');

})

	
/************Function to find for an specific criteria **************
 ********** For example: find by id, by tag, by status ************/
 Cypress.Commands.add('findPetBy', (searchingType, parameter) => {
 
    cy.fixture('data').then(function (uri) {
        let url;
        if(searchingType!="id"){
            url= uri.url + uri.petSource + '/' + 'findBy' + searchingType + '?' + searchingType.toLowerCase() + "=" + parameter
        }else{
            url=uri.url + uri.petSource + '/' + parameter
        }
        cy.request({
            method: 'GET',
            url:url

        }).then((response)=> {
            return response;
           
        })

    })

 })


