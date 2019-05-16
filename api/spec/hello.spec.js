var request = require("request");

var base_url = "http://localhost:8000/api/getdbdata"

// describe("Hello World Suite", function() {
//     it("check if text is 'Hello World'", function(done) {
//         let text = "Hello World";
//         expect(text).toBe("Hello World");
//         done();
//     });
//    it("check if another text is 'Hello World'", function(done) {
//         let text = "Not Hello World";
//         expect(text).toBe("Hello World");
//         done();
//     });
// });

describe("bbbb", () => {
    it("API Response should be valid json", function(done) {
        request.get(base_url, function(error, response, body) {
            console.log(error);
            expect(() => {
                JSON.parse(body);
            }).not.toThrow();
            done();
        });
    });
});
