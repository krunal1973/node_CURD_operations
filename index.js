import express from "express";


const app = express();
const port = 3000;

/*
app.get("/",(req,res)=>{
    res.send("hello ")
})
to send data 
 */

//CURD 
app.use(express.json())
let userData = []
let nextId = 1
// add user
app.post('/users', (req,res)=>{
    
    const {Name,Age} = req.body
    const newUser = {id: nextId++,Name,Age}
    userData.push(newUser)
    res.status(201).send(newUser)
})
// get all user
app.get('/users',(req,res)=>{
    res.status(200).send(userData)
})
//get  user by id
app.get('/users/:id',(req,res)=>{
   const user = userData.find(u => u.id === parseInt(req.params.id))
   if(!user){
    return res.status(404).send("user not found")
   }
   res.status(200).send(user)
})

//update user

app.put('/users/:id',(req,res)=>{
    const userId = req.params.id
    const user = userData.find(u => u.id === parseInt(req.params.id))
    
    if(!user){
    return res.status(404).send("user not found")
   }

   const {Name,Age} = req.body
   user.Name = Name
   user.Age = Age
   res.status(200).send(user)
})

//delet user
app.delete('/users/:id',(req,res) =>{
    const index = userData.findIndex(u => u.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('user not found')
    }
    userData.splice(index,1)
    return res.status(200).send('user deleted')
})

app.listen(port,()=>{
    console.log(`server is running at port: ${port}...`)
})