const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Your Express server file
const expect = chai.expect;

chai.use(chaiHttp);

describe('User', () => {
  let token;

  before((done) => {
    // Assuming you have a user already created that you can log in
    chai.request(server)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        token = res.body.token; // Save the token for authenticated requests
        done();
      });
  });

  describe('GET /users/profile', () => {
    it('should get the user profile', (done) => {
      chai.request(server)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('email');
          done();
        });
    });
  });

  describe('PUT /users/profile', () => {
    it('should update the user profile', (done) => {
      chai.request(server)
        .put('/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Test User'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name').eql('Updated Test User');
          done();
        });
    });
  });
});
