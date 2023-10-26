import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CardMedia,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import product1 from './Images/jpeg1.jpeg';
import product2 from './Images/jpeg2.jpeg';
import product3 from './Images/jpeg3.jpg';
import product4 from './Images/jpeg4.jpeg';

const products = [
  { id: 1, name: "iphone 14", price: "139999.00",productImage:product1},
  { id: 2, name: "iphone 15", price: "149999.00",productImage:product2}, 
  { id: 3, name: "handbag", price: "13000.00",productImage:product3},
  { id: 4, name: "oppo", price: "82999.00",productImage:product4}, 
];
const ProductListing=({product})=>{
  // const {name,price,productImage}=product


// const App = () => {
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // const handleAddToCart = (product) => {
  //   setCartItems((prev) => [...prev, product]);
  // };
  
  const handleAddToCart = (product) => {
    // Add the product to the cart with its price
    setCartItems((prev) => [...prev, { ...product, totalPrice: parseFloat(product.price) }]);
  };

  
 const handleBuyNow = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    alert(`Total price: ₹${totalPrice.toFixed(2)}`);
  };


  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };

  // const handleRemoveFromCart = (productToRemove) => {
  //   // Remove the selected product from the cart
  //   setCartItems((prev) => prev.filter((item) => item.id !== productToRemove.id));
  // };


  const handleRemoveFromCart = (productToRemove) => {
    // Find the index of the selected product in the cart
    const productIndex = cartItems.findIndex((item) => item.id === productToRemove.id);
  
    if (productIndex !== -1) {
      // Create a new array by excluding the selected product
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(productIndex, 1);
      setCartItems(updatedCartItems);
    }
  };
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            E-Commerce Website
          </Typography>
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3, maxHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardMedia 
                component="img"
                alt={product.name}
                image={product.productImage}
                style={{height:'250px',width:'300px',objectFit:'cover'}}/>
             

                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    size="small"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    
    

      <Drawer
  anchor="right"
  open={isCartOpen}
  onClose={() => setIsCartOpen(false)}
  PaperProps={{ sx: { width: "400px" } }}>
  <List>
    {cartItems.map((item, index) => (
      <ListItem key={index}>
        <ListItemText primary={item.name} secondary={`Price: ₹${item.totalPrice.toFixed(2)}`} />
      
        <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveFromCart(item)}>
                Remove from Cart
              </Button>

      
      </ListItem>
   ))}
    <ListItem>
      <ListItemText primary="Total Price:" secondary={`₹${getTotalPrice().toFixed(2)}`} />
    </ListItem>
  </List>
  <Button variant="contained" color="primary" onClick={handleBuyNow}>
    Buy Now
  </Button>
</Drawer>     
    </div>
  );
};

export default ProductListing;