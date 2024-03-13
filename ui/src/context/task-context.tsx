import axios from 'axios'
import { createContext, ReactNode, useState } from 'react'

type Task = {
	id: string
	name: string
	completed: boolean
}

type TaskState = {
	tasks: Task[]
	task: Task | null
}

type AddTask = {
	name: string
	completed: boolean
}

type UpdateTask = {
  id: string
  name: string
  completed: boolean
}

export type TaskContextType = TaskState & {
	loadTasks: () => Promise<void>
	addTask: (input: AddTask) => Promise<void>
  updateTask: (input: UpdateTask) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const TaskContext = createContext<TaskContextType>({
	tasks: [],
	task: null,
	loadTasks: async () => {},
	addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
})

type Props = {
	children: ReactNode
}

export function TaskContextProvider(props: Props): JSX.Element {
	const [state, setState] = useState<TaskState>({
		tasks: [],
		task: null,
	})

	const loadTasks = async () => {
		try {
			const { data } = await axios.get(import.meta.env.VITE_API_URL)

			setState((prevState) => ({
				...prevState,
				tasks: data,
			}))
		} catch (error) {
			console.error(error)
		}
	}

	const addTask = async (input: AddTask) => {
		try {
			await axios.post(import.meta.env.VITE_API_URL, {
				name: input.name,
				completed: input.completed,
			})

			const { data } = await axios.get(import.meta.env.VITE_API_URL)

			setState((prevState) => ({
				...prevState,
				tasks: data,
			}))
		} catch (error) {
			console.error(error)
		}
	}

  const updateTask = async (input: UpdateTask) => {
    try {
      await axios.put(import.meta.env.VITE_API_URL, {
        id: input.id,
        name: input.name,
        completed: input.completed,
      })

      const { data } = await axios.get(import.meta.env.VITE_API_URL)

      setState((prevState) => ({
        ...prevState,
        tasks: data,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  

	const deleteTask = async (id: string) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`)

			const { data } = await axios.get(import.meta.env.VITE_API_URL)

			setState((prevState) => ({
				...prevState,
				tasks: data,
			}))
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<TaskContext.Provider
			value={{
				...state,
				loadTasks,
				addTask,
        updateTask,
        deleteTask,
			}}
		>
			{props.children}
		</TaskContext.Provider>
	)
}
