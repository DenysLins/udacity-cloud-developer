const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/index')

describe('ong', () => {
  beforeEach(async () => {
    await connection.migrate.latest()
  })

  afterEach(async () => {
    await connection.migrate.rollback()
  })

  afterAll(() => {
    connection.destroy()
  })

  it('should be abble to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send(
        {
          name: 'Ipsun Loren',
          email: 'ipsunloren@ipsunlorem.com',
          whatsapp: '12121212121',
          city: 'Ipsun Loren',
          uf: 'IL'
        }
      )
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
