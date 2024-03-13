import { Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { useContext, useState } from 'react'
import { TaskContext } from '../context'

export const AddTaskForm = () => {
	const [newTask, setNewTask] = useState('')
	const { addTask } = useContext(TaskContext)

	const addNewTask = async () => {
		try {
			await addTask({ name: newTask, completed: false })

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
