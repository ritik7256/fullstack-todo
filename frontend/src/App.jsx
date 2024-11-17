
import { useState } from 'react'
import './App.css'

function App() {
  const [form,setForm]=useState('');
   const handleChange=(e)=>{
     setForm(...form,e.target.value);
    console.log(form)
   }

  return (
    <>
      <div>
        <p>{form}</p>
        <form action="">
          <input type="text" name='todo' onChange={handleChange} />
          <input type="submit" />
        </form>
      </div>
    </>
  )
}

export default App
