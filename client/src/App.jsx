import Signup from './components/Signup';
import Login from './components/Login';
import AddNewWords from './components/AddNewWords';
import AdminStats from './components/AdminStats';
import LeaveMessage from './components/LeaveMessage';
import Rewards from './components/Rewards';
import Tasks from './components/Tasks';
import Quiz from './components/Quiz';
import Answer from './components/Answer';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("valami")

  const ProtectedRoute = ({ component: Component }) => {
    console.log('isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
    return <Component />;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />

          <Route path="/home" element={<ProtectedRoute component={() => <Tasks user={user} setUser={setUser}/>} />} />
          <Route
            path="/AddNewWords"
            element={<ProtectedRoute component={AddNewWords} />}
          />
          <Route
            path="/AdminStats"
            element={<ProtectedRoute component={AdminStats} />}
          />
          <Route
            path="/LeaveMessage"
            element={<ProtectedRoute component={() => <LeaveMessage user={user} />} />}
          />
          <Route
            path="/Rewards"
            element={<ProtectedRoute component={() => <Rewards user={user} />} />}
          />
          <Route
            path="/Tasks/Quiz/:selectedTopic"
            element={<ProtectedRoute component={() => <Quiz user={user} setUser={setUser} />} />}
          />
          <Route
            path="/Tasks/Answer/:selectedTopic"
            element={<ProtectedRoute component={() => <Answer user={user} setUser={setUser} />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
