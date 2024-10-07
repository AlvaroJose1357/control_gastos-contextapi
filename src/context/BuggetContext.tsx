import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import {
  BudgetAction,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

// definimos los props que tendra el context
type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetAction>;
  totalExpenses: number;
  remainingBudget: number;
};

type BudgetProviderProps = {
  // el reactNode es cualquier cosa que se pueda renderizar en react
  children: ReactNode;
};

// creamos el context que viene de BudgetContextProps y le pasamos un objeto vacio, se coloca el null! para que no de error o tambien se coloca {} as BudgetContextProps
export const BudgetContext = createContext<BudgetContextProps>(null!);

// creamos el provider que contendra el estado y el dispatch, es de donde vienen los datos
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  // esta variable me permite sumar todos los gastos
  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses],
  );
  // esta variable me permite mirar cuanto me queda disponible
  const remainingBudget = state.budget - totalExpenses;
  // como el context y el provider no se encuentran conectados, hacemos que el provider retorne el context como componente para que se pueda utilizar en la aplicacion
  // para que tambien tengamos el state y el dispatch disponibles
  return (
    // el value es el objeto que se va a pasar a traves del context, y como context espera el state y el dispatch, se pasa un objeto con esos valores
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, remainingBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
