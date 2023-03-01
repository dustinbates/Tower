import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController  {
  constructor(){
    super('api/events')
    this.router
      .get('', this.getAllTowerEvents)
      .get('/:eventId', this.getTowerEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.editTowerEvent)
      .delete('/:eventId', this.cancelTowerEvent)

  }

  async getAllTowerEvents(req, res, next){
    try {
      const towerEvents = await towerEventsService.getAllTowerEvents()
      res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventById(req, res, next){
    try {
      const towerEventId = req.params.eventId
      const towerEvent = await towerEventsService.getTowerEventById(towerEventId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async createTowerEvent(req, res, next){
    try {
      let body = req.body
      body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.createTowerEvent(body)
      res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async editTowerEvent(req, res, next){
    try {
      const towerEventId = req.params.eventId
      const updateData = req.body
      const userId = req.userInfo.id
      const updatedTowerEvent = await towerEventsService.editTowerEvent(updateData, towerEventId, userId)
      return res.send(updatedTowerEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelTowerEvent(req, res, next){
    try {
      const towerEventId = req.params.eventId
      const userId = req.userInfo.id
      const towerEvent = await towerEventsService.cancelTowerEvent(towerEventId, userId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
}