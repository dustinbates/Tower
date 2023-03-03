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
                  <button v-if="!foundTicket " @click="createTicket()" :disabled="towerEvent.isCancelled || towerEvent.capacity == 0"
                    class="btn btn-info">
                    <p v-if="towerEvent.capacity != 0" class="p-0 m-0">Attend <i class="mdi mdi-human"></i></p> 
                    <p v-if="towerEvent.capacity <= 0" class="p-0 m-0 text-decoration-line-through">No Tickets Left</p>
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
    <div class="row">
      <div class="col-10 m-auto d-flex flex-row">
        <div v-for="a in attendees">
          <img class="attendee img-fluid rounded-circle p-1" :src="a.picture" alt="" :title="a.name">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-8 m-auto">
        <Comment :eventId="towerEvent.id" />
        <div v-for="c in comments">
          <div class="d-flex bg-white rounded justify-content-start align-items-center p-2 m-2">
            <img class="rounded-circle profilePic" :src="c.creator.picture" :alt="c.creator.name">
            <h5>{{ c.creator.name }}</h5>
            <p class="ps-5">{{ c.body }}</p>
            <button v-if="c.creatorId == account.id" @click="deleteComment(c.id)" class="btn btn-danger">
              <i class="mdi mdi-delete"></i>
            </button>
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
import Comment from '../components/Comment.vue';
import { commentsService } from '../services/CommentsService.js'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    async function getTowerEventById() {
      try {
        const eventId = route.params.eventId;
        await towerEventsService.getTowerEventById(eventId);
      }
      catch (error) {
        Pop.error("getting event by id");
        router.push("/");
      }
    }
    async function getTicketsByEventId() {
      try {
        const eventId = route.params.eventId;
        await attendeesService.getTicketsByEventId(eventId);
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    async function getCommentsByEventId() {
      try {
        const eventId = route.params.eventId;
        await commentsService.getCommentsByEventId(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    watchEffect(() => {
      if (route.params.eventId) {
        getTowerEventById();
        getTicketsByEventId();
        getCommentsByEventId()
      }
    });
    return {
      towerEvent: computed(() => AppState.currentEvent),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      foundTicket: computed(() => AppState.attendees.find(t => t.id == AppState.account.id)),
      myTicket: computed(() => AppState.attendees.find(t => t.eventId == AppState.currentEvent.id)),
      attendees: computed(() => AppState.attendees),
      comments: computed(() => AppState.comments),
      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId });
        }
        catch (error) {
          Pop.error(error.message);
        }
      },
      async removeTicket(ticketId) {
        try {
            await attendeesService.removeTicket(ticketId);
        }
        catch (error) {
          Pop.error(error.message);
        }
      },
      async deleteComment(commentId) {
        try {
          if (await Pop.confirm()) {
            await commentsService.deleteComment(commentId)
          }
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { Comment }
}
</script>


<style lang="scss" scoped>
.eventCard {
  height: 50vh;
  background-position: center;
  background-size: cover;
  text-shadow: 0 0 2px black;

}

.attendee {
  height: 5em;
  width: 5em;
}

.profilePic {
  height: 5em;
  width: 5em;
}
</style>