<template>
  <div class="container-fluid">
    <div v-if="myTickets[0]" class="row">
      <h1 class="fs-3">My Tickets</h1>
      <div v-for="t in myTickets" class="col-4 elevation-1">
        <div class="ticket text-start p-4 mt-3" :style="{ backgroundImage: `url('${t.event.coverImg}')` }">
          <div class="glass-card">
            <router-link :to="{ name: 'Details', params: { eventId: t.event.id } }">
              <h4 class="text-light">{{ t.event.name }}</h4>
            </router-link>
            <div class="">
              <p class="m-0 p-0">Starts {{ new Date(t.event.startDate).toLocaleDateString() }}</p>
              <p class="m-0 p-0">{{ t.event.location }}</p>
            </div>
          </div>
          <button @click="removeTicket(t.id)" :disabled="t.event.isCancelled" class="btn btn-danger mt-5 elevation-1">
            Not Attend <i class="mdi mdi-run"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Loading from '../components/Loading.vue'
import { attendeesService } from '../services/AttendeesService'
import Pop from '../utils/Pop'
export default {
    setup() {
        async function getMyTickets() {
            try {
                await attendeesService.getMyTickets();
                // console.log(AppState.myTickets);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        onMounted(async () => {
            await getMyTickets();
            AppState.currentEvent = {};
        });
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
        };
    },
    components: { Loading }
}
</script>

<style scoped>
.ticket{
    height: 30vh;
    object-fit: cover;
    object-position: center;
    background-position: center;
    background-size: cover;
    color: white;
    text-shadow: 1px 1px 2px black;
    border-radius: 5px;
}

.glass-card{
  background-color: rgba(49, 49, 116, 0.332);
  padding: 1em;
}
</style>
