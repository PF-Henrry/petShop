import { useEffect, useState } from "react";
import "./Filter.css";
import { useProductStore } from "@/hooks/usePages";
import { Funnel, TrashSimple } from "@phosphor-icons/react/dist/ssr";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { CaretDown } from "@phosphor-icons/react";

export default function Filter({ handleOnChange, handleOnClick }) {
  const {
    setProducts,
    setDataId,
    getDataId,
    resetFilters,
    setSortOrder,
    sortProducts,
    sortOrder,
  } = useProductStore();
  const [inputs, setInputs] = useState();
  const [data, setData] = useState();
  const [isFilterIconHovered, setFilterIconHovered] = useState(false);
  const [isClearIconHovered, setClearIconHovered] = useState(false);

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

  const handleFilterIconHover = () => {
    setFilterIconHovered(true);
  };

  const handleFilterIconUnHover = () => {
    setFilterIconHovered(false);
  };

  const handleClearIconHover = () => {
    setClearIconHovered(true);
  };

  const handleClearIconUnHover = () => {
    setClearIconHovered(false);
  };

  const handleResetFilters = () => {
    resetFilters();
    handleOnClick();
  };

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    sortProducts();
  };

  return (
    <div className="filters-container">
      <div className="filters-container-visibility">
        <section className="select-filters-container">
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

          <figure className="w-full border border-[#DABEB6]"></figure>

          <h2 className="filters-title">Ordenar por:</h2>

          <span>
            <p className="filter-title-select">Precio</p>
            <select
              id="price-sort"
              onChange={handleSortChange}
              value={sortOrder}
            >
              <option value="desc">Mayor precio</option>
              <option value="asc">Menor precio</option>
            </select>
          </span>
        </section>

        <span className="buttons-container">
          <button
            onClick={handleOnClick}
            onMouseEnter={handleFilterIconHover}
            onMouseLeave={handleFilterIconUnHover}
            className="btn-filter"
          >
            Filtrar
            <Funnel
              size={20}
              className="icon-filter"
              weight={isFilterIconHovered ? "fill" : "regular"}
            />
          </button>
          <button
            onClick={handleResetFilters}
            onMouseEnter={handleClearIconHover}
            onMouseLeave={handleClearIconUnHover}
            className="btn-reset-filters"
          >
            Limpiar Filtros
            <TrashSimple
              size={20}
              className="icon-clear-filters"
              weight={isClearIconHovered ? "fill" : "regular"}
            />
          </button>
        </span>
      </div>

      <Accordion className="filters-container-accordion duration-0 hidden">
        <AccordionSummary
          expandIcon={<CaretDown size={20} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="duration-0"
        >
          <Typography>Filtros:</Typography>
        </AccordionSummary>
        <AccordionDetails className="filters-container-accordion-details">
          <section className="select-filters-container">
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

            <figure className="w-full border border-[#DABEB6]"></figure>

            <h2 className="filters-title">Ordenar por:</h2>

            <span>
              <p className="filter-title-select">Precio</p>
              <select id="price-sort">
                <option value="desc">Mayor precio</option>
                <option value="asc">Menor precio</option>
              </select>
            </span>
          </section>

          <span className="buttons-container">
            <button
              onClick={handleOnClick}
              onMouseEnter={handleFilterIconHover}
              onMouseLeave={handleFilterIconUnHover}
              className="btn-filter"
            >
              Filtrar
              <Funnel
                size={20}
                className="icon-filter"
                weight={isFilterIconHovered ? "fill" : "regular"}
              />
            </button>
            <button
              onClick={handleResetFilters}
              onMouseEnter={handleClearIconHover}
              onMouseLeave={handleClearIconUnHover}
              className="btn-reset-filters"
            >
              Limpiar Filtros
              <TrashSimple
                size={20}
                className="icon-clear-filters"
                weight={isClearIconHovered ? "fill" : "regular"}
              />
            </button>
          </span>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
