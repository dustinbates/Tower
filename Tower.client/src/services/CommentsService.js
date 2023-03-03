import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

  async createComment(formData){
    const res = await api.post('api/comments/', formData)
    logger.log('posting comment', res.data)
    AppState.comments.unshift(res.data)
  }
  async getCommentsByEventId(eventId){
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log(res.data)
    AppState.comments = res.data
  }

  async deleteComment(commentId){
    const res = await api.delete('api/comments/' + commentId)
    logger.log('deleted comment', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)

  }

}


export const commentsService = new CommentsService()