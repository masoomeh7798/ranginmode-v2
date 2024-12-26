import express from 'express'
import { create, getAll, getOne, remove } from '../Controllers/SliderCn.js'
import isAdmin from "../Middleware/isAdmin.js";

const sliderRouter=express.Router()
sliderRouter.route('/').post(isAdmin,create).get(getAll)
sliderRouter.route('/:id').get(isAdmin,getOne).delete(isAdmin,remove)

export default sliderRouter