var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);


describe('Book', function() {
  describe('#getByID()', function() {
    it('Should return a book with the given integer id.', function(done) {
      chai.request("http://localhost:8080")
	.get('/get/book/id/123')
        .end(function (err, res) {
          expect(err).to.be.null;
	  expect(res).to.have.status(200);
	  done();
        });
    });
  });

  describe('getByTitle()', function() {
    it('Should return a book with the given title.', function(done) {
      chai.request("http://localhost:8080")
        .get("/get/book/title/MobyDick")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    })
  });
});
