import { stringify } from "ini";

describe("GET By Filter", () => {
  before(() => {
    cy.api({
      url: "https://restful-booker.herokuapp.com/auth",
      method: "POST",
      body: { username: "admin", password: "password123" },
    });
  });
  it("Get Booking name", () => {
    cy.api({
      url: "https://restful-booker.herokuapp.com/booking?firstname=sally&lastname=brown",
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(stringify(response.body));
    });
  
  });
  it("Get Booking date", () => {
    cy.api({
      url: "https://restful-booker.herokuapp.com/booking?checkin=2016-01-01&checkout=2017-01-01",
      method: "GET",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
