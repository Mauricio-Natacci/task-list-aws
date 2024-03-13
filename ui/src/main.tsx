import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TaskContextProvider } from './context/task-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<TaskContextProvider>
		<App />
	</TaskContextProvider>,
)
