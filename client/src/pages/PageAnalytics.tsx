import React, { useEffect, useState } from "react";
import { Product } from "../adapters/products";
import { Test } from "../adapters/tests";
import Grid from "@mui/material/Grid2";
import Header from "./layouts/Header";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Typography,
} from "@mui/material";
import ScatterCharts from "../hooks/scatter_charts";

const PageAnalytics = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([] as Test[]);
  const [lastUpdated, setLastUpdated] = useState("");

  const [enabledProducts, setEnabledProducts] = useState([] as number[]);

  const fetchProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products: ", error));
  };
  const fetchTests = () => {
    console.log("updating...", enabledProducts);
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}/tests?products_ids=` +
        enabledProducts.join(",")
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data result", data);
        setTests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tests: ", error);
        setLoading(false);
      });
    setLastUpdated(new Date().toLocaleString());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchTests();
  }, [enabledProducts]);

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    setEnabledProducts(products.map((product) => product.id));
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Header refresh={fetchTests} />
      </Grid>
      <Grid size={12}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Be welcome to PureTrace Solutions
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is a dashboard to visualize the tests results of the products
              we offer. You can select the products you want to see the results
              for. Click on the product buttons to enable or disable them.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Open
            </Button>
          </DialogActions>
        </Dialog>
        <Container
          sx={{
            backgroundColor: "#f2eee5",
            border: "10px solid #f2eee5",
            padding: "20px",
            borderRadius: "10px",
          }}
          fixed
        >
          <Grid container spacing={4}>
            <Grid
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ButtonGroup
                size="small"
                fullWidth
                aria-label="Small button group"
                sx={{
                  // if first and last button set border radius to 50px
                  "& > :first-child": {
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                  },
                  "& > :last-child": {
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                  },
                }}
              >
                {products.map((product) => (
                  <Button
                    variant={
                      enabledProducts.includes(product.id)
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => {
                      if (enabledProducts.includes(product.id)) {
                        setEnabledProducts(
                          enabledProducts.filter((p) => p !== product.id)
                        );
                      } else {
                        setEnabledProducts([...enabledProducts, product.id]);
                      }
                    }}
                    key={product.id}
                  >
                    {product.name}
                  </Button>
                ))}
              </ButtonGroup>
            </Grid>
            <Grid size={12}>
              <ScatterCharts data={tests} loading={loading} />
            </Grid>
            <Grid size={12}>
              <Grid
                container
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid>
                  <Typography variant="caption">
                    Total tests: {tests.length}
                  </Typography>
                </Grid>

                <Grid>
                  <Typography variant="caption">
                    last updated at: {lastUpdated}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default PageAnalytics;
