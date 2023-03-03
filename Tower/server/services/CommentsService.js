import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService{
  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if(!comment){
      throw new BadRequest('Comment does not exist')
    }
    if(comment.creatorId != userId){
      throw new Forbidden('Comment is not yours')
    }
    await comment.remove(commentId)
  }
  async getTowerEventComments(eventId) {
    const towerEventComments = await dbContext.Comments.find({eventId})
    .populate('creator')
    return towerEventComments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    return comment
  }

}

export const commentsService = new CommentsService()