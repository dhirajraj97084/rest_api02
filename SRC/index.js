const express=require('express');
const app=express();
const fs=require('fs');
const users=require('../MOCK_DATA.json')
const port= 3000;

app.get('/',(req,res)=>{
    return res.json(users);
})
//middlewere
app.use(express.urlencoded({extended:false}));

app.post('/api/users',(req,res)=>{

    const body=req.body;
    users.push({...body , id:users.length});
    fs.watchFile('./MOCK_DATA.json',JSON.stringify(users),(error,data)=>{
    return res.json({status:'panding'});

    });
   
});

app.get('/:id',(req,res)=>{
   const id=req.params.id;
   const user=users.find((users)=>users.id==id);
   return res.json(user);

})


app.listen(port,()=>{
    console.log(`your application is rinning at ${port}`)
})