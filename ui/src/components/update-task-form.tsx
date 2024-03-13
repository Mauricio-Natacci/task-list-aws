import { Button, Dialog, DialogTitle, TextField } from '@mui/material'
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

	const { updateTask } = useContext(TaskContext)

	const handleUpdateTaskName = async () => {
		if (!taskName.length) return

		try {
			
			await updateTask({ id, name: taskName, completed })

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
