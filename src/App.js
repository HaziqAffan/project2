import logo from './logo.svg';
import  React, {useState} from 'react'
import './App.css';
import Signin from './Signin';
import Signup from './Signup';
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom';
import Posts from './Posts';

function App() 
{
  
  // const [name,setName]=useState("")
  return (
    <Router>
      <div className="App">
        {/* {page==="signin"?<Signin change={changeform}/>:<Signup change={changeform}/>} */}
      </div>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/posts' element={<Posts />}/>
        <Route path='*'/>
      </Routes>
    </Router>
    
    
  );
}

export default App;
