// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
// cypress/support/commands.js

// cypress/support/commands.js

const baseUrl = "https://api.tech-global-training.com";

Cypress.Commands.add("getAllInstructors", () => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/instructors`,
  });
});

Cypress.Commands.add("getSingleInstructor", (instructorId) => {
  return cy.request({
    method: "GET",
    url: `${baseUrl}/instructors/${instructorId}`,
  });
});

Cypress.Commands.add("createStudent", (student) => {
  if (![1, 2, 3, 4].includes(student.instructorId)) {
    throw new Error("Invalid INSTRUCTOR_ID! It can be 1, 2, 3, or 4.");
  }
  return cy.request({
    method: "POST",
    url: `${baseUrl}/students`,
    body: student,
  });
});

Cypress.Commands.add("deleteStudent", (studentId) => {
  return cy.request({
    method: "DELETE",
    url: `${baseUrl}/students/${studentId}`,
  });
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
