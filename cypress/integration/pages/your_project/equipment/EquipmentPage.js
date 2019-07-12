class EquipmentPage{

    constructor(){
        this.url = Cypress.env('baseUrl_A');
    }


    getUrl(){
        return this.url;
    }
}


module.exports = EquipmentPage;