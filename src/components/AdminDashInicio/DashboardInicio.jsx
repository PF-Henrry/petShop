"use client";

import React, { useEffect, useState } from "react";

import { CssBaseline, Container, Typography, Grid, Paper } from "@mui/material";
import VentasCharts from "../GraficoVentas/VentasCharts";

const ventasMensualesHardcodeadas = [
  1500, 1200, 2000, 1800, 2500, 2200, 1900, 2800, 3200, 3000, 3500, 4000,
];

const DashboardInicio = () => {
  const [numUsersReg, setNumUsersReg] = useState(null);
  const [numProductos, setNumProductos] = useState(null);

  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      try {
        const response = await fetch("api/users");
        const data = await response.json();
        setNumUsersReg(data.length);

        const responseProducts = await fetch("api/products");
        const dataProducts = await responseProducts.json();
        setNumProductos(dataProducts.length);
      } catch (error) {
        console.error("Error al obtener usuarios: ", error);
      }
    };
    fetchUsersAndProducts();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "86vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                style={{ padding: "20px", textAlign: "center", width: "80%" }}
              >
                <Typography variant="h6" gutterBottom>
                  Ventas totales
                </Typography>
                <Typography variant="h4"> 1000</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                style={{ padding: "20px", textAlign: "center", width: "80%" }}
              >
                <Typography variant="h6" gutterBottom>
                  Usuarios registrados
                </Typography>
                <Typography variant="h4">
                  {numUsersReg !== null ? numUsersReg : "Cargando..."}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                style={{ padding: "23px", textAlign: "center", width: "80%" }}
              >
                <Typography variant="h6">Productos disponibles</Typography>
                <Typography variant="h4">
                  {numProductos !== null ? numProductos : "Cargando..."}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={12} md={11}>
            <Paper
              elevation={3}
              style={{ padding: "20px", textAlign: "center" }}
            >
              <Typography variant="h6" gutterBottom>
                Ventas Mensuales
              </Typography>
              <VentasCharts ventasMensuales={ventasMensualesHardcodeadas} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardInicio;
