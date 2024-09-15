import { useMemo } from "react";
import Header from "./components/Header";
import { useBudget } from "./hooks/useBudget";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";

function App() {
  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
  return (
    <>
      <Header />
      <div className="mx-auto mt-10 max-w-3xl rounded-lg p-10 shadow-lg">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="mx-auto max-w-3xl py-10">
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
