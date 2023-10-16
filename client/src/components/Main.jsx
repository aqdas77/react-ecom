import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { CardActionArea, CardActions } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Main = () => {
  const [products, setProducts] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState(null);
  const [data, setData] = useState({
    image: "",
    title: "",
    detail: "",
    price: 0,
  });

  const fetchProducts = () => {
    axios
      .get("https://react-ecom-kl1t.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const url = "https://react-ecom-kl1t.onrender.com/api/products";
      const res = await axios.post(url, data);

      if (res.status === 201) {
        setIsFormOpen(false);
        alert("Product added successfully");
        // Refresh the task list
        setData({
          image: "",
          title: "",
          detail: "",
          price: 0,
        });
        fetchProducts();
      } else {
        alert("Failed to add product. Please check your input.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const openForm = () => {
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedProductToDelete) return;

    try {
      const url = `https://react-ecom-kl1t.onrender.com/api/products/${selectedProductToDelete._id}`;
      const res = await axios.delete(url);

      if (res.status === 200) {
        alert("Product deleted successfully");
        // Refresh the Product list
        fetchProducts();
        setSelectedProductToDelete(null);
      } else {
        alert("Failed to delete Product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };
  const selectProductForDeletion = (product) => {
    setSelectedProductToDelete(product);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Box style={{ marginLeft: "1rem", marginRight: "1rem", padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button
            variant="outlined"
            style={{ margin: "0.5rem" }}
            onClick={sortProducts}
          >
            Sort
          </Button>
          <Button
            variant="outlined"
            style={{ margin: "0.5rem" }}
            onClick={openForm}
          >
            Add Item
          </Button>
        </Grid>
        <Grid item xs={12}>
          <h1>Products</h1>

          <Grid container spacing={2}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        style={{
                          width: "45%",
                          height: "180px",
                          paddingLeft: "28%",
                          paddingTop: "10%",
                        }}
                        image={product.image}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title.length > 18
                            ? `${product.title.substring(0, 18)}...`
                            : product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.detail.length > 60
                            ? `${product.detail.substring(0, 60)}...`
                            : product.detail}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ marginTop: "10px" }}
                        >
                          {product.price} $
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        variant="outlined"
                        style={{ margin: "0.5rem" }}
                        component={Link}
                        to={`/details/${product._id}`}
                      >
                        Details
                      </Button>
                      <Button
                        variant="outlined"
                        style={{ margin: "0.5rem" }}
                        onClick={(e) => {
                          e.preventDefault();
                          selectProductForDeletion(product);
                          handleDelete();
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Container sx={{ marginTop: 2 }}>
                No products available...
              </Container>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={isFormOpen} onClose={closeForm}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Image</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                placeholder="Image URL..."
                fullWidth
                variant="outlined"
                name="image"
                value={data.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Heading</InputLabel>
              <TextField
                multiline
                rows={1}
                placeholder="Title..."
                style={{ width: "100%" }}
                name="title"
                value={data.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Description</InputLabel>
              <TextField
                multiline
                rows={3}
                placeholder="Description..."
                style={{ width: "100%" }}
                name="detail"
                value={data.detail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Price</InputLabel>
              <TextField
                multiline
                rows={1}
                placeholder="Price..."
                style={{ width: "100%" }}
                name="price"
                value={data.price}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeForm} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleAdd} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Main;
