import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],

  /** @type {import('./models/TowerEvent.js').TowerEvent | null} */
  currentEvent: null,

    /** @type {import('./models/Atendee.js').Attendee[]} */
  attendees: [],

  myTickets: [],

    /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],
})
