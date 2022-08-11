// *primer servidos usando el modulo http
/*  const http = require('http')
const port = process.env.PORT || 8080
const getMessge=()=>{
    let rta 
    const hora = new Date().getHours()
    console.log(hora)
    if(hora <12){
        rta = "buenos dias "
    }else if(hora >12 && hora <19){
        rta = "buenas tarder"
    }else{
        rta ="buenas noches"
    }
    return rta
}

const server = http.createServer((req, res) => {
    
    res.end(getMessge())
})


server.listen(port,()=>{
    console.log(`server on port http://localhost:${port}`)
})

*/

const express = require("express");
const Contenedor = require("./productos");
const port = process.env.PORT || 8080;
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productos = new Contenedor("productos.txt");

app.use(morgan("dev"));

app.get("/productos", async (req, res) => {
  const respuesta = await productos.getAll();
  console.log("rta--->", respuesta);
  res.send(respuesta);
});


app.get("/productos/random", async (req, res) => {
    const prod = await productos.getAll();
    const numRandom = Math.floor(Math.random() *prod.length )
    res.send(prod[numRandom]);
})

app.listen(port, () => {
    console.log(`server on port http://localhost:${port}`);
  });























// app.get("/", (req, res) => {
//   res.send("<h1 style={color='blue'}> Bienvenido al server con express </h1>");
// });

// let cont = 0;
// app.get("/vista", async (req, res) => {
//   await res.send({
//     message: "la cantidad de visitas a esta ruta es de ",
//     cont: cont + 1,
//   });
//   cont = cont + 1;
// });

// app.get("/time", (req, res) => {
//   const fyh = new Date();
//   res.send(fyh);
// });


