'use client'
import { useEffect, useState } from "react";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import Loader from "@/components/Loader/Loader";
import Ordenes from "@/components/Ordenes/Ordenes"; // Asegúrate de tener la ruta correcta

const SalesPage = () => {
  const [totalVentas, setTotalVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("all");

  const getCarts = async () => {
    try {
      const response = await fetch("../api/users/carts");
      const newCarts = await response.json();
      setTotalVentas(newCarts);
    } catch (error) {
      console.error("Error al obtener ventas: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (cartId, nuevoEstado) => {
    try {
      console.log("Cambiando estado para el cartId:", cartId);
  
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sendStatus: nuevoEstado }),
      };
  
      const response = await fetch(`../api/users/carts/${cartId}`, requestOptions);
  
      console.log("Respuesta del servidor:", response);
  
      if (response.ok) {
        console.log("Estado cambiado con éxito");
        // Actualiza directamente el estado local con el nuevo estado
        setTotalVentas((prevVentas) =>
          prevVentas.map((venta) =>
            venta._id === cartId ? { ...venta, sendStatus: nuevoEstado } : venta
          )
        );
      } else {
        console.error("Error al cambiar el estado de la venta");
  
        const errorData = await response.json();
        console.error("Detalles del error:", errorData);
      }
    } catch (error) {
      console.error("Error al cambiar el estado de la venta: ", error);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <LayoutAdmin>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1>Lista de Ventas</h1>
            <div>
              <label>Filtrar por Estado:</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="enviado">Enviado</option>
              </select>
            </div>

            <section className="flex flex-col gap-5">
              {totalVentas
                .filter((item) => {
                  if (filtroEstado === "all") return true;
                  return item.sendStatus === filtroEstado;
                })
                .map((item) => (
                  <div
                    key={item._id}
                    className="p-10 bg-white rounded-lg shadow-md"
                  >
                    <p>Order ID: {item.orderID}</p>
                    <p>Cart ID: {item._id}</p>
                    <p>Estado Actual: {item.sendStatus}</p>
                    <div>
                      <label>Seleccionar Nuevo Estado:</label>
                      <select
                        value={item.nuevoEstado || ""}
                        onChange={(e) => {
                          const newEstado = e.target.value;
                          // Actualiza directamente el nuevoEstado en totalVentas
                          setTotalVentas((prevVentas) => {
                            const updatedVentas = prevVentas.map((venta) => {
                              if (venta._id === item._id) {
                                return { ...venta, nuevoEstado: newEstado };
                              }
                              return venta;
                            });
                            return updatedVentas;
                          });
                        }}
                      >
                        <option value="">Seleccione...</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="enviado">Enviado</option>
                      </select>
                    </div>
                    <button onClick={() => handleStatusChange(item._id, item.nuevoEstado)}>
                      Cambiar Estado
                    </button>
                  </div>
                ))}
            </section>

            {/* Pasa handleStatusChange como prop a Ordenes */}
            <Ordenes id={id} handleStatusChange={handleStatusChange} />
          </>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default SalesPage;


