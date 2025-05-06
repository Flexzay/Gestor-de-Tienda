export interface TimetableItem {
    day: string;
    open: string;
    close: string;
}

export interface StoreData {
    id?: string;
    name: string;
    phone: string;
    whatsapp: string;
    location: string;
    description: string;
    hours: string;
    mainImage: File | string | null;
    avatarImage: File | string | null;
    deliveryFee: string;
    minOrderValue: string;
    ownDelivery: boolean;
    latitud: string;
    longitud: string;
    timetable: TimetableItem[];
}

export interface StorePreviewProps {
    storeData: Partial<StoreData>;
    mainImagePreview: string | null;
    avatarImagePreview: string | null;
}

export interface StoreImagesProps {
    mainImagePreview: string | null;
    avatarImagePreview: string | null;
    setMainImagePreview: (url: string | null) => void;
    setAvatarImagePreview: (url: string | null) => void;
    updateStoreData: (field: keyof StoreData, value: any) => void;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface StoreInfoProps {
    storeData: Partial<StoreData>;
    updateStoreData: (field: keyof StoreData, value: any) => void;
}

// Añade esta nueva interfaz para OrderConfig
export interface OrderConfigProps {
    storeData: Partial<StoreData>;
    updateStoreData: (field: keyof StoreData, value: any) => void;
}