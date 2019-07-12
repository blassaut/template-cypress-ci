class LoginPage {

    constructor(){
        this.username = "#your_username_id";
        this.password = "#your_password_id";
        this.submitButton = "#your_submit_form_id";
        this.jsessionID = 'JSESSIONID';
        this.url = Cypress.env('baseUrl_A');

    }


    visit(){
        return cy.visit(this.url);
    }

    setid(id){
        const IdField = cy.get(this.username);
        IdField.clear();
        IdField.type(id);
        
    }

    setPassword(password){
        const passwordField = cy.get(this.password);
        passwordField.clear();
        passwordField.type(password);
    }

    submit(){
        const buttonSubmit = cy.get(this.submitButton);      
        buttonSubmit.click();

    }

    onLogin(id,password){
        this.visit()
        this.setid(id);
        this.setPassword(password);
        this.submit();
        return this;
    }

    getUrl(){
        return this.url;
    }

    getJsessionId(){
		return this.jsessionID;
	}
}

module.exports = LoginPage;