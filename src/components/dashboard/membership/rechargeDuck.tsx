import type React from "react"
import { useState, useRef, useEffect } from "react"
import { DollarSign, Plus, Minus, Upload, X, ImageIcon, CheckCircle, AlertCircle } from "lucide-react"

interface RecargarCreditosProps {
  creditosSeleccionados: number
  setCreditosSeleccionados: (creditos: number) => void
  onRecargar: (comprobante: File | null) => void
}

export function RecargarCreditos({
  creditosSeleccionados,
  setCreditosSeleccionados,
  onRecargar,
}: RecargarCreditosProps) {
  const [comprobante, setComprobante] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [animateValue, setAnimateValue] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Formato de moneda colombiana
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  useEffect(() => {
    setAnimateValue(true)
    const timer = setTimeout(() => setAnimateValue(false), 300)
    return () => clearTimeout(timer)
  }, [creditosSeleccionados])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setComprobante(file)
      setShowError(false)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleRemoveFile = () => {
    setComprobante(null)
    setPreviewUrl(null)
    setShowError(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRecargar = () => {
    if (comprobante) {
      onRecargar(comprobante)
    } else {
      setShowError(true)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-rose-100 rounded-full">
          <DollarSign className="h-6 w-6 text-rose-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Recargar Créditos</h2>
      </div>

      {/* Selector de créditos */}
      <div className="mt-6 bg-gray-50 p-5 rounded-lg border border-gray-100">
        <label htmlFor="creditos" className="block text-sm font-medium text-gray-700 mb-3">
          Selecciona el número de créditos a recargar
        </label>

        <div className="flex items-center">
          <button
            onClick={() => setCreditosSeleccionados(Math.max(50000, creditosSeleccionados - 10000))}
            className="rounded-l-md border border-gray-300 bg-white p-3 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Disminuir créditos"
          >
            <Minus className="h-5 w-5" />
          </button>

          <div className="relative w-full">
            <input
              type="number"
              id="creditos"
              value={creditosSeleccionados}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (value >= 50000) {
                  setCreditosSeleccionados(value)
                }
              }}
              className={`w-full border-y border-gray-300 p-3 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent ${
                animateValue ? "bg-rose-50 text-rose-700" : "bg-white text-gray-800"
              } transition-all duration-300`}
              min="50000"
              step="10000"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">créditos</div>
          </div>

          <button
            onClick={() => setCreditosSeleccionados(creditosSeleccionados + 10000)}
            className="rounded-r-md border border-gray-300 bg-white p-3 text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Aumentar créditos"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[50000, 100000, 150000, 200000].map((cantidad) => (
            <button
              key={cantidad}
              onClick={() => setCreditosSeleccionados(cantidad)}
              className={`rounded-md border p-3 text-center transition-all duration-200 ${
                creditosSeleccionados === cantidad
                  ? "border-rose-500 bg-rose-50 text-rose-700 font-medium shadow-sm"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cantidad.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center bg-white p-3 rounded-md border border-gray-200">
          <span className="text-gray-700">Valor a pagar:</span>
          <span
            className={`font-bold text-lg ${
              animateValue ? "text-rose-600 scale-110" : "text-gray-800"
            } transition-all duration-300`}
          >
            {formatCurrency(creditosSeleccionados)}
          </span>
        </div>
      </div>

      {/* Comprobante */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-1.5 bg-rose-100 rounded-full">
            <Upload className="h-5 w-5 text-rose-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Comprobante de Pago</h3>
        </div>

        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-md mb-5">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              El comprobante debe reflejar el valor exacto de{" "}
              <span className="font-medium">{formatCurrency(creditosSeleccionados)}</span>. Adjunta la imagen de tu
              transferencia o pago.
            </p>
          </div>
        </div>

        {!previewUrl ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
              showError
                ? "border-red-500 bg-red-50"
                : isHovering
                  ? "border-rose-400 bg-rose-50"
                  : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className={`mx-auto mb-4 rounded-full p-3 inline-flex ${
                showError ? "bg-red-100" : isHovering ? "bg-rose-100" : "bg-gray-100"
              }`}
            >
              <ImageIcon
                className={`h-8 w-8 ${showError ? "text-red-500" : isHovering ? "text-rose-500" : "text-gray-400"}`}
              />
            </div>
            <p className="text-sm font-medium text-gray-700">
              {isHovering ? "Seleccionar comprobante" : "Haz clic para seleccionar imagen"}
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG o JPEG (máx. 5MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
            {showError && (
              <div className="mt-3 flex items-center justify-center text-sm text-red-600 font-medium">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Debes subir un comprobante antes de continuar</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Comprobante de pago"
                className="w-full h-auto max-h-64 object-contain"
              />
              <button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors duration-200"
                aria-label="Eliminar imagen"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <p className="text-sm text-gray-600 truncate max-w-[200px]">{comprobante?.name}</p>
              </div>
              <p className="text-xs text-gray-500">
                {(comprobante?.size || 0) / 1024 < 1024
                  ? `${Math.round((comprobante?.size || 0) / 1024)} KB`
                  : `${Math.round(((comprobante?.size || 0) / 1024 / 1024) * 10) / 10} MB`}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={handleRecargar}
          className="w-full rounded-md bg-rose-600 py-3 px-4 text-white font-medium hover:bg-rose-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <DollarSign className="h-5 w-5" />
          <span>Recargar {formatCurrency(creditosSeleccionados)}</span>
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        Al hacer clic en "Recargar Ahora", confirmas que has realizado el pago correspondiente.
      </div>
    </div>
  )
}
