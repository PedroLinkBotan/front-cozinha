import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Order } from "./types/response";
import 'react-toastify/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function App() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["orders"],
    refetchInterval: 2000,
    queryFn: async () => {
      const response = await fetch("https://localhost:7106/kitchen");
      const data: Order[] = await response.json();
      console.log(data);
      return data;
    },
    staleTime: 1000 * 60,
  });

  async function handleClick(id: number) {
    try {

      const response = await fetch(`https://localhost:7106/kitchen/${id}`, {
        method: 'PUT'
      });

      if(response.status === 200){
        toast.success("Pedido finalizado com sucesso");
        queryClient.invalidateQueries({ queryKey: ["orders"]});

      }else {
        toast.error("Erro ao finalizar pedido")
      }
    }catch{
      toast.error("Erro ao finalizar pedido")
    }
  }

  return (
    <div className="h-screen bg-slate-900">
      <ToastContainer />
      {data &&
        data.map((i) => {
          return (
            <div
              key={i.id}
              className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-6"
            >
              <div className="font-semibold text-xl mb-4">
                <p>
                  Nome do cliente:{" "}
                  <span className="font-normal">{i.client.name}</span>
                </p>
                <p>
                  Numero da mesa:{" "}
                  <span className="font-normal">{i.client.table}</span>
                </p>
              </div>
              <div className="text-lg">
                Pedidos
                <ul className="pr-3 list-none pl-0">
                  {i.orderProducts.map((j, index) => (
                    <li key={j.id} className="py-2 text-gray-300">
                      {index + 1}.{" "}{j.product.name}
                      <button onClick={async () => {await handleClick(j.id)}} className="bg-lime-400 p-4 text-gray-600 ml-3">Finalizar produto</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
