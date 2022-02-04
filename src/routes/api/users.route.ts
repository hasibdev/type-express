
import express from 'express'
import controller from '../../controllers/user.controller'

const router = express.Router({ mergeParams: true })

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

export default router
