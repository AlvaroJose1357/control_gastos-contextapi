import { useContext } from "react";
import BudgetForm from "./components/BudgetForm";
import Header from "./components/Header";
import { BudgetContext } from "./context/BuggetContext";

function App() {
  const context = useContext(BudgetContext);
  console.log(context);
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm />
      </div>
    </>
  );
}

export default App;
