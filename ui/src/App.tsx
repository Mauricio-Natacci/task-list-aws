import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AddTaskForm } from './components/add-task-form'
import { Task } from './components/task'
import axios from 'axios'
import { useEffect, useState } from 'react'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
})

type Task = {
	id: string
	name: string
	completed: boolean
}

export default function App() {
	const [tasks, setTasks] = useState([])

	const fetchTasks = async () => {
		try {
			const { data } = await axios.get(import.meta.env.VITE_API_URL)
			setTasks(data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchTasks()
	}, [])

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<AddTaskForm fetchTasks={fetchTasks} />
			{tasks.map((task: Task) => (
				<Task key={task.id} task={task} fetchTasks={fetchTasks} />
			))}
		</ThemeProvider>
	)
}
