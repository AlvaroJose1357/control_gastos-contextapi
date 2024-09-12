import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ExpenseForm() {
  return (
    <form className="space-y-5">
      <h1 className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre del Gasto
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          name="expenseName"
          className="bg-slate-200 p-2"
        />
        <label htmlFor="amount" className="text-xl">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade el la cantidad del gasto"
          name="amount"
          className="bg-slate-200 p-2"
        />
        <label htmlFor="amount" className="text-xl">
          Categoria:
        </label>
        <select id="amount" name="amount" className="bg-slate-200 p-2">
          <option value="">Selecciona una categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Fecha del Gasto
        </label>
        <DatePicker className="bg-slate-100 p-2 border-0" />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg uppercase font-bold cursor-pointer w-full"
      >
        Añadir Gasto
      </button>
    </form>
  );
}
