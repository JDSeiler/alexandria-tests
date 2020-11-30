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

  describe('getAll()', function() {
    it('STUB Should return all books.', function(done) {
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
    it('Should reject a new book given an invalid JSON body.', function(done) {
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

    it('Should accept a new book given a valid JSON body.', function(done) {
      chai.request(HOSTNAME)
        .post('/create/book')
        .set('Content-Type', 'application/json')
        .send({
    "title": "Test Book", 
    "author": "Mocha Tests", 
    "pages": 450, 
    "genre": "Thriller", 
    "medium": "paper",
    "rating": null, 
    "notes": null
        })
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        })
    }) 
  });
});

describe('Updating book objects:', function() {
  describe('updateBookByID()', function() {
    it('Should update an existing book object with the given ID.', function(done) {
      chai.request(HOSTNAME)
        .put('/update/book')
        .set('Content-Type', 'application/json')
        .send({
    "id": 308,
    "title": "Test Book 3 - From Chai", 
    "author": "Jordan Seiler", 
    "pages": 45, 
    "genre": "Thriller",
    "medium": "paper", 
    "rating": null, 
    "notes": null
        })
       .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.header('rows-changed', '1');
          expect(res).to.have.status(204);
          done();
        });
    });

    it('Should change no rows if id is not found.', function(done) {
      chai.request(HOSTNAME)
        .put('/update/book')
        .set('Content-Type', 'application/json')
        .send({
    "id": 99999,
    "title": "Test Book 3 - From Chai", 
    "author": "Jordan Seiler", 
    "pages": 45, 
    "genre": "Thriller",
    "medium": "paper", 
    "rating": null, 
    "notes": null
        })
       .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.header('rows-changed', '0');
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});

describe('Deleting book objects:', function() {
  describe('deleteBookByID()', function() {
    it('Should have 0 rows changed for non-existant ID', function(done) {
      chai.request(HOSTNAME)
        .delete('/book/id/999999')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.header('rows-changed', '0');
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
