import User from "../models/User"
import pagination from "../helpers/pagination"
import { Request, Response } from 'express'

/**
 * User Login
 * @route POST api/users/login
 */
export const login = async (req: Request, res: Response) => {
   res.send('login')
}

/**
 * Get List of Data
 * @route GET api/users
 */
export const getAll = async (req: Request, res: Response) => {
   try {
      const { limit, skip, meta } = await pagination(User, req)

      const data = await User.find().limit(limit).skip(skip).select('-password')
      res.json({ data, meta })
   } catch (error) {
      res.status(500).json({ error })
   }
}

/**
 * Get single Data
 * @route GET api/users/:id
 */
export const getOne = async (req: Request, res: Response) => {
   try {
      const data = await User.findById(req.params.id)
      if (!data) {
         return res.status(404).json({ message: 'User not found!' })
      }
      res.json({ data })
   } catch (error) {
      res.status(500).json({ error })
   }
}

/**
 * Create new Data
 * @route POST api/users
 */
export const create = async (req: Request, res: Response) => {
   const { firstName, lastName, email, password, phone } = req.body
   try {
      const user = await User.create({ firstName, lastName, email, password, phone })
      const data = await User.findById(user.id).select('-password')

      res.status(201).json({ data })
   } catch (error) {
      res.status(500).json({ error })
   }
}

/**
 * Update Data
 * @route PUT api/users/:id
 */
export const update = async (req: Request, res: Response) => {
   const { firstName, lastName, email, phone } = req.body
   const { id } = req.params
   try {
      const data = await User.findByIdAndUpdate(id, { firstName, lastName, email, phone })

      if (!data) {
         return res.status(404).json({ message: 'User not found!' })
      }

      res.json({ data: await User.findById(id).select('-password') })
   } catch (error) {
      res.status(500).json({ error })
   }
}

/**
 * Delete Data
 * @route DELETE api/users/:id
 */
export const destroy = async (req: Request, res: Response) => {
   try {
      const data = await User.findByIdAndDelete(req.params.id)

      if (!data) {
         return res.status(404).json({ message: 'User not found!' })
      }

      res.json({ message: 'Deleted Successfully!' })
   } catch (error) {
      res.status(500).json({ error })
   }
}

export default { getAll, getOne, create, update, destroy, login }
