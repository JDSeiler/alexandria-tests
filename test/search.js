var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

var config = require('../config.json');
const HOSTNAME = config.hostname;

describe('Searching the database', function() {
  describe('filterBy', function() {
    it('Should not error on valid filterBy columns', function() {
      let valid_columns = ["title", "author", "pages", "genre", "medium", "rating", "notes"];
      for (let column of valid_columns) {
        chai.request(HOSTNAME)
            .get(`/search/books?filterBy=${column}&query=null`)
            .then(function (res) {
                // Nothing - maybe fill in later.
            })
            .catch(function (err){
                throw err;
            });

        chai.request(HOSTNAME)
            .get(`/search/readings?filterBy=${column}&query=null`)
            .then(function (res) {
                // Nothing - maybe fill in later.
            })
            .catch(function (err) {
                throw err;
            });
        
      }
    });

    it('Should error on invalid query params', function(done) {
        chai.request(HOSTNAME)
            .get('/search/books?badParam=1234')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(422);
                done();
            });
    });

    it('Should error on invalid column names (books)', function(done) {
        chai.request(HOSTNAME)
            .get('/search/books?filterBy=pagez&query=123')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Should error on invalid column names (readings)', function(done) {
        chai.request(HOSTNAME)
            .get('/search/readings?filterBy=bookk&query=12')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
  });
});