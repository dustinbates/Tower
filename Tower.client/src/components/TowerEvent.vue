<template>
  <div class="card my-3" >
    <img :src="towerEvent.coverImg" alt="">
    <div class="card-body">
      <p>
        <b>{{ towerEvent.name }}</b>
      </p>
      <p>
        {{ towerEvent.location }}
      </p>
      <p>
        {{ towerEvent.startDate }}
      </p>
      <p>
        {{ towerEvent.capacity }} left
      </p>
    </div>


  </div>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent';


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

</style>