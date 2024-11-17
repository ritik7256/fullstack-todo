import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
function App() {
  const [form, setForm] = useState({ todo: "" });
  const [list,setList]=useState([]);

   const handleChange=(e)=>{
     setForm({
      ...form,
      [e.target.name]:e.target.value
     })
   }

   const fetchTodo=async()=>{
    const response=await axios.get("http://localhost:8080/todo");
    setList(response.data);

   }
   useEffect(()=>{
    fetchTodo();
   },[]);
   
   const handleSubmit=async (e)=>{ 
    e.preventDefault();
    const response=await axios.post("http://localhost:8080/todo",form);
    setList([response.data, ...list]); // Append the new todo to the list
    setForm({ todo: "" });

   }
   const deleteTodo=async(id)=>{
    const response=await axios.post(`http://localhost:8080/todo${id}`);
    setList(list.filter((todo)=>todo._id!==id))
   }
   const updateTodo=async(id)=>{
     const response=await axios.patch(`http://localhost:8080/todo${id}`)
   }
  return (
    <>
      <div>
        
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name='todo' value={form.todo}  onChange={handleChange} />
          <input type="submit" />
        </form>
        <div>
          <ul>
            {list.map((todos)=> <li key={todos._id}>{todos.data}<button onClick={()=>deleteTodo(todos._id)}>delete</button> <button onClick={()=>updateTodo(todos._id)}>edit</button></li>)}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App