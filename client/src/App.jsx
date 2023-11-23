import Signup from './components/Signup'
import Login from './components/Login'
import Admin from './components/Admin'
import AddNewWords from './components/AddNewWords'
import AdminStats from "./components/AdminStats"
import LeaveMessage from "./components/LeaveMessage"
import Rewards from "./components/Rewards"
import Tasks from './components/Tasks'
import Quiz from './components/Quiz'
import Answer from './components/Answer'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Admin />} />
          <Route path="/home/AddNewWords" element={<AddNewWords />} />
          <Route path="/home/AdminStats" element={<AdminStats />} />
          <Route path="/home/LeaveMessage" element={<LeaveMessage />} />
          <Route path="/home/Rewards" element={<Rewards />} />
          <Route path="/home/Tasks" element={<Tasks />} />
          <Route path="/home/Tasks/Quiz/:selectedTopic" element={<Quiz />} />
          <Route path="/home/Tasks/Answer/:selectedTopic" element={<Answer />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
