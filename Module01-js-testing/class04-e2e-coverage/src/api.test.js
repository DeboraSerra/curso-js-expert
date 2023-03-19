const { describe, it, before, after } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('Tests the API routes', () => {
  let app;
  before(done => {
    app = require('./api');
    app.once('listening', done)
  })
  after(done => app.close(done));
  describe('The route /contact', () => {
    it('should return status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200)
      assert.strictEqual(response.text, 'contact us page');
    })
  })
  describe('The route /login', () => {
    it('should return 401 if the username is wrong', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'DeboraSerra', password: '123456'})
        .expect(401)
      assert.strictEqual(response.text, 'Invalid username or password')
    })
    it('should return 401 if the password is wrong', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'DebsSerra', password: '12346'})
        .expect(401)
      assert.strictEqual(response.text, 'Invalid username or password')
    });
    it('should retun 200 if the username and password are correct', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'DebsSerra', password: '123456'})
        .expect(200)
      assert.strictEqual(response.text, 'ok')
    })
  })
  describe('The default route', () => {
    it('should return not found if the route does\'t exist', async () => {
      const response = await supertest(app).get('/route').expect(404)
      assert.strictEqual(response.text, 'Route not found');
    })
  })
})