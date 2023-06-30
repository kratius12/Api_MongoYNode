const express = require('express');
const hostname = 'localhost';
const port = 5000;
const routerApi = require("./routes");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());

routerApi(app);

app.listen(port, hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})

app.get("/", (req,res)=>{
    res.status(200).send('Api materiales y categorias')
})