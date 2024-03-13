import { Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import axios from 'axios'

type AddTaskFormProps = {
	fetchTasks: () => Promise<void>
}

export const AddTaskForm = ({ fetchTasks }: AddTaskFormProps) => {
	const [newTask, setNewTask] = useState('')

	const addNewTask = async () => {
		try {
			await axios.post(import.meta.env.VITE_API_URL, {
				name: newTask,
				completed: false,
			})

			await fetchTasks()

			setNewTask('')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<Typography align='center' variant='h2' paddingTop={2} paddingBottom={2}>
				My Task List
			</Typography>

			<div className='addTaskForm'>
				<TextField
					size='small'
					label='Task'
					variant='outlined'
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<Button
					disabled={!newTask.length}
					variant='outlined'
					onClick={addNewTask}
				>
					<AddIcon />
				</Button>
			</div>
		</div>
	)
}
