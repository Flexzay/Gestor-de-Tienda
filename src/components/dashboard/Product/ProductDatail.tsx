import { ShoppingCart, CreditCard } from "lucide-react"; 

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;  // Asegúrate de que price sea un número, no un objeto
    category: string;
    imageUrl: string;
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Asegúrate de que el precio es un número
  const price = typeof product.price === "number" ? product.price : parseFloat(product.price);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Imagen del producto */}
          <div className="relative w-full h-96 bg-gray-200 flex items-center justify-center">
            <img
              src={product.imageUrl || "https://via.placeholder.com/600"}
              alt={product.name}
              className="object-cover w-full h-full rounded-l-lg"
            />
          </div>

          {/* Información del producto */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    ${isNaN(price) ? "Precio no disponible" : price.toFixed(2)} {/* Verifica si el precio es un número válido */}
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
              </div>
              <div className="pt-4">
                <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition">
                <ShoppingCart size={20} />
                Añadir al carrito
              </button>
              <button className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 border border-red-500 text-red-500 font-bold rounded-lg shadow hover:bg-red-500 hover:text-white transition">
                <CreditCard size={20} />
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
