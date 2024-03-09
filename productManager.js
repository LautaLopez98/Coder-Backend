
class ProductManager{
    #products;
    static idProduct = 0;

    constructor(){
        this.#products	= [];
    }
    
    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock) return 'Se requieren todos los parámetros [title, description, price, thumbnail, code, stock]';
        
        const repeat = this.#products.some(p=> p.code == code);
        if(repeat)
            return `El código ${code} ya se encuentra registrado en otro producto`

        ProductManager.idProduct = ProductManager.idProduct + 1; 
        const id = ProductManager.idProduct;
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
}

const product = new ProductManager();


console.log(product.addProduct('Juego 1', 'Juego número 1', '20000', 'thumbnail', 'FZ515', '10')); 
console.log(product.addProduct('Juego 2', 'Juego número 2', '20000', 'thumbnail', 'FS515', '10')); 
console.log(product.getProducts());
console.log(product.getProductById(2));