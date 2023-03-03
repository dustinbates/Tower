import { AppState } from "../AppState"
import { Attendee } from "../models/Attendee"
import { AttendeeEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AttendeesService {
  async getTicketsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log(res.data)
    AppState.attendees = res.data.map(a => new Attendee(a))
  }

  async createTicket(eventData){
    const res = await api.post('api/tickets', eventData)
    console.log(res.data);
    AppState.attendees.push(new Attendee(res.data))
    AppState.currentEvent.capacity -= 1
    logger.log(res.data)
    // AppState.myTickets.push(res.data)
  }

  async removeTicket(ticketId){
    console.log(ticketId);
    const res = await api.delete('api/tickets/' + ticketId)
    logger.log("REMOVED TICKET", res.data)
    if(AppState.currentEvent != {}){
      AppState.currentEvent.capacity += 1
    }
    AppState.myTickets = AppState.myTickets.filter(t => t.eventId != res.data.eventId)
    console.log(AppState.myTickets);
    AppState.attendees = AppState.attendees.filter(t => t.attendeeId != ticketId)
  }

  async getMyTickets(){
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data
  }
}

export const attendeesService = new AttendeesService()