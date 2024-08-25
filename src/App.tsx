import BudgetForm from "./components/BudgetForm";
import Header from "./components/Header";

function App() {
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
