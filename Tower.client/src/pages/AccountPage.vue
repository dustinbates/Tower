<template>
  <div class="container-fluid">
    <div v-if="myTickets[0]" class="row">
      <h1>My Tickets</h1>
      <div v-for="t in myTickets" class="col-6">
        <div class="card text-start text-dark">
          <router-link :to="{ name: 'Details', params: { eventId: t.event.id } }">
          <img class="card-img-top" :src="t.event.coverImg" alt="Title">
          </router-link>
          <div class="card-body">
            <h4 class="card-title">{{ t.event.name }}</h4>
            <p class="card-text">Starts {{ new Date(t.event.startDate).toLocaleDateString() }}</p>
            <p class="card-text">{{ t.event.location }}</p>
            <button @click="removeTicket(t.id)" :disabled="t.event.isCancelled" class="btn btn-danger">
              Not Attend <i class="mdi mdi-run"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { attendeesService } from '../services/AttendeesService'
import Pop from '../utils/Pop'
export default {

  setup() {
    
    async function getMyTickets() {
      try {
        await attendeesService.getMyTickets()
        console.log(AppState.myTickets);
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(async () => {
      await getMyTickets()
      AppState.currentEvent = {}
    })

    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
      async removeTicket(ticketId) {
        try {
          await attendeesService.removeTicket(ticketId);
        }
        catch (error) {
          Pop.error(error.message);
        }
      },
    }
  }
}
</script>

<style scoped></style>
