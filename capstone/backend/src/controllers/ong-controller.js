const connection = require('../database/index')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {

  async list (req, res) {
    const ongs = await connection.select().table('ongs')
    return res.json(ongs)
  },

  async create (req, res) {
    const { name, email, whatsapp, city, uf } = req.body
    const id = generateUniqueId()
    const ong = {
      id: id,
      name: name,
      email: email,
      whatsapp: whatsapp,
      city: city,
      uf: uf
    }
    await connection('ongs').insert(ong)
    return res.json({ id })
  }

}
