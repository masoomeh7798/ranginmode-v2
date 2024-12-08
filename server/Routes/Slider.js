import express from 'express'
import { create, getAll, getOne, remove } from '../Controllers/SliderCn.js'
import isAdmin from "../Middleware/isAdmin.js";

const sliderRouter=express.Router()
sliderRouter.route('/').post(create).get(getAll)
sliderRouter.route('/:id').get(getOne).delete(remove)

export default sliderRouter