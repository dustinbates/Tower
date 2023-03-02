import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent";
import { api } from "./AxiosService"

class TowerEventsService{
  async getAllTowerEvents(){
    const res = await api.get('/api/events')
    console.log(res.data);
    const towerEvents = res.data.map(e => new TowerEvent(e))
    console.log(towerEvents);
    AppState.towerEvents = towerEvents
  }




}

export const towerEventsService = new TowerEventsService()