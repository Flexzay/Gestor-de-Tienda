import { useState, useEffect, useCallback } from "react";
import { shopService } from "../../Services/shop.service";
import { environment } from "../../config/environment";
import { StoreData, TimetableItem, Location } from "../../interface/profile"

export function useProfile() {
  const [activeTab, setActiveTab] = useState("info");
  const [storeData, setStoreData] = useState<StoreData>({
    name: "",
    phone: "",
    whatsapp: "",
    location: "",
    description: "",
    hours: "",
    mainImage: null,
    avatarImage: null,
    deliveryFee: "",
    minOrderValue: "",
    ownDelivery: false,
    latitud: "",
    longitud: "",
    timetable: []
  });

  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [avatarImagePreview, setAvatarImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [defaultLocation] = useState<Location>({ lat: 2.5686, lng: -72.6406 });

  const formatTimetable = useCallback((timetable: TimetableItem[]): string => {
    if (!timetable || !Array.isArray(timetable)) return "";
    return timetable.map(time => `${time.day}: ${time.open} - ${time.close}`).join(", ");
  }, []);

  const loadShopData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await shopService.getShop();
      if (response.data?.data) {
        const shop = response.data.data;
        const newStoreData: StoreData = {
          name: shop.name || "",
          phone: shop.phone || "",
          whatsapp: shop.whatsapp || "",
          location: shop.location || "",
          description: shop.description || "",
          hours: formatTimetable(shop.timetable || []),
          mainImage: shop.media?.front?.path || null,
          avatarImage: shop.media?.avatar?.path || null,
          deliveryFee: shop.val_own_delivery || "",
          minOrderValue: shop.val_min_bills || "",
          ownDelivery: shop.own_delivery || false,
          latitud: shop.latitud || "",
          longitud: shop.longitud || "",
          timetable: shop.timetable || []
        };

        setStoreData(newStoreData);

        if (shop.media?.front?.path) {
          setMainImagePreview(`${environment.s3Storage}${shop.media.front.path}`);
        }
        if (shop.media?.avatar?.path) {
          setAvatarImagePreview(`${environment.s3Storage}${shop.media.avatar.path}`);
        }
      }
    } catch (error) {
      console.error("Error loading shop data:", error);
      setSaveMessage("Error al cargar los datos de la tienda");
    } finally {
      setIsLoading(false);
    }
  }, [formatTimetable]);

  useEffect(() => {
    loadShopData();
  }, [loadShopData]);

  const updateStoreData = useCallback((field: keyof StoreData, value: any) => {
    setStoreData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const saveProfile = useCallback(async () => {
    setIsLoading(true);
    setSaveMessage("");
    
    try {
      // Guardar datos generales
      await shopService.updateShop({
        name: storeData.name,
        description: storeData.description,
        phone: storeData.phone,
        whatsapp: storeData.whatsapp,
        latitud: storeData.latitud,
        longitud: storeData.longitud,
        timetable: storeData.timetable
      });

      // Guardar configuración de delivery
      await shopService.updateDeliverySettings({
        own_delivery: storeData.ownDelivery,
        val_own_delivery: storeData.deliveryFee,
        val_min_bills: storeData.minOrderValue
      });

      // Guardar imágenes si hay nuevas (File objects)
      if (storeData.mainImage instanceof File) {
        const formData = new FormData();
        formData.append('image', storeData.mainImage);
        await shopService.updateImageShop('front', formData);
      }

      if (storeData.avatarImage instanceof File) {
        const formData = new FormData();
        formData.append('image', storeData.avatarImage);
        await shopService.updateImageShop('avatar', formData);
      }

      setSaveMessage("Perfil guardado correctamente");
      await loadShopData();
    } catch (error) {
      console.error("Error saving shop data:", error);
      setSaveMessage("Error al guardar los cambios");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveMessage(""), 3000);
    }
  }, [storeData, loadShopData]);

  return {
    activeTab,
    setActiveTab,
    storeData,
    updateStoreData,
    mainImagePreview,
    avatarImagePreview,
    setMainImagePreview,
    setAvatarImagePreview,
    isLoading,
    saveMessage,
    saveProfile,
    defaultLocation
  };
}