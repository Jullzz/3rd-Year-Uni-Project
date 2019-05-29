var request = require("request");
var base_url = "http://localhost:8000/"

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

describe("Testing API Connection", () => {
    it("API Response should be valid json", function(done) {
        request.get(base_url + 'testpoint', function(error, response, body) {
            expect(
                JSON.parse(body)
            ).toEqual({sent: true})
            done();
        });
    });

    it("Data in DB shouldn't be valid json", function(done) 
    {
        request.get(base_url + 'api/getdbdata', function(error, response, body) 
        {
            console.log("There shouldnt be anthing here ==>"+body)
            expect(isJson(body[0])).toEqual(false)
            done();
        })
    });

    request.get(base_url + 'test/makedb', function(error, response, body){})
    request.get(base_url + 'test/populatedb', function(error, response, body){})

    it("Data in DB should be valid json", function(done) 
    {
        request.get(base_url + 'api/getdbdata', function(error, response, body) 
        {
            console.log("should be data"+ body);
            expect(isJson(body[1])).toEqual(true)
            done();
        })
    });
});