const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Todo');
const itemSchema=new mongoose.Schema({
    data:String
})
const item=mongoose.model("Item",itemSchema)

app.use(cors());
app.use(express.json());

app.post("/todo",async (req,res)=>{
  const Todo=new item();
  Todo.data=req.body.todo;
  const newTodo= await Todo.save();
  res.json(newTodo)
  
})

app.get("/todo",async(req,res)=>{
   const todo=await item.find();
   res.json(todo)
   console.log(todo)

})
app.delete("todo/:id",async(req,res)=>{
  const id=req.params.id;
  const deletedTodo=await item.findByIdAndDelete(id);
  res.send(deletedTodo);
  
})
app.listen(8080,()=>{
    console.log('server started')
})