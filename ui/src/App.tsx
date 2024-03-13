import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AddTaskForm } from './components/add-task-form'
import { Task } from './components/task'
import { useContext } from 'react'
import { TaskContext } from './context'

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
	const { tasks } = useContext(TaskContext)

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<AddTaskForm />
			{tasks.map((task) => (
				<Task task={task} key={task.id} />
			))}
		</ThemeProvider>
	)
}
