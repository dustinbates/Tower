<template>
  <div class="modal-content">
    <div class="modal-header"> 
      <h1 class="modal-title fs-5" id="exampleModalLabel">New Event</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
    </div>
    <form @submit.prevent="createEvent()">
      <div class="modal-body">
        <div class="mb-3">
          <label for="name" class="form-label">Event Name</label>
          <input v-model="editable.name" required type="text" class="form-control" id="name" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="coverImg" class="form-label">Event Image</label>
          <input v-model="editable.coverImg" required type="text" class="form-control" id="coverImg" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">Event Location</label>
          <input v-model="editable.location" required type="text" class="form-control" id="location" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="startDate" class="form-label">Event Start Date</label>
          <input v-model="editable.startDate" required type="date" class="form-control" id="startDate" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="capacity" class="form-label">Event Capacity</label>
          <input v-model="editable.capacity" required type="number" class="form-control" id="capacity" aria-describedby="emailHelp">
        </div>
        <label for="type" class="form-label">Event Type</label>
        <select v-model="editable.category" class="form-select mb-3" aria-label="Default select example" id="category">
            <option selected value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        <div class="mb-3">
          <label for="description" class="form-label">Event Description</label>
          <input v-model="editable.description" required type="text" class="form-control" id="description" aria-describedby="emailHelp">
        </div>
      </div>
      <div class="modal-footer">
        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Event</button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';

export default {
  setup(){
    const editable = ref({
      type: 'concert'
    })
    return {
      editable,
      async createEvent(){
        try {
          const formData = editable.value
          await towerEventsService.createEvent(formData)
          editable.value = { category: 'concert'}
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>