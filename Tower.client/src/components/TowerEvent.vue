<template>
  <router-link :to="{name: 'Details', params: {eventId: towerEvent.id}}">
    <div class="EventCard card my-3 text-dark elevation-3" >
      <img :src="towerEvent.coverImg" :alt="towerEvent.name" id="img" >
      <div class="card-body">
        <p>
          <b>{{ towerEvent.name }}</b>
        </p>
        <p>
          {{ towerEvent.location }}
        </p>
        <p>
          Starts {{ new Date(towerEvent.startDate).toLocaleDateString() }}
        </p>
        <p>
          {{ towerEvent.capacity }} spots left
        </p>
      </div>    
    </div>
  </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';


export default {
  props: {
    towerEvent: {type: TowerEvent, required: true}
  },
  setup(){

    return {

    }
  }
}
</script>


<style lang="scss" scoped>

  img{
    height: 30vh;
    object-fit: cover;
    object-position: center;
  }

  #img{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>