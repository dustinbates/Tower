import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService{
  async createTicket(ticketData) {
    const event = await towerEventsService.getTowerEventById(ticketData.eventId)
    if (event.isCanceled){
      throw new Forbidden('This Event has been cancelled')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    return ticket
  }

}

export const ticketsService = new TicketsService()