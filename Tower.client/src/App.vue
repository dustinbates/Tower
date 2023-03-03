<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
   <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer>
  <ModalComponent id="eventModal">
    <CreateEvent />
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import CreateEvent from './components/CreateEvent.vue'
import Navbar from './components/Navbar.vue'
import ModalComponent from './components/ModalComponent.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, CreateEvent, ModalComponent }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
