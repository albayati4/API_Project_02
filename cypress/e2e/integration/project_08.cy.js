// cypress/integration/api-tests.spec.js

describe("TechGlobal Student-Instructor APIs", () => {
  it("Retrieve all instructors and validate the response", () => {
    cy.getAllInstructors().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(4);
      response.body.forEach((instructor, index) => {
        expect(instructor).to.have.property("INSTRUCTOR_ID");
        expect(instructor).to.have.property("FULLNAME");
        expect(instructor).to.have.property("STUDENTS").and.to.be.an("array");
      });
      const instructorIds = response.body.map((instructor) => instructor.INSTRUCTOR_ID);
      expect(instructorIds).to.deep.eq([1, 2, 3, 4]);
    });
  });

  it("Retrieve a single instructor and validate the response", () => {
    const instructorId = 1; // Valid instructor ID
    cy.getSingleInstructor(instructorId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.INSTRUCTOR_ID).to.eq(instructorId);
      expect(response.body).to.have.property("FULLNAME");
      expect(response.body).to.have.property("STUDENTS").and.to.be.an("array");
    });
  });

  it("Create a new student and validate its association with the instructor", () => {
    const newStudent = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dob: "2000-01-01",
      instructorId: 1, // Valid instructor ID
    };

    // Step 1: Create a new student
    cy.createStudent(newStudent).then((response) => {
      expect(response.status).to.eq(201);
      const createdStudentId = response.body.STUDENT_ID;

      // Step 2: Validate the new student is listed under the instructor
      cy.getSingleInstructor(newStudent.instructorId).then((response) => {
        expect(response.status).to.eq(200);
        const students = response.body.STUDENTS;
        const student = students.find((student) => student.STUDENT_ID === createdStudentId);
        expect(student).to.exist;

        // Step 3: Delete the newly created student
        cy.deleteStudent(createdStudentId).then((response) => {
          expect(response.status).to.eq(204);
        });
      });
    });
  });
});
