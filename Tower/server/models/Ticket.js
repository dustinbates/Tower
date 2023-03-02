import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const TicketSchema = new Schema({
  eventId: {type: Schema.Types.ObjectId, ref: 'TowerEvents', required: true},
  accountId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},


}, defaultSchemaOptions)

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvents'
})

