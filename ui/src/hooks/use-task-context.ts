import { useContext } from 'react'
import { TaskContext, TaskContextType } from '../context'

export const useTaskContext = (): TaskContextType => {
  return useContext(TaskContext)
}
