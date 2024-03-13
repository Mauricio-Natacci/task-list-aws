import { Button, Checkbox, CircularProgress, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import classNames from 'classnames'
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
	const { deleteTask, updateTaskCompletion } = useContext(TaskContext)

	const [isComplete, setIsComplete] = useState(completed)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleUpdateTaskCompletion = async () => {
		try {
			await updateTaskCompletion({
				completed: isComplete,
				id,
				name,
			})
			setIsComplete(!isComplete)
		} catch (error) {
			console.error(error)
		}
	}

	const handleDeleteTask = async () => {
		setIsLoading(true)
		try {
			await deleteTask(id)
		} catch (error) {
			setIsLoading(false)
			console.error(error)
		}
		setIsLoading(false)
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
				<Button
					color='error'
					variant='contained'
					onClick={handleDeleteTask}
					disabled={isLoading}
				>
					{isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
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
