describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentId int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentId, FirstName, StudentGroup, City) VALUES
            (1, "Anna", "01-2024", "Moscow"),
            (2, "Nika", "02-2024", "Ryazan"),
            (3, "Lola", "03-2024", "Milan"),
            (4, "Mark", "01-2024", "Tokio"),
            (5, "Nick", "02-2024", "Omsk");`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.eq(5);
    });
  });

  it("add two more students to group", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentId, FirstName, StudentGroup, City) VALUES
            (6, "Zinaa", "01-2024", "Novgorod"),
            (7, "Olga", "02-2024", "Tula")`
    );
  });

  it("select students by studentgroup", () => {
    cy.task(
        "queryDb",
        `SELECT * FROM Students WHERE StudentGroup = "01-2024"`
    ).then((result) => cy.log(JSON.stringify(result)));
  });

  it("can delete the table", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
