export class TowerEvent {
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCancelled = data.isCancelled
    this.coverImg = data.coverImg
    this.type = data.type
  }
}

export class AttendeeEvent extends TowerEvent {
  constructor(data){
    super(data)
    this.attendeeId = data.id
  }
}
