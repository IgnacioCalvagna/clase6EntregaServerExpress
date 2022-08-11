const { promises: fs } = require("fs");

let newId = 1;

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(newObject) {
    const objetos = await this.getAll();

    if (objetos.length == 0) {
      newId = 1;
    } else {
      const ultiId = objetos.length  ;
        console.log("mi ultiId ",ultiId)
      newId = ultiId + 1;
      console.log(typeof newId);
    }
    objetos.push({ id: newId, ...newObject });

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
      return newId;
    } catch (e) {
      console.log("error", e);
    }
  }

  async getById(id) {
    const productos = await this.getAll();

    try {
      const prod = await productos.find((p) => p.id === id);

      console.log(JSON.stringify(prod));
    } catch (e) {
      console.log("error", e);
    }
  }

  async getAll() {
    try {
      const productos = await fs.readFile(this.ruta, "utf8");
      return JSON.parse(productos);
    } catch (e) {
      return [];
    }
  }

  async deleteById(id) {
    const productos = await this.getAll();
    const newArr = await productos.filter((p) => p.id !== id);
    try {
      console.log("Nuevo arr length", newArr.length);
      return await fs.writeFile(this.ruta, JSON.stringify(newArr, null, 2));
      //   return newArr;
    } catch (e) {
      console.log("error", e);
    }
  }

  async deleteAll() {
    let newArr = [];
    try {
      await fs.writeFile(this.ruta, JSON.stringify(newArr, null, 2));
      console.log("Nuevo arr length", newArr.length);
      return newArr;
    } catch (e) {
      console.log("error", e);
    }
  }
}

const newContainer = new Contenedor('./productos.txt')

// newContainer.save({ title: "iphone XR pro max", price: "1215usd" });
// newContainer.deleteAll()
// // newContainer.deleteById(3)
// // newContainer.getById(2);
newContainer.getAll()


module.exports = Contenedor