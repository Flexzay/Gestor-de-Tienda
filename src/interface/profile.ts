export interface Timetable {
    day: string;
    open: string;
    close: string;
}

export interface StoreData {
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
    timetable: Timetable[];
}

export interface StorePreviewProps {
    storeData: StoreData;
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