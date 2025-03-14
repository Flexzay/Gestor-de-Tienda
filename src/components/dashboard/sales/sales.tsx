
import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Trash2,
  Search,
  ShoppingCart,
  Package,
  BarChart2,
  DollarSign,
  Printer,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import  Product from "../../../interface/product";
import type { CartItem, Sale } from "../../../interface/sales"


export function Sales() {
  // Estados principales
  const [activeTab, setActiveTab] = useState<"newSale" | "history">("newSale")
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Laptop HP Pavilion",
      description: 'Laptop HP Pavilion 15.6", 8GB RAM, 512GB SSD',
      price: 899.99,
      stock: 15,
      category: "Electrónica",
      sku: "LAP-HP-001",
      barcode: "789012345678",
      cost: 750,
      taxRate: 19,
      isActive: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: 'Monitor LG 24"',
      description: 'Monitor LG 24" Full HD IPS',
      price: 199.99,
      stock: 25,
      category: "Electrónica",
      sku: "MON-LG-001",
      barcode: "789012345679",
      cost: 150,
      taxRate: 19,
      isActive: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Teclado Mecánico Logitech",
      description: "Teclado mecánico Logitech RGB",
      price: 89.99,
      stock: 30,
      category: "Accesorios",
      sku: "TEC-LOG-001",
      barcode: "789012345680",
      cost: 60,
      taxRate: 19,
      isActive: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Mouse Inalámbrico",
      description: "Mouse inalámbrico ergonómico",
      price: 29.99,
      stock: 50,
      category: "Accesorios",
      sku: "MOU-ERG-001",
      barcode: "789012345681",
      cost: 15,
      taxRate: 19,
      isActive: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Auriculares Bluetooth",
      description: "Auriculares Bluetooth con cancelación de ruido",
      price: 149.99,
      stock: 20,
      category: "Audio",
      sku: "AUR-BT-001",
      barcode: "789012345682",
      cost: 100,
      taxRate: 19,
      isActive: true,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Empresa ABC",
      email: "contacto@empresaabc.com",
      address: "Calle Principal 123, Ciudad",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Corporación XYZ",
      email: "finanzas@xyz.com",
      address: "Avenida Central 456, Ciudad",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Cliente Particular",
      email: "cliente@mail.com",
      address: "Calle Residencial 789, Ciudad",
      phone: "555-123-4567",
    },
  ])

  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      saleNumber: "VTA-001",
      client: clients[0],
      items: [
        {
          id: 1,
          product: products[0],
          quantity: 2,
          unitPrice: 899.99,
          discount: 0,
          total: 1799.98,
        },
        {
          id: 2,
          product: products[1],
          quantity: 2,
          unitPrice: 199.99,
          discount: 0,
          total: 399.98,
        },
      ],
      subtotal: 2199.96,
      tax: 417.99,
      discount: 0,
      total: 2617.95,
      paymentMethod: "Tarjeta de Crédito",
      paymentStatus: "paid",
      date: "2023-05-01",
      seller: "Vendedor 1",
      invoiceGenerated: true,
    },
    {
      id: 2,
      saleNumber: "VTA-002",
      client: clients[1],
      items: [
        {
          id: 1,
          product: products[2],
          quantity: 5,
          unitPrice: 89.99,
          discount: 0,
          total: 449.95,
        },
      ],
      subtotal: 449.95,
      tax: 85.49,
      discount: 0,
      total: 535.44,
      paymentMethod: "Transferencia Bancaria",
      paymentStatus: "pending",
      date: "2023-05-05",
      seller: "Vendedor 2",
      invoiceGenerated: false,
    },
  ])

  // Estados para la nueva venta
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [paymentMethod, setPaymentMethod] = useState<string>("efectivo")
  const [globalDiscount, setGlobalDiscount] = useState<number>(0)
  const [notes, setNotes] = useState<string>("")
  const [barcodeInput, setBarcodeInput] = useState<string>("")
  const barcodeInputRef = useRef<HTMLInputElement>(null)
  const [showClientSelector, setShowClientSelector] = useState<boolean>(false)
  const [clientSearchTerm, setClientSearchTerm] = useState<string>("")
  const [filteredClients, setFilteredClients] = useState<Client[]>(clients)

  // Estados para el historial de ventas
  const [salesSearchTerm, setSalesSearchTerm] = useState<string>("")
  const [salesDateFilter, setSalesDateFilter] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  })
  const [salesStatusFilter, setSalesStatusFilter] = useState<string>("all")
  const [filteredSales, setFilteredSales] = useState<Sale[]>(sales)
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [viewingSale, setViewingSale] = useState<Sale | null>(null)

  // Obtener categorías únicas
  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))]

  // Efecto para filtrar productos
  useEffect(() => {
    let result = products

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.barcode && product.barcode.includes(searchTerm)),
      )
    }

    // Filtrar por categoría
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter)
    }

    // Solo productos activos y con stock
    result = result.filter((product) => product.isActive && product.stock > 0)

    setFilteredProducts(result)
  }, [products, searchTerm, categoryFilter])

  // Efecto para filtrar clientes
  useEffect(() => {
    if (clientSearchTerm) {
      const result = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()),
      )
      setFilteredClients(result)
    } else {
      setFilteredClients(clients)
    }
  }, [clients, clientSearchTerm])

  // Efecto para filtrar ventas
  useEffect(() => {
    let result = sales

    // Filtrar por término de búsqueda
    if (salesSearchTerm) {
      result = result.filter(
        (sale) =>
          sale.saleNumber.toLowerCase().includes(salesSearchTerm.toLowerCase()) ||
          sale.client.name.toLowerCase().includes(salesSearchTerm.toLowerCase()),
      )
    }

    // Filtrar por fechas
    if (salesDateFilter.start) {
      result = result.filter((sale) => new Date(sale.date) >= new Date(salesDateFilter.start))
    }

    if (salesDateFilter.end) {
      result = result.filter((sale) => new Date(sale.date) <= new Date(salesDateFilter.end))
    }

    // Filtrar por estado
    if (salesStatusFilter !== "all") {
      result = result.filter((sale) => sale.paymentStatus === salesStatusFilter)
    }

    // Ordenar
    result = [...result].sort((a, b) => {
      if (sortField === "total") {
        return sortDirection === "asc" ? a.total - b.total : b.total - a.total
      } else if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })

    setFilteredSales(result)
  }, [sales, salesSearchTerm, salesDateFilter, salesStatusFilter, sortField, sortDirection])

  // Función para añadir producto al carrito
  const addToCart = (product: Product) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find((item) => item.product.id === product.id)

    if (existingItem) {
      // Si ya existe, incrementar la cantidad
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: (item.quantity + 1) * (item.unitPrice - item.discount),
                }
              : item,
          ),
        )
      } else {
        alert(`No hay suficiente stock de ${product.name}`)
      }
    } else {
      // Si no existe, añadir nuevo item
      const newItem: CartItem = {
        id: Date.now(),
        product,
        quantity: 1,
        unitPrice: product.price,
        discount: 0,
        total: product.price,
      }

      setCart([...cart, newItem])
    }
  }

  // Función para buscar producto por código de barras
  const searchByBarcode = () => {
    if (!barcodeInput) return

    const product = products.find((p) => p.barcode === barcodeInput)

    if (product) {
      addToCart(product)
      setBarcodeInput("")
    } else {
      alert("Producto no encontrado")
    }

    // Enfocar nuevamente el input
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus()
    }
  }

  // Función para actualizar cantidad en el carrito
  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    const item = cart.find((item) => item.id === itemId)

    if (!item) return

    if (quantity > item.product.stock) {
      alert(`No hay suficiente stock de ${item.product.name}`)
      return
    }

    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart(
      cart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              total: quantity * (item.unitPrice - item.discount),
            }
          : item,
      ),
    )
  }

  // Función para actualizar descuento en el carrito
  const updateCartItemDiscount = (itemId: number, discount: number) => {
    if (discount < 0) return

    const item = cart.find((item) => item.id === itemId)

    if (!item) return

    if (discount > item.unitPrice) {
      alert("El descuento no puede ser mayor que el precio unitario")
      return
    }

    setCart(
      cart.map((item) =>
        item.id === itemId
          ? {
              ...item,
              discount,
              total: item.quantity * (item.unitPrice - discount),
            }
          : item,
      ),
    )
  }

  // Función para eliminar producto del carrito
  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([])
    setSelectedClient(null)
    setGlobalDiscount(0)
    setNotes("")
  }

  // Cálculos para el carrito
  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTax = () => {
    return cart.reduce((sum, item) => {
      const itemSubtotal = item.total
      const taxRate = item.product.taxRate / 100
      return sum + itemSubtotal * taxRate
    }, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax()
    return subtotal + tax - globalDiscount
  }

  // Función para completar la venta
  const completeSale = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío")
      return
    }

    if (!selectedClient) {
      alert("Debe seleccionar un cliente")
      return
    }

    // Generar número de venta
    const saleNumber = `VTA-${(sales.length + 1).toString().padStart(3, "0")}`

    const newSale: Sale = {
      id: Date.now(),
      saleNumber,
      client: selectedClient,
      items: cart,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      discount: globalDiscount,
      total: calculateTotal(),
      paymentMethod,
      paymentStatus: "paid",
      date: new Date().toISOString().split("T")[0],
      seller: "Vendedor Actual", // Esto podría venir de un contexto de autenticación
      notes,
      invoiceGenerated: false,
    }

    // Actualizar stock de productos
    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.product.id === product.id)
      if (cartItem) {
        return {
          ...product,
          stock: product.stock - cartItem.quantity,
        }
      }
      return product
    })

    setSales([...sales, newSale])
    setProducts(updatedProducts)

    // Limpiar el carrito y otros estados
    clearCart()

    // Mostrar mensaje de éxito
    alert(`Venta ${saleNumber} completada con éxito`)
  }

  // Función para generar factura
  const generateInvoice = (sale: Sale) => {
    // Aquí iría la lógica para generar la factura
    // Por ahora, solo actualizamos el estado
    setSales(sales.map((s) => (s.id === sale.id ? { ...s, invoiceGenerated: true } : s)))

    alert(`Factura generada para la venta ${sale.saleNumber}`)
  }

  // Función para imprimir recibo
  const printReceipt = (sale: Sale) => {
    alert(`Imprimiendo recibo para la venta ${sale.saleNumber}`)
    // Aquí iría la lógica para imprimir
  }

  // Renderizado condicional para las pestañas
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-gray-600 hover:text-[#ff204e] transition-colors duration-300"
        >
          <ArrowLeft size={24} className="mr-2" />
          <span className="font-medium">Volver al Dashboard</span>
        </Link>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Sistema de Ventas</h2>

      {/* Pestañas */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === "newSale" ? "text-[#ff204e] border-b-2 border-[#ff204e]" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("newSale")}
        >
          <ShoppingCart size={18} className="inline mr-2" />
          Nueva Venta
        </button>
        <button
          className={`py-4 px-6 font-medium text-sm focus:outline-none ${
            activeTab === "history" ? "text-[#ff204e] border-b-2 border-[#ff204e]" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          <BarChart2 size={18} className="inline mr-2" />
          Historial de Ventas
        </button>
      </div>

      {activeTab === "newSale" ? (
        // Pestaña de Nueva Venta
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Catálogo de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <Package size={20} className="mr-2 text-[#ff204e]" />
                Catálogo de Productos
              </h3>

              {/* Búsqueda y filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "Todas las categorías" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Escáner de código de barras */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                  <input
                    ref={barcodeInputRef}
                    type="text"
                    placeholder="Escanear código de barras..."
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        searchByBarcode()
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                  />
                </div>
                <button
                  onClick={searchByBarcode}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300"
                >
                  Buscar
                </button>
              </div>

              {/* Lista de productos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <div className="flex items-center mb-2">
                        <img
                          src={product.image || "/placeholder.svg?height=80&width=80"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.sku}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[#ff204e]">${product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{product.category}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product)
                          }}
                          className="text-xs bg-[#ff204e] text-white px-2 py-1 rounded-md hover:bg-[#ff3b60] transition-colors"
                        >
                          Añadir
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredProducts.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No se encontraron productos que coincidan con la búsqueda
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha: Carrito y detalles de venta */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <ShoppingCart size={20} className="mr-2 text-[#ff204e]" />
                Carrito de Compra
              </h3>

              {/* Selección de cliente */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Cliente</label>
                  <button
                    onClick={() => setShowClientSelector(!showClientSelector)}
                    className="text-xs text-[#ff204e] hover:text-[#ff3b60]"
                  >
                    {showClientSelector ? "Cerrar" : "Seleccionar"}
                  </button>
                </div>

                {selectedClient ? (
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{selectedClient.name}</p>
                      <p className="text-xs text-gray-500">{selectedClient.email}</p>
                    </div>
                    <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-red-500">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm p-2 bg-gray-50 rounded-md">Ningún cliente seleccionado</div>
                )}

                {showClientSelector && (
                  <div className="mt-2 border border-gray-200 rounded-md p-2">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        placeholder="Buscar cliente..."
                        value={clientSearchTerm}
                        onChange={(e) => setClientSearchTerm(e.target.value)}
                        className="w-full px-3 py-1 pl-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    </div>

                    <div className="max-h-40 overflow-y-auto">
                      {filteredClients.map((client) => (
                        <div
                          key={client.id}
                          className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                          onClick={() => {
                            setSelectedClient(client)
                            setShowClientSelector(false)
                          }}
                        >
                          <p className="font-medium">{client.name}</p>
                          <p className="text-xs text-gray-500">{client.email}</p>
                        </div>
                      ))}

                      {filteredClients.length === 0 && (
                        <p className="text-center text-gray-500 text-sm py-2">No se encontraron clientes</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de productos en el carrito */}
              <div className="mb-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">El carrito está vacío</div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex flex-col p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                            <p className="text-xs text-gray-500">{item.product.sku}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Cantidad</label>
                            <div className="flex">
                              <button
                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                className="px-2 bg-gray-200 rounded-l-md"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                max={item.product.stock}
                                value={item.quantity}
                                onChange={(e) => updateCartItemQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                className="w-full text-center border-y border-gray-200 focus:outline-none"
                              />
                              <button
                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                className="px-2 bg-gray-200 rounded-r-md"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Precio</label>
                            <input
                              type="text"
                              value={`$${item.unitPrice.toFixed(2)}`}
                              disabled
                              className="w-full px-2 py-1 bg-gray-100 border border-gray-200 rounded-md"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Descuento</label>
                            <input
                              type="number"
                              min="0"
                              max={item.unitPrice}
                              value={item.discount}
                              onChange={(e) => updateCartItemDiscount(item.id, Number.parseFloat(e.target.value) || 0)}
                              className="w-full px-2 py-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff204e]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">Subtotal:</span>
                          <span className="font-semibold">${item.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Resumen y totales */}
              {cart.length > 0 && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600">Impuestos:</span>
                    <span className="font-semibold">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 items-center">
                    <span className="text-gray-600">Descuento global:</span>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max={calculateSubtotal()}
                        value={globalDiscount}
                        onChange={(e) => setGlobalDiscount(Number.parseFloat(e.target.value) || 0)}
                        className="w-20 px-2 py-1 border border-gray-200 rounded-md text-right focus:outline-none focus:ring-1 focus:ring-[#ff204e]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-200 mt-2">
                    <span>Total:</span>
                    <span className="text-[#ff204e]">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Método de pago */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              {/* Notas */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                  placeholder="Añadir notas a la venta..."
                ></textarea>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={completeSale}
                  disabled={cart.length === 0 || !selectedClient}
                  className={`w-full py-3 rounded-md flex items-center justify-center ${
                    cart.length === 0 || !selectedClient
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#ff204e] text-white hover:bg-[#ff3b60]"
                  } transition-colors duration-300`}
                >
                  <DollarSign size={20} className="mr-2" />
                  Completar Venta
                </button>

                <button
                  onClick={clearCart}
                  disabled={cart.length === 0}
                  className={`w-full py-2 rounded-md ${
                    cart.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  } transition-colors duration-300`}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : viewingSale ? (
        // Vista detallada de la venta
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Venta #{viewingSale.saleNumber}</h3>
            <button onClick={() => setViewingSale(null)} className="text-gray-500 hover:text-[#ff204e]">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Información de la Venta</h4>
              <p className="text-gray-600">
                Fecha: <span className="font-medium">{viewingSale.date}</span>
              </p>
              <p className="text-gray-600">
                Vendedor: <span className="font-medium">{viewingSale.seller}</span>
              </p>
              <p className="text-gray-600">
                Método de Pago: <span className="font-medium">{viewingSale.paymentMethod}</span>
              </p>
              <p className="text-gray-600">
                Estado:
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    viewingSale.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : viewingSale.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {viewingSale.paymentStatus === "paid"
                    ? "Pagado"
                    : viewingSale.paymentStatus === "pending"
                      ? "Pendiente"
                      : "Pago Parcial"}
                </span>
              </p>
              <p className="text-gray-600">
                Factura:
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    viewingSale.invoiceGenerated ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {viewingSale.invoiceGenerated ? "Generada" : "No Generada"}
                </span>
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Cliente</h4>
              <p className="text-gray-600">{viewingSale.client.name}</p>
              <p className="text-gray-600">{viewingSale.client.address}</p>
              <p className="text-gray-600">{viewingSale.client.email}</p>
              <p className="text-gray-600">{viewingSale.client.phone}</p>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200 mb-8">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Precio Unitario
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descuento
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {viewingSale.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md"
                          src={item.product.image || "/placeholder.svg?height=40&width=40"}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                        <div className="text-sm text-gray-500">{item.product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${item.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${item.discount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    ${item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${viewingSale.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Impuestos:</span>
                <span className="font-semibold">${viewingSale.tax.toFixed(2)}</span>
              </div>
              {viewingSale.discount > 0 && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Descuento:</span>
                  <span className="font-semibold">-${viewingSale.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total:</span>
                <span>${viewingSale.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {viewingSale.notes && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Notas</h4>
              <p className="text-gray-600">{viewingSale.notes}</p>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => printReceipt(viewingSale)}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center shadow-sm"
            >
              <Printer size={20} className="mr-2" />
              Imprimir Recibo
            </button>

            {!viewingSale.invoiceGenerated && (
              <button
                onClick={() => generateInvoice(viewingSale)}
                className="px-6 py-3 bg-[#ff204e] text-white rounded-lg hover:bg-[#ff3b60] transition-colors duration-300 flex items-center justify-center shadow-sm"
              >
                <FileText size={20} className="mr-2" />
                Generar Factura
              </button>
            )}
          </div>
        </div>
      ) : (
        // Pestaña de Historial de Ventas
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <BarChart2 size={20} className="mr-2 text-[#ff204e]" />
              Historial de Ventas
            </h3>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Buscar ventas..."
                  value={salesSearchTerm}
                  onChange={(e) => setSalesSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>

              <div className="flex gap-2">
                <input
                  type="date"
                  value={salesDateFilter.start}
                  onChange={(e) => setSalesDateFilter({ ...salesDateFilter, start: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                />
                <span className="self-center">-</span>
                <input
                  type="date"
                  value={salesDateFilter.end}
                  onChange={(e) => setSalesDateFilter({ ...salesDateFilter, end: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff204e] focus:border-[#ff204e]"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setSalesStatusFilter("all")}
                className={`px-4 py-2 rounded-md ${salesStatusFilter === "all" ? "bg-[#ff204e] text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Todas
              </button>
              <button
                onClick={() => setSalesStatusFilter("paid")}
                className={`px-4 py-2 rounded-md ${salesStatusFilter === "paid" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Pagadas
              </button>
              <button
                onClick={() => setSalesStatusFilter("pending")}
                className={`px-4 py-2 rounded-md ${salesStatusFilter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setSalesStatusFilter("partial")}
                className={`px-4 py-2 rounded-md ${salesStatusFilter === "partial" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Pago Parcial
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Venta
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cliente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        if (sortField === "date") {
                          setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                        } else {
                          setSortField("date")
                          setSortDirection("desc")
                        }
                      }}
                    >
                      <div className="flex items-center">
                        Fecha
                        {sortField === "date" &&
                          (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        if (sortField === "total") {
                          setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                        } else {
                          setSortField("total")
                          setSortDirection("desc")
                        }
                      }}
                    >
                      <div className="flex items-center">
                        Total
                        {sortField === "total" &&
                          (sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredSales.map((sale) => (
                      <motion.tr
                        key={sale.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ShoppingCart size={20} className="text-[#ff204e] mr-2" />
                            <span className="text-sm font-medium text-gray-900">{sale.saleNumber}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.client.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${sale.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              sale.paymentStatus === "paid"
                                ? "bg-green-100 text-green-800"
                                : sale.paymentStatus === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {sale.paymentStatus === "paid"
                              ? "Pagado"
                              : sale.paymentStatus === "pending"
                                ? "Pendiente"
                                : "Pago Parcial"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setViewingSale(sale)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => printReceipt(sale)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <Printer size={18} />
                          </button>
                          {!sale.invoiceGenerated && (
                            <button onClick={() => generateInvoice(sale)} className="text-blue-600 hover:text-blue-900">
                              <FileText size={18} />
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {filteredSales.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron ventas que coincidan con los filtros
                </div>
              )}
            </div>
          </div>

          {/* Resumen de ventas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-green-600 flex items-center">
                <DollarSign size={20} className="mr-2" />
                Ventas Totales
              </h3>
              <p className="text-2xl font-bold">${sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">{sales.length} ventas realizadas</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-blue-600 flex items-center">
                <CheckCircle size={20} className="mr-2" />
                Ventas Pagadas
              </h3>
              <p className="text-2xl font-bold">
                $
                {sales
                  .filter((s) => s.paymentStatus === "paid")
                  .reduce((sum, sale) => sum + sale.total, 0)
                  .toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {sales.filter((s) => s.paymentStatus === "paid").length} ventas pagadas
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-yellow-600 flex items-center">
                <Clock size={20} className="mr-2" />
                Ventas Pendientes
              </h3>
              <p className="text-2xl font-bold">
                $
                {sales
                  .filter((s) => s.paymentStatus === "pending")
                  .reduce((sum, sale) => sum + sale.total, 0)
                  .toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {sales.filter((s) => s.paymentStatus === "pending").length} ventas pendientes
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Sales

