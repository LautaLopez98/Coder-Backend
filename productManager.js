const fs = require ("fs");

class ProductManager{
    #products;
    path;
    static idProduct = 0;

    constructor(){
        this.path = './data/products.json'
        this.#products	= this.productsLoaded();
        
    }

    productsLoaded(){
        try {
            if (fs.existsSync(this.path)){;
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'));

            }return [];    
        } catch (error) {
            console.log(`Error al intentar leer el archivo de prodcutos, ${error}`);
        }
    }

    saveProducts(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.#products, null, 2))
        } catch (error) {
            console.log(`Error al intentar guardar el archivo de productos, ${error}`);
        }
    }

    idProduct(){
        let id= 1;
        if (this.#products.length != 0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;
    }
    
    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock) return 'Se requieren todos los parámetros [title, description, price, thumbnail, code, stock]';
        
        const repeat = this.#products.some(p=> p.code == code);
        if(repeat)
            return `El código ${code} ya se encuentra registrado en otro producto`

        ProductManager.idProduct = ProductManager.idProduct + 1; 
        const id = this.idProduct();
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(newProduct);
        this.saveProducts();

        return 'Producto agregado con exito!';
    }

    getProducts(){
        return this.#products;
    }

    getProductById(id){
        const producto = this.#products.find(p => p.id == id)
        if(producto)
            return producto
        else
            return `No se encontró el producto con id ${id}`;
    }

    updateProduct(id, objectUpdate){
        let msg = `El producto con id ${id} no existe`;
    
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            const {id, ...rest} = objectUpdate;
            this.#products[index] = {...this.#products[index], ...rest};
            this.saveProducts();
            msg = 'Producto actualizado';
        }
    
        return msg;
    }

    deleteProduct(id){
        const index = this.#products.findIndex (p=> p.id === id);
        if(index !== -1){
            this.#products.splice(index, 1);
            this.saveProducts();
            return 'Producto eliminado!'
        } else {
            return `No se encontró el producto con id ${id}`
        }
    }
}

const product = new ProductManager();


console.log(product.addProduct('Juego 1', 'Juego número 1', '20000', 'thumbnail', 'FZ515', '10')); 
console.log(product.addProduct('Juego 2', 'Juego número 2', '20000', 'thumbnail', 'FS515', '10'));
console.log(product.getProducts());
console.log(product.getProductById(3)); 


const newData = {
    "id": 2,
    "title": "Juego 2",
    "description": "Juego número 2",
    "price": "10000",
    "thumbnail": "thumbnail",
    "code": "FS515",
    "stock": "300"
  }
console.log(product.updateProduct(2, newData));


console.log(product.deleteProduct(1));
console.log(product.deleteProduct(2));