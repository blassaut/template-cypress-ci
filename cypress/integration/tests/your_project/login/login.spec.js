/// <reference types="cypress"/>

import LoginPage from '../../../pages/your_project/login/LoginPage';
import EquipmentPage from '../../../pages/your_project/equipment/EquipmentPage';
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const loginPage = new LoginPage();
const equipmentPage = new EquipmentPage();

Given('I visit the login page', () => {
    loginPage.visit();
});

When('I set "username" And "password"', () => {
    cy.fixture('users.json').as('users').then((users) => {
    loginPage.setid(users.correctUser.id); 
    loginPage.setPassword(users.correctUser.password); 
    })
});

When('I click on the submit Button', () => {
    loginPage.submit();
});

Then('The user is logged in and goes to the equipment page', () => {
    cy.url().should('include',equipmentPage.getUrl());
});
