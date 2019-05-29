var request = require("request");

var base_url = "http://processing:5000/"

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

describe("Testing API Connection", () => 
{
    it("Processing Server Response should be valid json", function(done) 
    {
        request.get(base_url + 'displayAll', function(error, response, body) 
        {
            expect(isJson(body[0])).toEqual(true)
            done();
        })
    });
});
