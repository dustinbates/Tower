import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowerEventsService {
  async cancelTowerEvent(towerEventId, userId) {
    const towerEvent = await this.getTowerEventById(towerEventId)
    if(towerEvent.creatorId.toString() != userId){
      throw new Forbidden('You are not allowed to cancel this Event')
    }
    towerEvent.isCanceled = true
    await towerEvent.save()
    return towerEvent
  }

  async editTowerEvent(updateData, towerEventId, userId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    if(!towerEvent){
      throw new BadRequest('Event Not Found')
    }
    if(towerEvent.creatorId != userId) {
      throw new Forbidden('You are not the Event Creator')
    }
    if(towerEvent.isCanceled == true){
      throw new BadRequest('This Event has been cancelled')
    }
    else{
      towerEvent.name = updateData.name || towerEvent.name
      towerEvent.description = updateData.description || towerEvent.description
      towerEvent.coverImg = updateData.coverImg || towerEvent.coverImg
      towerEvent.location = updateData.location || towerEvent.location
      towerEvent.capacity = updateData.capacity || towerEvent.capacity
      towerEvent.startDate = updateData.startDate || towerEvent.startDate
      towerEvent.type = updateData.type || towerEvent.type
    }

    await towerEvent.save()
    return towerEvent
  }

  async getTowerEventById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
    if (!towerEvent){
      throw new BadRequest('Invalid Event Id')
    }
    return towerEvent
  }

  async createTowerEvent(body) {
    const towerEvent = await dbContext.TowerEvents.create(body)
    return towerEvent
  }

  async getAllTowerEvents() {
    const towerEvents = await dbContext.TowerEvents.find()
    return towerEvents
  }


}

export const towerEventsService = new TowerEventsService()