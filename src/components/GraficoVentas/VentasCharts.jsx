import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js/auto";

Chart.register(...registerables);

const VentasCharts = ({ ventasMensuales }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destruir el gráfico existente si ya hay uno
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Crear un nuevo gráfico
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
        datasets: [
          {
            label: "Ventas Mensuales",
            data: ventasMensuales,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
          },
        ],
      },
    });
  }, [ventasMensuales]);

  return <canvas ref={chartRef} />;
};

export default VentasCharts;
