var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

var config = require('../config.json');
const HOSTNAME = config.hostname;

describe('Getting reading objects:', function() {
  describe('getByID()', function() {
    it('Should return a reading with the given integer id.', function(done) {
      chai.request(HOSTNAME)
	.get('/reading/id/123')
        .end(function (err, res) {
          expect(err).to.be.null;
	  expect(res).to.have.status(200);
	  done();
        });
    });
  });

  describe('getByTitle()', function() {
    it('Should return all readings for the book with the given title.', function(done) {
      chai.request(HOSTNAME)
        .get("/reading/title/MobyDick")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('getByAuthor()', function() {
    it('Should return all readings of any book by the given author.', function(done) {
      chai.request(HOSTNAME)
        .get("/reading/author/JohnDoe")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('getAll()', function() {
    it('Should return all readings.', function(done) {
      chai.request(HOSTNAME)
        .get("/reading/all")
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Creating reading objects:', function() {
  describe('createReading()', function() {
    it('Should create a new reading object given a POSTed JSON body.', function(done) {
      chai.request(HOSTNAME)
        .post('/create/reading')
        .set('Content-Type', 'application/json')
        .send({requestFrom: 'chai-http', purpose: 'Dummy JSON for testing'})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Updating reading objects:', function() {
  describe('updateReadingByID()', function() {
    it('Should update an existing reading object with the given id.', function(done) {
      chai.request(HOSTNAME)
        .put('/update/reading')
        .set('Content-Type', 'application/json')
        .send({id: 1, book: 12, start_date: "11/20/2020", end_date: "11/24/2020", "notes": "Hello from chai"})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});

describe('Deleting reading objects:', function() {
  describe('deleteReadingByID()', function() {
    it('Should delete the "reading" object with the given id.', function(done) {
      chai.request(HOSTNAME)
        .delete('/reading/id/99999')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
