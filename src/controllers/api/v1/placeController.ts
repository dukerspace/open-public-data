import { PlaceRepository } from '../../../repositories'
import {
  MSG_CREATED_SUCCESS,
  MSG_UPDATED_SUCCESS,
  MSG_DELETED_SUCCESS,
  MSG_DELETED_FAIL
} from '../../../utils/webConstant'

export class PlaceController {
  private readonly placeRepo: PlaceRepository
  constructor() {
    this.placeRepo = new PlaceRepository()
  }
  public async index(req, res) {
    try {
      const result = this
      // const result = Math.random()
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
      const result = await this.placeRepo.create(data)
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
      const result = await this.placeRepo.find(id)
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
      const result = await this.placeRepo.update(id, data)
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
      const result = await this.placeRepo.delete(id)
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
