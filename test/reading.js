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
      chai.request(HOSTNAME)
        .get("/get/reading/title/MobyDick")
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
        .get("/get/reading/author/JohnDoe")
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
        .get("/get/reading/all")
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
        .put('/update/reading/123')
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

describe('Deleting reading objects:', function() {
  describe('deleteReadingByID()', function() {
    it('Should delete the "reading" object with the given id.', function(done) {
      chai.request(HOSTNAME)
        .delete('/delete/reading/123')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
