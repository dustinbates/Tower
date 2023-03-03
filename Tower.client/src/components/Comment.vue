<template>
  <form @submit.prevent="createComment(eventId)">
    <input type="text" class="form-control" id="body" v-model="editable.body">
    <button type="submit" class="btn btn-success">
      <i class="mdi mdi-send"></i>
    </button>
  </form>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService.js'

export default {
  props: {
    eventId: String 
    },
  setup(){
    const editable = ref({})
    
    return {
      editable,
      async createComment(eventId){
        try {
          const formData = editable.value
          formData.eventId = eventId
          console.log(formData);
          await commentsService.createComment(formData)
          editable.value= ref({})
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