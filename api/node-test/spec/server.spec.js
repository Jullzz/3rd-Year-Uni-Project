var Request = require("request");

describe("Server", () => 
{
    var serverTest;
    beforeAll(() =>{
        serverTest = require("../../server");
    });

    afterAll(()=> {
        server.close();
    });
//Test1: local host
    describe(" GET /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:8000/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body).toBe("TBC");
        });   
    });
//Test2: api/getbdata
    describe(" GET /api/getbdata", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:8000/api/getbdata", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(404);
        });
        it("Body", () => {
            expect(data.body.message).toBe("Data from the database");
        });   
    });
});