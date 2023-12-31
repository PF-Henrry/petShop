import { useEffect, useState } from "react";
import "./Filter.css";
import { useProductStore } from "@/hooks/usePages";

export default function Filter({ handleOnChange, handleOnClick }) {
  const { setProducts, setDataId, getDataId } = useProductStore();
  const [inputs, setInputs] = useState();
  const [data, setData] = useState();

  // la primera vez que se renderiza el componente.
  useEffect(() => {
    fetch("api/infoids")
      .then((data) => data.json())
      .then((data) => {
        setData({ category: data.category, species: data.specie });
      });
  }, []);

  return (
    <div className="filter-container flex flex-col bg-white">
      <h2 style={{ fontSize: "20px" }} className="p-2">
        Filtrar por:
      </h2>
      <div className="font-bold text-xl">Animal</div>
      <select
        onChange={(e) => handleOnChange(e)}
        name="species"
        className="mb-2 p-3"
      >
        {data?.species.length &&
          data.species.map((specie) => {
            return (
              <option key={specie?._id} value={specie?._id}>
                {specie?.name}
              </option>
            );
          })}
      </select>
      <div className="font-bold text-xl">Categoría</div>
      <select
        onChange={(e) => handleOnChange(e)}
        name="category"
        className="mb-2 p-3"
      >
        {data?.category.length &&
          data.category.map((c) => {
            return (
              <option key={c?._id} value={c?._id}>
                {c?.name}
              </option>
            );
          })}
      </select>

      <h2 style={{ fontSize: "20px" }} className="p-2">
        Ordenar por:{" "}
      </h2>
      <div className="font-bold text-xl">Precio</div>
      <li className="mb-2 p-3">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Mayor precio
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" /> Menor precio
        </label>
      </li>
      <button onClick={handleOnClick}>Filtrar</button>
    </div>
  );
}
