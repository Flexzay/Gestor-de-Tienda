
import Sidebar from "../Sidebar";
import CardsDePedidos from "./cardOrdes"; 

export function apk() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-72 w-full p-4 bg-gray-100 min-h-screen">
        <CardsDePedidos />
      </main>
    </div>
  );
}

export default apk;
