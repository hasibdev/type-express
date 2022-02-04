import User from "../models/User"
import paginated from "../helpers/paginated"
const { validationResult } = require('express-validator')


/**
 * Get List of Data
 * @route GET api/users
 */
const getAll = async (req: any, res: any) => {
   try {
      const { limit, skip, meta } = await paginated(User, req)

      const data = await User.find().limit(limit).skip(skip)
      res.json({ data, meta })
   } catch (error) {
      res.status(500).json({ error })
   }
}

/**
 * Get single Data
 * @route GET api/users/:id
 */
const getOne = async (req: any, res: any) => {
   try {
      const data = await User.findById(req.params.id).select('-password')
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
const create = async (req: any, res: any) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
   }

   const { firstName, lastName, email, password, phone } = req.body
   try {
      const data = await User.create({ firstName, lastName, email, password, phone })

      res.json({ data })
   } catch (error) {
      res.status(500).json({ error })
   }
}

/**
 * Update Data
 * @route PUT api/users/:id
 */
const update = async (req: any, res: any) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
   }

   const { firstName, lastName, email, phone } = req.body
   const { id } = req.params
   try {
      const data = await User.findByIdAndUpdate(id, { firstName, lastName, email, phone })

      if (!data) {
         return res.status(404).json({ message: 'User not found!' })
      }

      res.json({ data: await User.findById(id) })
   } catch (error) {
      res.status(500).json({ error })
   }
}

/**
 * Delete Data
 * @route DELETE api/users/:id
 */
const destroy = async (req: any, res: any) => {
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

export default { getAll, getOne, create, update, destroy }
