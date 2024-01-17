"use client";

import React, { useEffect, useState } from "react";

import { CssBaseline, Container, Typography, Grid, Paper } from "@mui/material";
import VentasCharts from "../GraficoVentas/VentasCharts";

const DashboardInicio = () => {
  const [numUsersReg, setNumUsersReg] = useState(null);
  const [numProductos, setNumProductos] = useState(null);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    const getCarts = async () => {
      try {
        const response = await fetch("api/users/carts");
        const newCarts = await response.json();
        // console.log(newCarts);
        setTotalVentas(newCarts);
      } catch (error) {
        console.error("Error al obtener usuarios: ", error);
      }
    };

    getCarts();
  }, []);

  // console.log(
  //   totalVentas &&
  //     totalVentas
  //       .filter((item) => item.status === true)
  //       .map((item) => item.items.length)
  // );

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

  const [ventasPorMes, setVentasPorMes] = useState([]);

  useEffect(() => {
    const getVentasPorMes = () => {
      if (!totalVentas) return;

      const carritosConVentas = totalVentas.filter(
        (carrito) => carrito.status === true
      );

      const ventasAgrupadasPorMes = carritosConVentas.reduce((acc, carrito) => {
        const fecha = new Date(carrito.fecha);
        const mes = fecha.getMonth();

        if (!acc[mes]) {
          acc[mes] = 0;
        }
        acc[mes] += carrito.items.length;
        return acc;
      }, {});

      const fechaUltimoCarrito = carritosConVentas.reduce(
        (maxFecha, carrito) => {
          const fechaCarrito = new Date(carrito.fecha);
          return fechaCarrito > maxFecha ? fechaCarrito : maxFecha;
        },
        new Date(0)
      );

      const arrayVentasPorMes = Array.from({ length: 12 }, (_, index) => {
        if (index <= fechaUltimoCarrito.getMonth()) {
          return ventasAgrupadasPorMes[index] || 0;
        }
        return 0;
      });

      setVentasPorMes(arrayVentasPorMes);
    };

    getVentasPorMes();
  }, [totalVentas]);

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
                <Typography variant="h4">
                  {totalVentas === 0
                    ? "Cargando..."
                    : totalVentas
                        .filter((item) => item.status === true)
                        .map((item) => item.items.length)
                        .reduce((a, b) => a + b)}
                </Typography>
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
              <VentasCharts ventasMensuales={ventasPorMes} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardInicio;
