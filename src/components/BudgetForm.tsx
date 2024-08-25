import { useMemo, useState } from "react";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
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
  return (
    <form className="space-y-5">
      <div className="flex flex-col space-y">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
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
          className="w-full bg-white border border-gray-200 p-2"
        />
      </div>
      <input
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold p-2 rounded-full uppercase disabled:opacity-30"
        disabled={isValid}
        value={"Definir Presupuesto"}
      />
    </form>
  );
}
