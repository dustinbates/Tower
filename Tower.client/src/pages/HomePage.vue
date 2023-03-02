<template>
  <div v-if="account.id" class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1>Events</h1>
      </div>
      <div class="col-10 m-auto">
        <div>

        </div>
      </div>
      <div class="col-md-3" v-for="e in towerEvents">
        <TowerEvent :towerEvent="e"/>
      </div>
    </div>
    
  </div>
</template>

<script>
import { towerEventsService } from '../services/TowerEventsService'
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import TowerEvent from '../components/TowerEvent.vue'

export default {
    setup() {
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
            towerEvents: computed(() => AppState.towerEvents),
            account: computed(() => AppState.account),
        };
    },
    components: { TowerEvent }
}
</script>

<style scoped lang="scss">

</style>
