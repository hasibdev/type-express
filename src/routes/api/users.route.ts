import express from 'express'
import controller from '../../controllers/user.controller'
import validation from '../../validations/user.validation'

const router = express.Router({ mergeParams: true })

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', validation('create'), controller.create)
router.put('/:id', validation('update'), controller.update)
router.delete('/:id', controller.destroy)

// Auth
router.post('/register', validation('create'), controller.create)
router.post('/login', validation('create'), controller.login)

export default router
