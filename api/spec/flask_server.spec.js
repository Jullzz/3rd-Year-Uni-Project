var request = require("request");

var base_url = "http://localhost:8000/"

describe("Testing API Connection", () => {
    it("API Response should be valid json", function(done) {
        request.get(base_url + 'testpoint', function(error, response, body) {
            expect(
                JSON.parse(body)
            ).toEqual({sent: true})
            done();
        });
    });
});
