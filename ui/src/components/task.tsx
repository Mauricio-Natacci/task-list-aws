import { Button, Checkbox, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import classNames from 'classnames'
import axios from 'axios'
import { UpdateTaskForm } from './update-task-form'
import { TaskContext } from '../context'

export type TaskProps = {
	task: {
		id: string
		name: string
		completed: boolean
	}
}

export const Task = ({ task }: TaskProps) => {
	const { id, name, completed } = task

	const { deleteTask } = useContext(TaskContext)

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
			await deleteTask(id)
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
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				task={task}
			/>
		</div>
	)
}
