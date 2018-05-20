process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let LengthDB = require('../javascript/model/length');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../javascript/server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Lengths', () => {
    beforeEach((done) => { //Before each test we empty the database
        LengthDB.remove({}, (err) => {
           done();
        });
    });

/*
  * Test the /GET route with an empty database
  */
  describe('/GET empty length', () => {
      it('it should GET all the lengths', (done) => {
        chai.request(server)
            .get('/api/length/getAll')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST length route
  */
  describe('/POST insert new length', () => {
      it('it should insert a new length and return the saved length', (done) => {
        let length = {
            description: "Meter",
            abbreviation: "m",
            lengthInMM: 1000,
            dateAdded: new Date()
        }
        chai.request(server)
            .post('/api/length/insert')
            .send(length)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('description').equal("Meter");
                res.body.should.have.property('abbreviation').equal("m");
                res.body.should.have.property('lengthInMM').equal(1000);
                res.body.should.have.property('dateAdded');
              done();
            });
      });
  });

// Test the convert functionality by inserting 2 length records and converting between the two of them.
  describe('/POST length convertion', () => {
    let lengthM = {
        description: "Meter",
        abbreviation: "m",
        lengthInMM: 1000,
        dateAdded: new Date()
    }
    let lengthCM = {
        description: "Centimeter",
        abbreviation: "cm",
        lengthInMM: 10,
        dateAdded: new Date()
    }
    var agent = chai.request.agent(server);

      it('it should convert the input length to the target length', (done) => {
        agent.post('/api/length/insert')
            .send(lengthM)
            .then(function(res) {
              res.should.have.status(200);

                agent.post('/api/length/insert')
                    .send(lengthCM)
                    .then(function(res2) {
                        let targetLength = {
                      		"description": lengthCM.description,
                      		"abbreviation":lengthCM.abbreviation,
                      		"amount": null
                      	}

                        let inputLength = {
                          "description": lengthM.description,
                          "abbreviation":lengthM.abbreviation,
                          "amount": 2
                        }
                        res.should.have.status(200);
                        agent.post('/api/length/convert')
                            .send({inputLength, targetLength})
                            .then(function(res3) {
                                res3.should.have.status(200);
                                res3.body.should.be.a('object');
                                res3.body.should.have.property('description').equal(targetLength.description);
                                res3.body.should.have.property('abbreviation').equal(targetLength.abbreviation);
                                res3.body.should.have.property('amount').equal(inputLength.amount * lengthM.lengthInMM / lengthCM.lengthInMM);
                              done();
                            });
                    });
            });
      });


  });
});
