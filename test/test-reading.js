var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);


describe('Reading', function() {
  describe('#getByID()', function() {
    it('Should return a reading with the given integer id.', function(done) {
      chai.request("http://localhost:8080")
	.get('/get/reading/id/123')
        .end(function (err, res) {
          expect(err).to.be.null;
	  expect(res).to.have.status(200);
	  done();
        });
    });
  });

  describe('getByTitle()', function() {
    it('Should return all readings for the book with the given title.', function(done) {
      chai.request("http://localhost:8080")
        .get("/get/reading/title/MobyDick")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    })
  });
});
