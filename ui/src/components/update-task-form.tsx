import {
	Button,
	CircularProgress,
	Dialog,
	DialogTitle,
	TextField,
} from '@mui/material'
import { useContext, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { TaskProps } from './task'
import { TaskContext } from '../context'

type UpdateTaskProps = {
	isDialogOpen: boolean
	setIsDialogOpen: (isDialogOpen: boolean) => void
	task: TaskProps['task']
}

export const UpdateTaskForm = ({
	isDialogOpen,
	setIsDialogOpen,
	task,
}: UpdateTaskProps) => {
	const { id, completed } = task
	const [taskName, setTaskName] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { updateTaskName } = useContext(TaskContext)

	const handleUpdateTaskName = async () => {
		if (!taskName.length) return

		setIsLoading(true)
		try {
			await updateTaskName({ id, name: taskName, completed })

			setTaskName('')
		} catch (error) {
			setTaskName('')
			setIsLoading(false)
			console.error(error)
		}
		setIsLoading(false)
	}

	return (
		<Dialog open={isDialogOpen}>
			<DialogTitle>Edit Task</DialogTitle>
			<div className='dialog'>
				<TextField
					size='small'
					label='Task'
					variant='outlined'
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
				/>
				<Button
					variant='contained'
					onClick={async () => {
						await handleUpdateTaskName()

						setIsDialogOpen(false)
					}}
					disabled={isLoading}
				>
					{isLoading ? (
						<CircularProgress size={24} color='warning' />
					) : (
						<CheckIcon />
					)}
				</Button>
			</div>
		</Dialog>
	)
}
