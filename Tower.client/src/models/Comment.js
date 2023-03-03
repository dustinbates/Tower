import { Profile } from "./Account"

export class Comment extends Profile{
  constructor(data){
    super(data.profile)
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
  }
  
}