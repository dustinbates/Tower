<template>
  <form @submit.prevent="createComment(eventId)">
    <span class="d-flex">
      <input type="text" class="form-control" id="body" v-model="editable.body" placeholder="Comment on this event">
      <button type="submit" class="btn btn-success">
        <i class="mdi mdi-send" title="Post Comment"></i>
      </button>
    </span>
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
          // console.log(formData);
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