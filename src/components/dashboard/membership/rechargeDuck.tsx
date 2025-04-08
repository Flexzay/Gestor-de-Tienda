import type React from "react"
import { useState, useRef } from "react"
import { DollarSign, Plus, Minus, Upload, X, ImageIcon } from "lucide-react"

interface RecargarCreditosProps {
  creditosSeleccionados: number;
  setCreditosSeleccionados: (creditos: number) => void;
  onRecargar: (comprobante: File | null) => void;
}


export function RecargarCreditos({
  creditosSeleccionados,
  setCreditosSeleccionados,
  onRecargar,
}: RecargarCreditosProps) {
  const [comprobante, setComprobante] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setComprobante(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleRemoveFile = () => {
    setComprobante(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRecargar = () => {
    if (comprobante) {
      onRecargar(comprobante);
    } else {
      alert("Por favor sube un comprobante antes de continuar.");
    }
  };
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-3">
        <DollarSign className="h-6 w-6 text-rose-500" />
        <h2 className="text-xl font-semibold text-gray-800">Recargar Créditos</h2>
      </div>

      <div className="mt-6">
        <label htmlFor="creditos" className="block text-sm font-medium text-gray-700">
          Selecciona el número de créditos a recargar
        </label>

        <div className="mt-2 flex items-center">
          <button
            onClick={() => setCreditosSeleccionados(Math.max(50000, creditosSeleccionados - 10000))}
            className="rounded-l-md border border-gray-300 bg-gray-50 p-2 text-gray-500 hover:bg-gray-100"
          >
            <Minus className="h-5 w-5" />
          </button>

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
            className="w-full border-y border-gray-300 p-2 text-center text-lg"
          />

          <button
            onClick={() => setCreditosSeleccionados(creditosSeleccionados + 10000)}
            className="rounded-r-md border border-gray-300 bg-gray-50 p-2 text-gray-500 hover:bg-gray-100"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[50000, 60000, 70000, 80000].map((cantidad) => (
            <button
              key={cantidad}
              onClick={() => setCreditosSeleccionados(cantidad)}
              className={`rounded-md border p-2 text-center ${
                creditosSeleccionados === cantidad
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cantidad}
            </button>
          ))}
        </div>
      </div>

      {/* Sección para subir comprobante */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="h-5 w-5 text-rose-500" />
          <h3 className="text-lg font-medium text-gray-800">Comprobante de Pago</h3>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Por favor sube una imagen del comprobante de tu pago para procesar la recarga.
        </p>

        {!previewUrl ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-700">Haz clic para seleccionar imagen</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG o JPEG (máx. 5MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Comprobante de pago"
                className="w-full h-auto max-h-64 object-contain"
              />
              <button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {comprobante?.name} (
              {(comprobante?.size || 0) / 1024 < 1024
                ? `${Math.round((comprobante?.size || 0) / 1024)} KB`
                : `${Math.round(((comprobante?.size || 0) / 1024 / 1024) * 10) / 10} MB`}
              )
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <button onClick={handleRecargar} className="w-full rounded-md bg-rose-600 py-2 text-white hover:bg-rose-700">
          Recargar Ahora
        </button>
      </div>
    </div>
  )
}

