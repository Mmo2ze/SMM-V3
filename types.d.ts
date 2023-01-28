export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}
export type Order = {
    id: number;
    name: string;
    charge: number;
    status: string;
    StartCount: number;
    remain: number;
    quantity: number;
    link: string;
    UserId: number;
    Date: Date;
}

export type Service = {
    id: number;
    name: string;
    serviceId: number;
    sellPrice: number;
    resellPrice: number;
    description: string;
    speed: string;
    min: number;
    max: number;
    quality: string;
    panel: string;
    refill: boolean;
    droprate: string;
}