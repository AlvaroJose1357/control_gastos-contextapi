import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.category === state.currentCategory,
      )
    : state.expenses;

  const isExpenseEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses],
  );
  return (
    <div className="mt-10 rounded-lg bg-white p-10 shadow-lg">
      {isExpenseEmpty ? (
        <p className="text-2xl font-bold text-gray-600">No Hay Gastos</p>
      ) : (
        <>
          <p className="my-5 text-2xl font-bold text-gray-600">
            Listado de gastos
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
