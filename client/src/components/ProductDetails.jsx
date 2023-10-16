import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { Box,Button, Typography } from "@mui/material";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch product details based on productId when the component mounts
    axios
      .get(`https://react-ecom-kl1t.onrender.com/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  return (
    <Box style={{ marginLeft: "1rem", marginRight: "1rem", padding: "1rem" }}>
       <Grid container spacing={3} justifyContent="space-between">
      <Grid item xs={6}>
        <h1>Product Details</h1>
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
        <Button variant="outlined"  onClick={() => navigate('/')}  >Back</Button>
      </Grid>
    </Grid>
    
    {product ? (
      <Grid container spacing={3}>
        <Grid item xs={6} display="flex" justifyContent="center" >
           
            <img style={{ width: "60%", height: "80%" }} src={product.image} alt={product.title} />
            
        </Grid>
        <Grid item xs={6}>
           
            <h2>{product.title}</h2>
           
            
            <Typography>{product.detail}</Typography>
            
           
            <h1>Price: {product.price} $</h1>
            
        </Grid>
      </Grid>
    ) : (
      <p>Loading product details...</p>
    )}
    
  </Box>
   
    
  );
};

export default ProductDetails;
