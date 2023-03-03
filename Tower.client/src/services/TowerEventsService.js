import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService"

class TowerEventsService{
  async getAllTowerEvents(){
    const res = await api.get('/api/events')
    console.log(res.data);
    const towerEvents = res.data.map(e => new TowerEvent(e))
    console.log(towerEvents);
    AppState.towerEvents = towerEvents
  }

  async createEvent(formData){
    const res = await api.post('api/events', formData)
    logger.log('creating event', res.data)
  }

  async getTowerEventById(eventId){
    AppState.currentEvent = null
    const res = await api.get('api/events/' + eventId)
    AppState.currentEvent = new TowerEvent(res.data)
  }



}

export const towerEventsService = new TowerEventsService()