const fs = require('fs');

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    

   async save(object){
       let data
       
        try{
            data  = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8') //leo archivo
            data = JSON.parse(data)
        } catch (err) {
            data = []
        }

        const lastProduct = data[data.length - 1] //conozco la posicion del ultimo elemento

        let id = 1

        if (lastProduct) { // si hay productos le sumo uno al id
             id = lastProduct.id + 1
        }
        object.id = id

        data.push(object) //agrego producto

        return fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(data, null, 2)) //save del producto nuevo

  }

    async getById(id){
        let data
        try{
            data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            data = JSON.parse(data)            
        }
        catch(err){ data = []}
        
        return data.find(prod => prod.id === id)
    }
 
    async getAll(){
        let data
        try{
            data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            data = JSON.parse(data)
         } catch(err){data = []}

         return data
    }

    async deleteById(id){
        let data
        try{
            data = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            data = JSON.parse(data)
                
            }catch(err){data = []}
        const newList = data.find(prod => prod.id !== id)
        return fs.promises.writeFile(`./${this.nombreArchivo}`,JSON.stringify(newList, null, 2))
    }

    async deleteAll(){
        return fs.promises.writeFile(`./${this.nombreArchivo}`,'')
    }

    async getRandom(){
        let data= await this.getAll()
        console.log(data)
        let id = Math.floor(Math.random()*data.length)
        console.log(id)
        return this.getById(id)
    }
}

module.exports = Contenedor

;(async () => {

    

    const contenedor = new Contenedor('productos.txt')
    
    const newProduct = {
      title: 'Product 1',
      price: 10.0,
      thumbnail: 'https://image.com'
    }
    const newProduct2 = {
        title: 'Product 2',
        price: 20.0,
        thumbnail: 'https://image2.com'
      }
      const newProduct3 = {
        title: 'Product 3',
        price: 30.0,
        thumbnail: 'https://image3.com'
      }
   
    await contenedor.save(newProduct)
    await contenedor.save(newProduct2)
    await contenedor.save(newProduct3)
  
    //const product = await contenedor.getById(1)
    //console.log(product)
  
  
    //const products = await contenedor.getAll()
    //console.log(products)
  
    //await contenedor.deleteById(19)
  
    //await contenedor.deleteAll()
   })()