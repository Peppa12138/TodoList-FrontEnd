import Login from '../components/Login/Login.js'
import Register from '../components/Register/Register.js'
import ToDoList from '../components/APP/App.js'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
    [
        { path: '/', element: <Login /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/app', element: <ToDoList /> }
    ]
)

export default router