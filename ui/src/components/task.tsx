import { Button, Checkbox, Typography } from '@mui/material'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { UpdateTaskForm } from './update-task-form'
import classNames from 'classnames'
import axios from 'axios'

export type TaskProps = {
	task: {
		id: string
		name: string
		completed: boolean
	}
	fetchTasks: () => Promise<void>
}

export const Task = ({ task, fetchTasks }: TaskProps) => {
	const { id, name, completed } = task
	const [isComplete, setIsComplete] = useState(completed)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleUpdateTaskCompletion = async () => {
		try {
			await axios.put(`${import.meta.env.VITE_API_URL}`, {
				id,
				name,
				completed: !isComplete,
			})
			setIsComplete(!isComplete)
		} catch (error) {
			console.error(error)
		}
	}

	const handleDeleteTask = async () => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`)

			await fetchTasks()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='task'>
			<div className={classNames('flex', { done: isComplete })}>
				<Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
				<Typography variant='h4'>{name}</Typography>
			</div>

			<div className='taskButtons'>
				<Button variant='contained' onClick={() => setIsDialogOpen(true)}>
					<EditIcon />
				</Button>
				<Button color='error' variant='contained' onClick={handleDeleteTask}>
					<DeleteIcon />
				</Button>
			</div>

			<UpdateTaskForm
				fetchTasks={fetchTasks}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				task={task}
			/>
		</div>
	)
}
