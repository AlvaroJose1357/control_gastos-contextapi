import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();

  const isExpenseEmpty = useMemo(
    () => state.expenses.length === 0,
    [state.expenses],
  );
  return (
    <div className="mt-10">
      {isExpenseEmpty ? (
        <p className="text-2xl font-bold text-gray-600">No Hay Gastos</p>
      ) : (
        <>
          <p className="my-5 text-2xl font-bold text-gray-600">
            Listado de gastos
          </p>
          {state.expenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
