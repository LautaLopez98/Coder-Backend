const express = require ("express")
const ProductManager = require("./productManager")
const path = require("path")

const PORT = 8080
const ruta = path.join(__dirname, "data", "products.json")
const app = express()

const productManager = new ProductManager(ruta);

app.get("/", (req, res)=> {
    res.send("Server básico con Express")
})

app.get("/products", async (req, res) => {
    try {
        let limit = parseInt(req.query.limit);
        if (isNaN(limit)) {
            limit = undefined; 
        }
        const products = await productManager.getProducts(limit); 
        res.json(products);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
});

app.get("/products/:id", async (req, res)=> {
    let productId = req.params.id
    try {
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        console.log("Error al obtener el producto:", error);
    }
})


app.listen(PORT, ()=> console.log(`Server online en puerto ${PORT}`))
