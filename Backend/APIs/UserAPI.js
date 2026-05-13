import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { articleModel } from '../models/ArticleModel.js'
export const userApp = exp.Router()

//Read articles of all authors
userApp.get('/articles', verifyToken('USER', 'ADMIN'), async (req, res) => {
  const articlesList = await articleModel.find({ isActive: true })
  res.status(200).json({ message: 'Article List:', payload: articlesList })
})

//Add comment to an article
userApp.put('/articles', verifyToken('USER', 'ADMIN'), async (req, res) => {
  const { articleId, comment } = req.body

  const articleDocument = await articleModel
    .findOne({ _id: articleId, isActive: true })
    .populate('comments.user')

  if (!articleDocument) {
    return res.status(404).json({ message: 'Article not found' })
  }

  const userId = req.user?.id
  articleDocument.comments.push({ user: userId, comment: comment })
  await articleDocument.save()
  await articleDocument.populate('comments.user')

  res
    .status(200)
    .json({ message: 'Comment added successfully', payload: articleDocument })
})
