// Este es el componente ErrorMessage usando props para poder mostrar el error
// type ErrorMessageProps = {
//   error: string;
// };
// export default function ErrorMessage({ error }: ErrorMessageProps) {
//   return (
//     <>
//       <div className="rounded-lg bg-red-500 p-2 text-center text-sm font-bold text-white">
//         {error}
//       </div>
//     </>
//   );
// }
// Este es el componente ErrorMessage usando children para poder mostrar el error en cualquier componente esto con el fin de que tambien pueda renderizar otros componentes y si algo poderle pasar diferentes mensajes de error
type ErrorMessageProps = {
  children: React.ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="rounded-lg bg-red-600 p-2 text-center text-sm font-bold text-white">
      {children}
    </p>
  );
}
