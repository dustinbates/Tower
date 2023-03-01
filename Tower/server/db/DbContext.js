import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TowerEventSchema } from '../models/TowerEvent';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  TowerEvents = mongoose.model('TowerEvents', TowerEventSchema)

  Tickets = mongoose.model('Tickets', TicketSchema)
}

export const dbContext = new DbContext()
