import { useEffect, useMemo } from "react";
import Header from "./components/Header";
import { useBudget } from "./hooks/useBudget";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state]);
  return (
    <>
      <Header />
      <div className="mx-auto mt-10 max-w-3xl rounded-lg p-10 shadow-lg">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="mx-auto max-w-3xl py-10">
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
