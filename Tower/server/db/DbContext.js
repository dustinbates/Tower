import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from '../models/Comments';
import { TicketSchema } from '../models/Ticket';
import { TowerEventSchema } from '../models/TowerEvent';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvents', TowerEventSchema)

  Tickets = mongoose.model('Tickets', TicketSchema)

  Comments = mongoose.model('Comments', CommentSchema)
}

export const dbContext = new DbContext()
