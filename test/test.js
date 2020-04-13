var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('Mocha', function() {
  describe('#itWorks()', function() {
    it('Should prove Mocha works', function(done) {
      chai.request("https://www.google.com")
	.get('/')
        .end(function (err, res) {
          expect(err).to.be.null;
	  expect(res).to.have.status(200);
	  done();
        });
    });
  });
});

