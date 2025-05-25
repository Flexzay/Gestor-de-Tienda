import { useState, useEffect } from "react"
import { productService } from "../../Services/product.service"
import type { ProductFormData, ProductImage } from "../../interface/product"

export const useSelectProduct = () => {
  const [products, setProducts] = useState<ProductFormData[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductFormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getProducts()
        const formattedProducts: ProductFormData[] = res.data.map((p: ProductFormData) => ({
          ...p,
          price: Number(p.price) || 0,
          category: p.category ?? { id: p.category_id, name: "Sin categoría" },
        }))

        setProducts(formattedProducts)
        setFilteredProducts(formattedProducts)

        const uniqueCategories = Array.from(
          new Set(
            formattedProducts.map((p) => p.category?.name ?? "Sin categoría")
          )
        ).filter(Boolean)

        setCategories(uniqueCategories)
      } catch (err) {
        console.error("Error al obtener productos:", err)
        setError("No se pudieron cargar los productos.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      )
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(price)

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
  }

  const getImageUrl = (images: ProductFormData["images"]) => {
    const firstImage = images?.[0]
    if (typeof firstImage === "string") return firstImage
    if (firstImage && "url" in firstImage) return (firstImage as ProductImage).url
    return ""
  }

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    categories,
    selectedCategory,
    setSearchTerm,
    setSelectedCategory,
    formatPrice,
    clearFilters,
    getImageUrl
  }
}