describe("Booking API Test", () => {
  let token, bookingId;
  it("Authentications", () => {
    cy.api({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username: "admin",
        password: "password123",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      expect(response.body).to.have.property("token").to.be.a("string");
      expect(response.body).to.have.property("token").to.be.not.null;
      expect(response.body).to.have.property("token").to.be.not.empty;
      token = response.body.token;
    });
  });
  it("Get Booking", () => {
    cy.api({
      method: "GET",
      url: "https://restful-booker.herokuapp.com/booking",
      headers: {
        "Content-Type": "application/json",
        Cookie: "token=" + token,
      },
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
  });
  it("Create Booking", () => {
    cy.api({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      headers: {
        "Content-Type": "application/json",
        Cookie: "token=" + token,
      },
      body: {
        firstname: "Beki",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("bookingid");
      expect(response.body).to.have.property("bookingid").to.be.a("number");
      expect(response.body).to.have.property("bookingid").to.be.not.null;

      bookingId = response.body.bookingid;
    });
  });
  
  it("Update Booking", () => {
    cy.api({
      method: "PUT",
      url: "https://restful-booker.herokuapp.com/booking/" + bookingId,
      headers: {
        "Content-Type": "application/json",
        Cookie: "token=" + token,
      },
      body: {
        firstname: "Alex",
        lastname: "Morgan",
        totalprice: 222,
        depositpaid: false,
        bookingdates: {
          checkin: "2018-03-01",
          checkout: "2019-03-01",
        },
        additionalneeds: "Dinner",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.eq("Alex");
      expect(response.body.lastname).to.eq("Morgan");
      expect(response.body.totalprice).to.eq(222);
      expect(response.body.depositpaid).to.eq(false);
expect(response.body.bookingdates.checkin).to.eq("2018-03-01");
expect(response.body.bookingdates.checkout).to.eq("2019-03-01");
    });
  });
  it("Delete Booking", () => {
    cy.api({
      method: "DELETE",
      url: "https://restful-booker.herokuapp.com/booking/" + bookingId,
      headers: {
        "Content-Type": "application/json",
        Cookie: "token=" + token,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it("Check if booking is deleted", () => {
    cy.api({
      failOnStatusCode: false,
      method: "GET",
      url: "https://restful-booker.herokuapp.com/booking/" + bookingId,
      headers: {
        "Content-Type": "application/json",
        Cookie: "token=" + token,
      },
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it("check health", () => {
    cy.api({
      method: "GET",
      url: "https://restful-booker.herokuapp.com/ping",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include('Created');
    });
  });
});
