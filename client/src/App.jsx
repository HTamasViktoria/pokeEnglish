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
          <Route path="/home" element={<Tasks />} />
          <Route path="/AddNewWords" element={<AddNewWords />} />
          <Route path="/AdminStats" element={<AdminStats />} />
          <Route path="/LeaveMessage" element={<LeaveMessage />} />
          <Route path="/Rewards" element={<Rewards />} />
          <Route path="/Tasks" element={<Tasks />} />
          <Route path="/Tasks/Quiz/:selectedTopic" element={<Quiz />} />
          <Route path="/Tasks/Answer/:selectedTopic" element={<Answer />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
