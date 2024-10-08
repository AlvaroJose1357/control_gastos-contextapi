import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { id, expenseName, amount } = expense;
  const { dispatch } = useBudget();
  const categoryInfo = useMemo(
    // el filter me devuelve un array con un solo elemento por eso el [0]
    // la otra forma es con find que me devuelve el objeto directamente sin necesidad de poner [0] ya que find me devuelve el objeto que cumple con la condiciones que le pase, lo unico que debo tener en cuenta es que si no encuentra el objeto me devolvera undefined por eso el ! al final
    () =>
      /*categories.filter((cate) => cate.id === expense.category)[0]*/ categories.find(
        (cate) => cate.id === expense.category,
      )!,
    [expense],
  );

  // funciones del swipeable
  // En esta accion lo colocamos en una Arrow function con {} (cuerpo con bloque) (Debe de tener un return)
  const leadingActions = () => {
    return (
      <LeadingActions>
        <SwipeAction
          onClick={() =>
            dispatch({ type: "get-expense-by-id", payload: { id: id } })
          }
        >
          Actualizar
        </SwipeAction>
      </LeadingActions>
    );
  };
  // En esta accion lo colocamos en una Arrow function con () (retorno implícito) (No necesita un return)
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: id } })
        }
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="flex w-full items-center gap-5 border-b border-gray-500 bg-white p-10 shadow-lg">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="icono gasto"
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p className="text-xl font-bold text-gray-600">{expenseName}</p>
            <p className="text-lg text-slate-600">
              {/* lo que me dice ! es que el valor que evalua si o si nosotros sabemos que va a existirrs */}
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
