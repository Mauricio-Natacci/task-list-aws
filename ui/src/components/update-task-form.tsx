import { Button, Dialog, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { TaskProps } from './task'
import axios from 'axios'

type UpdateTaskProps = {
	isDialogOpen: boolean
	setIsDialogOpen: (isDialogOpen: boolean) => void
	task: TaskProps['task']
	fetchTasks: () => Promise<void>
}

export const UpdateTaskForm = ({
	isDialogOpen,
	setIsDialogOpen,
	task,
	fetchTasks,
}: UpdateTaskProps) => {
	const { id, completed } = task
	const [taskName, setTaskName] = useState('')

	const handleUpdateTaskName = async () => {
		try {
			await axios.put(`${import.meta.env.VITE_API_URL}`, {
				id,
				name: taskName,
				completed,
			})

			await fetchTasks()
			setTaskName('')
		} catch (error) {
			console.error(error)
		}
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
				>
					<CheckIcon />
				</Button>
			</div>
		</Dialog>
	)
}
