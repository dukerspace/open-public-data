import PlaceRepository from '../../../repositories/placeRepository'
import {
  MSG_CREATED_SUCCESS,
  MSG_UPDATED_SUCCESS,
  MSG_DELETED_SUCCESS,
  MSG_DELETED_FAIL
} from '../../../utils/webConstant'

class PlaceController {
  public async index(req, res) {
    try {
      const result = await new PlaceRepository().pagination(1, 2)
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        message: e.message
      })
    }
  }
  public async create(req, res) {
    try {
      const data = {}
      const result = await new PlaceRepository().create(data)
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        message: e.message
      })
    }
  }
  public async show(req, res) {
    try {
      const id = req.params.id
      const result = await new PlaceRepository().find(id)
      if (!result) throw new Error('Place not found.')
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        message: e.message
      })
    }
  }
  public async update(req, res) {
    try {
      const id = req.params.id
      const data = {}
      const result = await new PlaceRepository().update(id, data)
      return res.json({
        success: true,
        data: result
      })
    } catch (e) {
      return res.json({
        success: false,
        message: e.message
      })
    }
  }
  public async delete(req, res) {
    try {
      const id = req.body.id
      const result = await new PlaceRepository().delete(id)
      if (!result) throw new Error(MSG_DELETED_FAIL)
      return res.json({
        success: true,
        message: MSG_DELETED_SUCCESS
      })
    } catch (e) {
      return res.json({
        success: false,
        message: e.message
      })
    }
  }
}

export default new PlaceController()
