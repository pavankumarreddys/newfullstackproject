import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React,{useEffect,useState}from 'react'
import TaskForm from './Components/TaskForm/TaskForm'
import Home from './Components/Home/Home'
import Login from './Components/Authentication/Login'
import Signup from './Components/Authentication/Signup'

const App = () => {
const [myData,setMyData] = useState([{}])

// useEffect(()=>{
//     fetch('/api')
//     .then(resp => resp.json())
//     .then(data =>{
//       console.log(data.users)
//       setMyData(data)
// })
//   },[])

  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App

// <div>
//       <Home/>
//       <TaskForm/>
//       {(typeof myData.users === "undefined")?(
//         <p>loading...</p> 
//       ):(
//         myData.users.map((user,i)=>{
//           return <p key={i}>{user}</p>
//         })
//       ) 
//     }
//     </div>