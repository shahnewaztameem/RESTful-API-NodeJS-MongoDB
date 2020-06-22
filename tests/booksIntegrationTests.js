require('should');

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);
describe('Book crud test', () => {
  it('should allow a book to be posted and return _it', (done) => {
    const bookPost = { title: 'MyBook', author: 'Jon', genre: 'Fiction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((error, results) => {
        results.body.read.should.not.equal('false');
        results.body.should.have.property('_id');
        done();
      });
  });

  // after((done) => {
  //   mongoose.connection.close();
  //   app.server.close(done());
  // });
});
