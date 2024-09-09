export type BudgetAction =
  | {
      type: "add-budget";
      payload: { budget: number };
    }
  | {
      type: "place-budget";
    };

export type BudgetState = {
  budget: number;
};

export const initialState: BudgetState = {
  budget: 0,
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetAction
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
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
