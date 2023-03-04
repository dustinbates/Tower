<template>
  <div v-if="towerEvent" class="container-fluid bg-dark">
    <div class="row">
      <div class="eventCard card text-start img-fluid text-light" id="header"
        :style="{ backgroundImage: `url('${towerEvent.coverImg}')` }">
        <div class="card-body">
          <div class="row">
            <div class="col-4">
              <div v-if="towerEvent.creatorId == account.id && towerEvent.isCancelled === false">
                <button class="btn btn-danger" @click="cancelTowerEvent(towerEvent.id)">
                  <i class="mdi mdi-close-circle">Cancel Event</i>
                </button>
              </div>
              <div v-if="towerEvent.isCancelled == true">
                <button class="btn btn-danger" disabled>Event Cancelled</button>
              </div>
            </div>
            <div class="col-8 mt-5">
              <div class="glass-card">
                <span class="d-flex justify-content-between">
                  <span>
                    <h1 class="card-title">{{ towerEvent.name }}</h1>
                    <h5>{{ towerEvent.location }}</h5>
                  </span>
                  <h3>Starts {{ new Date(towerEvent.startDate).toLocaleDateString() }}</h3>
                </span>
                <p class="card-text">{{ towerEvent.description }}</p>
                <span class="d-flex justify-content-between align-items-end mt-5">
                  <h4>{{ towerEvent.capacity }} Spots Left</h4>
                  <div>
                    <button v-if="!foundTicket" @click="createTicket()"
                      :disabled="towerEvent.isCancelled || towerEvent.capacity == 0" class="btn btn-info elevation-1">
                      <p v-if="towerEvent.capacity != 0" class="p-0 m-0">Attend <i class="mdi mdi-human"></i></p>
                      <p v-if="towerEvent.capacity <= 0" class="p-0 m-0 text-decoration-line-through">No Tickets Left</p>
                    </button>
                    <button v-else @click="removeTicket(myTicket?.attendeeId)" :disabled="towerEvent.isCancelled"
                      class="btn btn-danger elevation-1">
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
    <div class="row">
      <div class="col-12 bg-primary pt-2">
        <p class="m-0 p-0 text-dark">See who's attending</p>
      </div>
      <div class="col-12 m-auto d-flex flex-row bg-primary p-2">
        <div class="row">
          <div class="col-12 d-flex">
            <div v-for="a in attendees">
              <img class="attendee img-fluid rounded-circle p-1" :src="a.picture" alt="" :title="a.name">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-9 m-auto mt-2">
        <div class="card p-3 bg-light text-light">
          <p class="text-dark">What people are saying</p>
          <Comment :eventId="towerEvent.id" />
          <div v-for="c in comments" class="mt-3">
            <div class="row pe-3">
              <div class="col-2 d-flex justify-content-center">
                <img class="rounded-circle profilePic text-center p-0 m-0" :src="c.creator.picture" :alt="c.creator.name">
              </div>
              <div class="col-10 bg-white text-dark rounded">
                <div class="d-flex justify-content-between align-items-center pt-1">
                  <h5>{{ c.creator.name }}</h5>
                  <i v-if="c.creatorId == account.id" @click="deleteComment(c.id)"
                    class="mdi mdi-delete-outline fs-5 selectable" title="Delete Comment" style="color: red"></i>
                </div>
                <div>
                  <p class="ps-3">{{ c.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading />
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
import Loading from '../components/Loading.vue';

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
      isCancelled: computed(() => AppState.towerEvents.isCanceled),
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
      },
      async cancelTowerEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to cancel this event?', 'You will not be able to undo this', 'Confirm Cancel')) {
            await towerEventsService.cancelTowerEvent(eventId)
          }
        } catch (error) {
          Pop.error(error.mesasge)
        }
      }
    };
  },
  components: { Comment, Loading }
}
</script>


<style lang="scss" scoped>
.eventCard {
  height: 60vh;
  background-position: center;
  background-size: cover;
  text-shadow: 0 0 2px black;

}

.glass-card {
  background-color: rgba(43, 52, 226, 0.264);
  padding: 1em;
  border-radius: 5px
}

.text-shadow {
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.593);
}

#header {
  border-radius: 0
}

.attendee {
  height: 3em;
  width: 3em;
}

.profilePic {
  height: 5em;
  width: 5em;
}
</style>