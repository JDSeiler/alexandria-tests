var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

var config = require('../config.json');
const HOSTNAME = config.hostname;

describe('Getting book objects:', function() {
  describe('getByID()', function() {
    it('Should return a book with the given integer id.', function(done) {
      chai.request(HOSTNAME)
	.get('/book/id/123')
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
        .get("/book/title/MobyDick")
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
        .get("/book/author/JohnDoe")
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
        .get("/book/all")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Creating book objects:', function() {
  describe('createBook()', function() {
    it('TEMP Should reject a new book given an invalid JSON body.', function(done) {
      chai.request(HOSTNAME)
        .post('/create/book')
        .set('Content-Type', 'application/json')
        .send({requestFrom: 'chai-http', purpose: 'Dummy JSON for testing'})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

describe('Updating book objects:', function() {
  describe('updateBookByID()', function() {
    it('Should update an existing book object with the given ID.', function(done) {
      chai.request(HOSTNAME)
        .put('/book/id/123')
        .set('Content-Type', 'application/json')
        .send({requestFrom: 'chai-http', purpose: 'Dummy JSON from testing'})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Deleting book objects:', function() {
  describe('deleteBookByID()', function() {
    it('Should delete the book object with the given ID.', function(done) {
      chai.request(HOSTNAME)
        .delete('/book/id/99999')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
