import { Logger } from "sass"
import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService{
  async deleteTicket(ticketId) {

    const ticket = await dbContext.Tickets.findById(ticketId)
    if(!ticket){
      throw new BadRequest('Ticket does not exist')
    }
    const event = await towerEventsService.getTowerEventById(ticket.eventId)
    await ticket.remove(ticketId)
    await ticket.populate('event')
    event.capacity += 1
    event.save()
    return ticket
  }

  async getTowerEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({eventId})
    .populate('profile')
    .populate('event')
    return tickets
  }

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