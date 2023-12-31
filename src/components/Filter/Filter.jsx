import "./Filter.css";

export default function Filter() {
  return (
    <div className="filter-container flex flex-col bg-white">
      <h2 style={{ fontSize: "20px" }} className="p-2">
        Filtrar por:
      </h2>
      <div className="font-bold text-xl">Animal</div>
      <select id="Specie" className="mb-2 p-3">
        <option value={gatoId}>Gato</option>
        <option value={perroId}>Perro</option>
        <option value={otrosId}>Otros</option>
      </select>
      <div className="font-bold text-xl">Categoría</div>
      <select id="Category" className="mb-2 p-3">
        <option value={accesorioCategoryId}>Accesorios</option>
        <option value={alimentoCategoryId}>Alimento</option>
        <option value={higieneSaludCategoryId}>Salud e Higiene</option>
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
      <button onClick={handleChange}>Filtrar</button>
    </div>
  );
}
