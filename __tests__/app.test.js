import request from 'supertest';
import app from '../app';
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import users from '../models/users';
iconv.encodings = encodings;

/**
 * サーバー側処理のテスト
 */
describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    return request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Hello World!');
      })
      .end(done);
  });
});


describe('Test the API', () => {
  it('should response the GET method', async () => {
    const user = await users.create({
      name: 'hoge',
      mail: 'afterlineuchida@gmail.com',
    });
    expect('hoge').toBe(user);
    //return request(app).get('/api/questions').expect(200);
  });
});

/*
  describe('Test the addLike method', () => {
  beforeAll(() => {
  mongoDB.connect();
  });
  afterAll((done) => {
  mongoDB.disconnect(done);
  });
  });
*/
