<template>
  <div v-if="towerEvent" class="container-fluid">
    <div class="row">
      <div class="eventCard card text-start img-fluid text-light"
        :style="{ backgroundImage: `url('${towerEvent.coverImg}')` }">
        <div class="card-body">
          <div class="row">
            <div class="col-4">
              <img src="" alt="">
            </div>
            <div class="col-8">
              <span class="d-flex justify-content-between">
                <span>
                  <h1 class="card-title">{{ towerEvent.name }}</h1>
                  <h5>{{ towerEvent.location }}</h5>
                </span>
                <h3>Starts {{ new Date(towerEvent.startDate).toLocaleDateString() }}</h3>
              </span>
              <p class="card-text">{{ towerEvent.description }}</p>
              <span class="d-flex justify-content-between">
                <h4>{{ towerEvent.capacity }} Spots Left</h4>
                <div>
                  <button v-if="!foundTicket" @click="createTicket()" :disabled="towerEvent.isCancelled"
                    class="btn btn-info">
                    Attend <i class="mdi mdi-human"></i>
                  </button>
                  <button v-else @click="removeTicket(myTicket?.attendeeId)" :disabled="towerEvent.isCancelled"
                    class="btn btn-danger">
                    Not Attend <i class="mdi mdi-run"></i>
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState.js'
import { attendeesService } from '../services/AttendeesService.js'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    async function getTowerEventById() {
      try {
        const eventId = route.params.eventId;
        await towerEventsService.getTowerEventById(eventId);
      } catch (error) {
        Pop.error('getting event by id')
        router.push("/")
      }
    }
    async function getTicketsByEventId() {
      try {
        const eventId = route.params.eventId
        await attendeesService.getTicketsByEventId(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    watchEffect(() => {
      if (route.params.eventId) {
        getTowerEventById()
        getTicketsByEventId()
      }
    })
    return {
      towerEvent: computed(() => AppState.currentEvent),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      foundTicket: computed(() => AppState.attendees.find(t => t.id == AppState.account.id)),
      myTicket: computed(() => AppState.attendees.find(t => t.eventId == AppState.currentEvent.id)),
      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async removeTicket(ticketId) {
        try {
          if (await Pop.confirm) {
            await attendeesService.removeTicket(ticketId)
          }
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.eventCard {
  height: 50vh;
  background-position: center;
  background-size: cover;
  text-shadow: 0 0 2px black;

}
</style>