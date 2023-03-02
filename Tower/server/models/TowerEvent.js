import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const TowerEventSchema = new Schema({
  type: {...basicStringType, enum: ['concert', 'convention', 'sport', 'digital']},
  name: basicStringType,
  description: basicStringType,
  location: basicStringType,
  capacity: { type: Number, required: true},
  startDate: {type: Date, required: true}, 
  isCanceled: {type: Boolean, required: true, default: false},
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true},
  coverImg: basicStringType
}, defaultSchemaOptions)

TowerEventSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
})

TowerEventSchema.virtual('eventTicketCount', {
  localField: '_id',
  foreignField: 'ticketId',
  count: true,
  ref: 'Ticket'
})

