import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService{
  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({accountId})
    .populate('profile')
    .populate('event')
    return tickets
  }

  async createTicket(ticketData) {
    const event = await towerEventsService.getTowerEventById(ticketData.eventId)
    if (event.isCanceled){
      throw new Forbidden('This Event has been cancelled')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile')
    await ticket.populate('event')
    event.capacity -= 1
    await event.save()
    return ticket
  }

}

export const ticketsService = new TicketsService()