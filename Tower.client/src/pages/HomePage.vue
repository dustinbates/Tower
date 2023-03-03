<template>
  <div  class="container-fluid">
    <div class="row">
      <div class="col-12 px-0">
        <div class="bg-primary  p-3 d-flex justify-content-around px-0">
          <button @click="changeFilterCategory('')" class="btn btn-outline-light">All</button>
          <button @click="changeFilterCategory('concert')" class="btn btn-outline-light">Concert</button>
          <button @click="changeFilterCategory('convention')" class="btn btn-outline-light">Convention</button>
          <button @click="changeFilterCategory('sport')" class="btn btn-outline-light">Sport</button>
          <button @click="changeFilterCategory('digital')" class="btn btn-outline-light">Digital</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="e in towerEvents">
        <TowerEvent :towerEvent="e" />
      </div>
    </div>

  </div>
</template>

<script>
import { towerEventsService } from '../services/TowerEventsService'
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import TowerEvent from '../components/TowerEvent.vue'

export default {
  setup() {
    const filterCategory = ref('')
    async function getAllTowerEvents() {
      try {
        await towerEventsService.getAllTowerEvents();
      }
      catch (error) {
        Pop.error(error, "getting all Events");
      }
    }
    onMounted(() => {
      getAllTowerEvents();
    });
    return {
      towerEvents: computed(() => {
        if(!filterCategory.value){
          return AppState.towerEvents
        }
        else {
          return AppState.towerEvents.filter(e => e.type == filterCategory.value)
        }
      }),
      account: computed(() => AppState.account),

      changeFilterCategory(category){
        filterCategory.value = category
      }
    };
  },
  components: { TowerEvent }
}
</script>

<style scoped lang="scss"></style>
