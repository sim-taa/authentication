const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

const userA= {username: 'foo', password: 'bar', id: 1}
const userB= {username: 'foo', password: 'baluga', id: 1}

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async ()=> {
  await db.migrate.rollback()
  await db.migrate.latest()

})

afterAll(async ()=> {
  await db.destroy()
})

it('sanity check jokes', ()=> {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  // 👉 Projects
  // 👉 Projects
  // 👉 Projects

  describe('auth endpoints', ()=> {
    beforeEach(async => {
      await db('users').truncate()
    })
    it('adds a new user with a bcrypted password to the users table on success', async ()=> {
      await request(server).post('/api/auth/register').send(userA)
      const user = await db('users').first()
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('username')
      expect(user).toHaveProperty('password')
      expect(user.username).toBe(userA.username)
    })
  })
  describe('[POST] /api/auth/login', () => {
    beforeEach(async => {
      await db('users').truncate()
      await request(server).post('/api/auth/register').send(userA)
    })
    it('responds with a proper status code on successful login', async () => {
      const res = await (await request(server).post('/api/auth/login')).send(userA)
      expect(res.status).toBe(200)
    })

    it('fails login with an invalid password and returns 403', async ()=> {
      const res = await (await request(server).post('/api/auth/login')).send(userB)
      expect(res.status).toBe(403)
    })
    it('responds with a welcoe messsage and a token on successful login', async () => {
      const res = await request(server).post('/api/auth/login')
    })
  })
})