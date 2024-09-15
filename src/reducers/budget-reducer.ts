import { v4 as uuidv4 } from "uuid";
import { DraftExpense, Expense } from "../types";
export type BudgetAction =
  | {
      type: "add-budget";
      payload: { budget: number };
    }
  | {
      type: "show-modal";
    }
  | {
      type: "close-modal";
    }
  | {
      type: "add-expense";
      payload: { expense: DraftExpense };
    }
  | {
      type: "place-budget";
    };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};
// Crear un gasto con id unico usando uuid y recibe como parametro un gasto en borrador de tipo DraftExpense sin ID y el cual nos debera de retornar un gasto de tipo Expense con un id unico
const createExpense = (draftExpense: DraftExpense): Expense => {
  // const { expenseName, amount, category, date } = draftExpense;
  // return {
  //   id: uuidv4(),
  //   expenseName,
  //   amount,
  //   category,
  //   date,
  // };
  return {
    id: uuidv4(),
    ...draftExpense,
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetAction,
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
    };
  }
  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }
  if (action.type === "place-budget") {
    return {
      ...state,
      budget: 0,
    };
  }
  return state;
};
