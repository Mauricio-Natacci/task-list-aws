import express from 'express'
import cors from 'cors'
import { createTask, deleteTask, fetchTasks, updateTask } from './task.js'
import serverless from 'serverless-http'

const app = express()
const port = 3001

app.use(express.json())

if (process.env.DEVELOPMENT) {
	app.use(cors())
}

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/task', async (req, res) => {
	try {
		const tasks = await fetchTasks()

		res.send(tasks.Items)
	} catch (error) {
		res.status(400).send(`Error fetching tasks: ${error}`)
	}
})

app.post('/task', async (req, res) => {
	try {
		const task = req.body

		const response = await createTask(task)

		res.send(response)
	} catch (error) {
		res.status(400).send(`Error creating tasks: ${error}`)
	}
})

app.put('/task', async (req, res) => {
	try {
		const task = req.body

		const response = await updateTask(task)

		res.send(response)
	} catch (error) {
		res.status(400).send(`Error updating tasks: ${error}`)
	}
})

app.delete('/task/:id', async (req, res) => {
	try {
		const { id } = req.params

		const response = await deleteTask(id)

		res.send(response)
	} catch (error) {
		res.status(400).send(`Error deleting tasks: ${error}`)
	}
})

if (process.env.DEVELOPMENT) {
	app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
	})
}

export const handler = serverless(app)
