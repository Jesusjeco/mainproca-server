const Product = require('../schemes/Product');

const getAllProducts = async (req, res) => {
  try {
    const productsList = await Product.find({}).sort({ name: 1 });

    res.status(200).json(productsList);
    //console.log(productsList);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
}//getAllProducts

const getProductById = async (req, res) => {
  try {
    const productById = await Product.findById(req.params.id);

    if (!productById) {
      // If no product is found, send a 404 status and error message
      console.log("Error 404 detected");
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(productById);
    //console.log(productById);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).send('Error fetching product by ID');
  }
}

const createProduct = async (req, res) => {
  try {// Create a new document
    const { name, quantity, price, description } = req.body;
    const newProduct = { name, quantity, price, description };
    const product = new Product(newProduct);
    // Save the document
    const savedProduct = await product.save();
    res.status(201).send(savedProduct);
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}

const updateProduct = async function (req, res) {
  try {
    const { id } = req.params;

    const productUpdated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!productUpdated) {
      res.status(404).send('Document not found by ID');
    }

    res.status(200).send(productUpdated);
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }

    res.send(`Product with ID ${id} has been deleted`);
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Error deleting product');
  }
}

module.exports = {
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct
}
