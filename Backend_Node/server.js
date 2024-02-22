const express = require('express');
const app = express();
const port =3002;
const cors = require('cors');

require('./db');
app.use(cors());

var userRoutes = require('./routes/user');
app.use('/api/v1/user', userRoutes);

app.use('/' , (req,res) =>{
  res.json("This app runing on development mode")
})


app.listen(port , () =>{
    console.log(`This server runing on port ${port}! `)
})