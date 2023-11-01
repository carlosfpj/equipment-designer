import express from 'express';
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('hello World a');
});

app.listen(port, ()=> {
  console.log(`Example app listening to port ${port}`)
})