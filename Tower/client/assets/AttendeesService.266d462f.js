import{i as d,j as n,l as c,A as t}from"./index.b7b95059.js";class i extends d{constructor(e){super(e.profile),this.attendeeId=e.id,this.eventId=e.eventId}}class o{async getTicketsByEventId(e){const a=await n.get(`api/events/${e}/tickets`);c.log(a.data),t.attendees=a.data.map(s=>new i(s))}async createTicket(e){const a=await n.post("api/tickets",e);t.attendees.push(new i(a.data)),t.currentEvent.capacity-=1,c.log(a.data)}async removeTicket(e){const a=await n.delete("api/tickets/"+e);c.log("REMOVED TICKET",a.data),t.currentEvent!={}&&(t.currentEvent.capacity+=1),t.myTickets=t.myTickets.filter(s=>s.eventId!=a.data.eventId),t.attendees=t.attendees.filter(s=>s.attendeeId!=e)}async getMyTickets(){const e=await n.get("account/tickets");t.myTickets=e.data}}const l=new o;export{l as a};