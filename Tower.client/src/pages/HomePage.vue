<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card header" id="header">
          <div class="row px-0">
            <div class="col-12 px-0">
              <p class="fs-1 m-4 p-3 header-text">
                Get ahead of the scalpers. <br>
                Reserve your seat now with <br>
                real events for real people.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        if (!filterCategory.value) {
          return AppState.towerEvents
        }
        else {
          return AppState.towerEvents.filter(e => e.type == filterCategory.value)
        }
      }),
      account: computed(() => AppState.account),

      changeFilterCategory(category) {
        filterCategory.value = category
      }
    };
  },
  components: { TowerEvent }
}
</script>



<style scoped lang="scss">
.header {
  background-image: url(../assets/img/chairs.jpeg);
  background-position: top;
  background-size: cover;
  height: 40vh;
  width: auto;
}

.header-text {
  color: rgb(215, 228, 250);
  text-shadow: 1px 1px 2px black;

}

#header {
  border-radius: 0
}
</style>
