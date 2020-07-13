const connection = require('../database/index')

module.exports = {

  async list (req, res) {
    const ongId = req.headers.authorization
    const incidents = await connection('incidents').where('ong_id', ongId).select()
    return res.json(incidents)
  }

}
