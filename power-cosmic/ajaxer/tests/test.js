var require = require || null;

if (require) {
  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

  var chai = require("chai");
  var sinon = require("sinon");
  var ajaxer = require("../lib/ajaxer.js");
}

chai.should();

describe('ajaxer', function() {
  var
    xhr,
    requests;

  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();

    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it('will probably be alright', function() {
    'everything'.should.be.ok;
  });

  describe('#connect', function() {
    it('sends data where i tell it to', function(done) {
      var locations = [
        "www.loc.com",
        "www.2ndloc.com",
        "www.3rdloc.com"
      ];
      ajaxer.connect("POST", locations[0]);
      ajaxer.connect("POST", locations[1]);
      ajaxer.connect("POST", locations[2]);

      for (var i = 0; i < locations.length; i++) {
        locations[i].should.be.eql(this.requests[i].url);
      }

      done();
    });

    it('applies the callback correctly', function(done) {
      var expectedValue = "this is a succesful thing",
        actual;
      ajaxer.connect("POST", "www.loc.com", {
        info: "data"
      }, function(message) {
        actual = message;
        done();
      });

      this.requests[0].respond(
        200, {},
        expectedValue
      );
      //while (!actual);
      actual.should.eql(expectedValue);
    });

    it('allows for only a callback to be declared', function() {
      var aintNoCallerBacker = sinon.spy();
      ajaxer.connect("POST", "www.loc.com", aintNoCallerBacker);

      this.requests[0].respond(200);

      aintNoCallerBacker.calledOnce.should.be.true;
    });

    it('allows for function object to be passed', function() {
      var aCallerBackObj = {
        onSuccess: sinon.spy(),
        onFail: sinon.spy()
      };
      ajaxer.connect("POST", "www.loc.com", aCallerBackObj);

      this.requests[0].respond(200);

      aCallerBackObj.onSuccess.calledOnce.should.be.true;
      aCallerBackObj.onFail.calledOnce.should.be.false;
    });

    it('allows for some failblogging', function() {
      var newVar,
        aCallerBackObj = {
          onSuccess: sinon.spy(),
          onFail: sinon.spy()
        };
      ajaxer.connect("POST", "www.loc.com", aCallerBackObj);

      this.requests[0].respond(201);

      aCallerBackObj.onSuccess.calledOnce.should.be.false;
      aCallerBackObj.onFail.calledOnce.should.be.true;
    });

    it('has a test testing for responseType', function() {
      ajaxer.connect("POST", "www.loc.com", null, null, {"responseType":"json"});
      ajaxer.connect("POST", "www.loc.com", null, null, {});
    });
  });

  describe('#post', function() {
    it('sends data where i tell it to', function(done) {
      var locations = [
        "www.loc.com",
        "www.2ndloc.com",
        "www.3rdloc.com"
      ];
      ajaxer.post(locations[0]);
      ajaxer.post(locations[1]);
      ajaxer.post(locations[2]);

      for (var i = 0; i < locations.length; i++) {
        locations[i].should.be.eql(this.requests[i].url);
      }

      done();
    });

    it('allows me to straight post json', function() {
      var data = {
        name: "eddie",
        favColours: [
          "blue",
          "green",
          "red",
          "yellow"
        ]
      };
      ajaxer.post("www.loc.com", JSON.stringify(data));

    });
  });

  describe('#get', function() {
    it('should should make the request location awesome', function(done) {
      var data = {
        foo: 'bar'
      };

      ajaxer.get('www.fp.com', data, function(err, result) {
        done();
      });
      ajaxer.get('www.fp.com');

      this.requests[0].url.should.be.equal('www.fp.com?foo=bar');
      this.requests[1].url.should.be.equal('www.fp.com');
      done();
    });
  });

  it('should not send anything without connect method declared', function(done) {
    var data = "hello";

    ajaxer.connect('www.ajaxisabummer.com', function(response) {
      fail();
    });

    done();

    this.requests.should.be.empty;
  });
});
