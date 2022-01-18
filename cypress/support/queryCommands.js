Cypress.Commands.add('postRequest', function (uri,body) {
	cy.request({
		method: 'POST',
		url: uri.url + uri.petSource,
		body:body                
	})
	
})



Cypress.Commands.add('putRqeuest', function (uri,body) {
	cy.request({
		method: 'PUT',
		url: uri.url + uri.petSource,
		body:body                
	})
	
})

Cypress.Commands.add('postRequestByID', function (uri,id,name,status) {
	cy.request({
		method: 'POST',
		url: uri.url + uri.petSource+'/'+id+'?name='+name+'&status='+status,
              
	})
	
})

Cypress.Commands.add('deletRequestByID', function (uri,id) {
	cy.request({
		method: 'DELETE',
		url: uri.url + uri.petSource+'/'+id
              
	})
	
})

Cypress.Commands.add('getStoreInventory', function (uri,endpoint) {

	cy.request({
		method: 'GET',
		url: uri.url + uri.storeSource+'/'+endpoint
			
	})

})
Cypress.Commands.add('getStoredOrderyById', function (uri,endpoint,id) {

	cy.request({
		method: 'GET',
		url: uri.url + uri.storeSource+'/'+endpoint+'/'+id
			
	})

})

Cypress.Commands.add('postStoreOrder', function (uri,endpoint,body) {

	cy.request({
		method: 'POST',
		url: uri.url + uri.storeSource+'/'+endpoint,
		body:body
			
	})

})

Cypress.Commands.add('deleteElementByID', function (uri,source,endpoint,id) {
	cy.request({
		method: 'DELETE',
		url: uri.url + source+'/'+endpoint+'/'+id
              
	})
	
})