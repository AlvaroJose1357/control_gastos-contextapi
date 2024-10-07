import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";

export default function BudgetTracker() {
  const { state, dispatch, remainingBudget, totalExpenses } = useBudget();
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2); // se calcula el porcentaje de gastos con maximo de 2 decimales

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% Gastado`}
          styles={buildStyles({
            textSize: "10px", // tamaño del texto
            //textColor: "#000", // color del texto
            textColor: percentage >= 90 ? "#ff0000" : "#000", // color del texto segun el porcentaje
            // pathColor: "#3b82f6", // color de la barra
            pathColor:
              percentage > 90
                ? "#ff0000"
                : percentage > 70
                  ? "#fcff00"
                  : "#3b82f6", // color de la barra segun el porcentaje
            trailColor: "#d6d6d6", // color de lo que falta por llenar
          })}
        />
        {/* <img src="/public/grafico.jpg" alt="Grafica de gastos" /> */}
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
