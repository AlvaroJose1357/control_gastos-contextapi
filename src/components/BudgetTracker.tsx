import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

export default function BudgetTracker() {
  const { state, dispatch, remainingBudget, totalExpenses } = useBudget();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <img src="/public/grafico.jpg" alt="Grafica de gastos" />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <button
          type="button"
          className="w-full rounded-2xl bg-pink-600 p-2 font-bold uppercase text-white"
          onClick={() => dispatch({ type: "place-budget" })}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  );
}
