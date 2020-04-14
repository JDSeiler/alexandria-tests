var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

var config = require('../config.json');
const HOSTNAME = config.hostname;

describe('Getting "book" objects:', function() {
  describe('#getByID()', function() {
    it('Should return a book with the given integer id.', function(done) {
      chai.request(HOSTNAME)
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
      chai.request(HOSTNAME)
        .get("/get/book/title/MobyDick")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('getByAuthor()', function() {
    it('Should return all books by the given author.', function(done) {
      chai.request(HOSTNAME)
        .get("/get/book/author/JohnDoe")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('getAll()', function() {
    it('Should return all books.', function(done) {
      chai.request(HOSTNAME)
        .get("/get/book/all")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
