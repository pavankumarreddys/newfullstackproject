import React,{useEffect,useState}from 'react'
import TaskForm from './Components/TaskForm/TaskForm'
const App = () => {
const [myData,setMyData] = useState([{}])

useEffect(()=>{
    fetch('/api')
    .then(resp => resp.json())
    .then(data =>{
      console.log(data.users)
      setMyData(data)
})
  },[])

  
  return (
    <div>
      <TaskForm/>
      {(typeof myData.users === "undefined")?(
        <p>loading...</p> 
      ):(
        myData.users.map((user,i)=>{
          return <p key={i}>{user}</p>
        })
      ) 
    }
    </div>
  )
}

export default App
