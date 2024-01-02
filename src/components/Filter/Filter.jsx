import { useEffect, useState } from "react";
import "./Filter.css";
import { useProductStore } from "@/hooks/usePages";
import { Funnel } from "@phosphor-icons/react/dist/ssr";

export default function Filter({ handleOnChange, handleOnClick }) {
  const { setProducts, setDataId, getDataId, resetFilters } = useProductStore();
  const [inputs, setInputs] = useState();
  const [data, setData] = useState();
  const [hovered, setHovered] = useState(false);

  // la primera vez que se renderiza el componente.
  useEffect(() => {
    fetch("api/infoids")
      .then((data) => data.json())
      .then((data) => {
        setData({
          category: data.category,
          species: data.specie,
          brand: data.brand,
        });
      });
  }, []);

  const handleHover = () => {
    setHovered(true);
  };

  const handleUnHover = () => {
    setHovered(false);
  };

  const handleResetFilters = () => {
    resetFilters();
    handleOnClick(); 
  };

  return (
    <div className="filters-container">
      <section className="filters-by-container">
        <h2 className="filters-title">Filtrar por:</h2>

        <span>
          <p className="filter-title-select">Especie</p>
          <select onChange={(e) => handleOnChange(e)} name="species">
            {data?.species.length &&
              data.species.map((specie) => {
                return (
                  <option key={specie?._id} value={specie?._id}>
                    {specie?.name}
                  </option>
                );
              })}
          </select>
        </span>

        <span>
          <p className="filter-title-select">Categoría</p>
          <select onChange={(e) => handleOnChange(e)} name="category">
            {data?.category.length &&
              data.category.map((c) => {
                return (
                  <option key={c?._id} value={c?._id}>
                    {c?.name}
                  </option>
                );
              })}
          </select>
        </span>

        <span>
          <p className="filter-title-select">Marcas</p>
          <select onChange={(e) => handleOnChange(e)} name="brand">
            {data?.brand?.length &&
              data.brand.map((brand) => {
                return (
                  <option key={brand?._id} value={brand?._id}>
                    {brand?.name}
                  </option>
                );
              })}
          </select>
        </span>
      </section>

      <figure className="w-full border border-[#DABEB6]"></figure>

      <section className="filters-sort-container">
        <h2 className="sort-title">Ordenar por:</h2>

        <span>
          <p className="sort-title-select">Precio</p>
          <select name="price-sort" id="price-sort">
            <option value="desc">Mayor precio</option>
            <option value="asc">Menor precio</option>
          </select>
        </span>
      </section>
      <button
        onClick={handleOnClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleUnHover}
        className="btn-filter"
      >
        Filtrar
        <Funnel
          size={20}
          className="icon-filter"
          weight={hovered ? "fill" : "regular"}
        />
      </button>
      <button onClick={handleResetFilters}  className=" bg-red-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Resetear Filtros
      </button>
    </div>
  );
}
