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
  }
}