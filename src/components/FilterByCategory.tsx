import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  const { dispatch } = useBudget();

  // funcion para manejar el cambio de categoria
  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "add-filter-category",
      payload: { id: event.target.value },
    });
  };

  return (
    <div className="rounded-lg bg-white p-10 shadow-lg">
      <form>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            id="category"
            className="flex-1 rounded-xl bg-slate-200 p-3"
            onChange={handleFilter}
          >
            <option value=""> --Todas las categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
