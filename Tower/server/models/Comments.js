import { Schema } from "mongoose";
import { basicStringType, defaultSchemaOptions } from "../db/Constants";

export const CommentSchema = new Schema({
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  eventId: {type: Schema.Types.ObjectId, required: true},
  body: basicStringType
}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
})