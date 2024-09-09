import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

export default function BudgetTracker() {
  const { dispatch } = useBudget();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/public/grafico.jpg" alt="Grafica de gastos" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="w-full p-2 bg-pink-600 text-white uppercase font-bold rounded-2xl"
          onClick={() => dispatch({ type: "place-budget" })}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={300} />
        <AmountDisplay label="Disponible" amount={200} />
        <AmountDisplay label="Gastado" amount={100} />
      </div>
    </div>
  );
}
