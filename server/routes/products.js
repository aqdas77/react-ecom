const router = require("express").Router();
const { Product } = require("../models/product");

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }

    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { price, detail, title, image } = req.body;
    if (!price || !detail || !title || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Create a new Product using Product model
    const product = new Product(req.body);

    // Save the task to the database
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

router.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by ID and remove it
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    // Handle errors, e.g., database errors or server errors
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const products = await Product.findById(productId);
    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }

    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
