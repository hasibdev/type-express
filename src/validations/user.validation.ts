import { body } from 'express-validator'
import User from '../models/User'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const validate = (req: Request, res: Response, next: NextFunction) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
   }
   next()
}

export default function (method: string) {
   switch (method) {
      case 'create':
         return [
            body('firstName').notEmpty().isAlpha().isLength({ max: 50 }),
            body('lastName').notEmpty().isAlpha().isLength({ max: 50 }),
            body('email').notEmpty().isEmail().custom(async (email) => {
               const user = await User.exists({ email })
               if (user) throw new Error('E-mail already in use')
               return true
            }),

            body('password').notEmpty().isLength({ min: 6, max: 30 }),
            body('confirmed_password').custom((value, { req }) => {
               if (value !== req.body.password) {
                  throw new Error('Password confirmation does not match!')
               }
               return true
            }),
            validate
         ]
         break

      case 'update':
         return [
            body('firstName').notEmpty(),
            body('lastName').notEmpty(),
            body('email').notEmpty().isEmail(),
            validate
         ]
         break

      default:
         return []
         break
   }
}
