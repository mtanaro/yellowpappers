Cypress.Commands.add('login', (user, pass) => {
 
	cy.fixture('data').then(function (uri) {
		cy.request({
			method: 'GET',
			url: uri.url + uri.userSource + '/' + 'login?' + "username=" + user + "&password=" + pass
		})

	})

})

