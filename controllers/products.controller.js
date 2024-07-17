const Product = require('../schemas/Product');

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

    res.status(201).send('Test product name saved successfully');
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}

const updateProduct = async function (req, res) {
  try {
    const { id } = req.params;

    const productToupdate = await Product.findByIdAndUpdate(id, req.body);
    if (!productToupdate) {
      res.status(404).send('Document not found by ID');
    }

    const updatedProduct = await Product.findById(id);
    //res.status(200).send('Product updated... I guess?');
    res.status(200).send(updatedProduct);

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

const getProductsIdsAndNames = async (req, res) => {
  console.log("getProductsNamesById route");
  try {
    // Extract productIds from request body or query parameters
    const productIds = req.body.productIds || [];

    // Fetch products from MongoDB using Mongoose
    const products = await Product.find({ _id: { $in: productIds } });

    // Check if any products were found
    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'Products not found' });
    }

    // Prepare response with IDs and names
    const productsWithIdsAndNames = products.map(product => ({
      id: product._id,
      name: product.name
    }));

    // Send JSON response with products' IDs and names
    res.status(200).json(productsWithIdsAndNames);
  } catch (err) {
    console.error('Error fetching products by IDs:', err);
    res.status(500).send('Error fetching products by IDs');
  }
}

module.exports = {
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsIdsAndNames
}
