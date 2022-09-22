import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {    
  const user = useSelector((state) => state.authReducer.authData)
  return (

    <div className="App">
        <Routes>
          <Route path='/' element={ user ? <Navigate to="home"/> : <Navigate to="auth"/> }></Route>
          <Route path='/home' element={ user ? <Home/> : <Navigate to="../auth"/> }></Route>
          <Route path='/auth' element={ user ? <Navigate to="../home"/> : <Auth/> }></Route>
        </Routes>
    </div>
  );
}

export default App;
