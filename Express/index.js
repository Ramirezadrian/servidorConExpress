const express = require('express')
const Contenedor = require('../Archivos/desafioArchivo.js')

const app = express()

const PORT = 8080

app.get('/', (req, res) => {
  res.send({ mensaje: 'Desafio "Servidor con Express"'})
})

app.get('/productos', async (req, res) => {
  const contenedor = new Contenedor('productos.txt')
const prod = await contenedor.getAll()
console.log(prod)
  res.send(prod)
})

app.get('/productoRandom', async (req, res) => {
  const contenedor = new Contenedor('productos.txt')
  const prod = await contenedor.getRandom()
  res.send(prod)
})

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

server.on('error', (error) => console.log(`Error en servidor: ${error}`))