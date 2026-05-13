import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { userModel } from '../models/UserModel.js'
import { articleModel } from '../models/ArticleModel.js'

export const adminApp = exp.Router()

// Get all users (role: USER)
adminApp.get('/users', verifyToken('ADMIN'), async (req, res) => {
  const users = await userModel.find({ role: 'USER' }).select('-password')
  res.status(200).json({ message: 'Users list', payload: users })
})

// Get all authors (role: AUTHOR)
adminApp.get('/authors', verifyToken('ADMIN'), async (req, res) => {
  const authors = await userModel.find({ role: 'AUTHOR' }).select('-password')
  res.status(200).json({ message: 'Authors list', payload: authors })
})

// Toggle user/author active status
adminApp.put('/users/:id/status', verifyToken('ADMIN'), async (req, res) => {
  const { id } = req.params
  const { isUserActive } = req.body

  const user = await userModel.findById(id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.isUserActive = isUserActive
  await user.save({ validateBeforeSave: false })

  const userData = user.toObject()
  delete userData.password

  res.status(200).json({
    message: 'User status updated successfully',
    payload: userData
  })
})

// Read articles of all authors
adminApp.get('/articles', verifyToken('ADMIN'), async (req, res) => {
  const articlesList = await articleModel.find({ isActive: true })
  res.status(200).json({ message: 'Article List:', payload: articlesList })
})
