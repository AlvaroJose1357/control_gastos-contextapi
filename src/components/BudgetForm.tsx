import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();
  const hangleChange = (even: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+even.target.value);
  };
  // const handleSubmit = (even: React.FormEvent<HTMLFormElement>) => {
  //   even.preventDefault();
  //   console.log(budget);
  // };
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (even: React.FormEvent<HTMLFormElement>) => {
    even.preventDefault();
    dispatch({ type: "add-budget", payload: { budget } });
    console.log("añadir presupuesto");
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y flex flex-col">
        <label
          htmlFor="budget"
          className="text-center text-4xl font-bold text-blue-600"
        >
          Definir Presupuesto
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          value={budget}
          onChange={hangleChange}
          placeholder="Definir presupuesto"
          className="w-full border border-gray-200 bg-white p-2"
        />
      </div>
      <input
        type="submit"
        className="w-full cursor-pointer rounded-full bg-blue-600 p-2 font-bold uppercase text-white hover:bg-blue-700 disabled:opacity-30"
        disabled={isValid}
        value={"Definir Presupuesto"}
      />
    </form>
  );
}
