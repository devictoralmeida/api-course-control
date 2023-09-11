import "express-async-errors";
import "dotenv/config";
import express, { Application } from 'express'
import { userRouter } from './routes/user.routers'
import { handleError } from './middlewares/handleError.middleware'
import { coursesRouter } from './routes/courses.routers'
import { sessionRouter } from './routes/session.routers'

const app: Application = express()
app.use(express.json())

app.use('/users', userRouter)
app.use('/courses', coursesRouter)
app.use('/login', sessionRouter)

app.use(handleError);

export default app
