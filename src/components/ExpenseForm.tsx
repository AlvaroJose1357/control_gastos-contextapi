import { ChangeEvent, useState } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const EXPENSEINITIAL = {
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  };
  const [expense, setExpense] = useState<DraftExpense>(EXPENSEINITIAL);
  const [error, setError] = useState("");
  const { dispatch } = useBudget();

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const hangleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validar el formulario si los campos estan vacios
    if (
      Object.values(expense).includes("") ||
      Object.values(expense).includes(0)
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }
    // Agregar el gasto
    dispatch({ type: "add-expense", payload: { expense } });
    // Limpiar el formulario y reiniciar el state
    setExpense(EXPENSEINITIAL);
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h1 className="border-b-4 border-blue-500 py-2 text-center text-2xl font-black uppercase">
        Nuevo Gasto
      </h1>
      {/* este es pasandole el error como prop */}
      {/* {error && <ErrorMessage error={error} />} */}
      {/* este es pasandole el error como children el cual es mas limpio y se puede usar en cualquier componente esto con el fin de que tambien pueda renderizar componentes y si algo poderle pasar diferentes mensajes de error*/}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre del Gasto
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          name="expenseName"
          value={expense.expenseName}
          onChange={hangleChange}
          className="bg-slate-200 p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade el la cantidad del gasto"
          name="amount"
          value={expense.amount}
          onChange={hangleChange}
          className="bg-slate-200 p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          name="category"
          className="bg-slate-200 p-2"
          value={expense.category}
          onChange={hangleChange}
        >
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
        <DatePicker
          className="border-0 bg-slate-100 p-2"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-lg bg-blue-500 p-2 font-bold uppercase text-white"
      >
        Añadir Gasto
      </button>
    </form>
  );
}
