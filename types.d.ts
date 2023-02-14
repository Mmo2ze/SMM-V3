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


export type inputR={
    name :string,
    email : string ,
    password : string ,
    rePassword : string,
}

export type registerR={
    status : boolean,
    error : string
}
export type loginR = {
    isFound:boolean,
    passIsCorrect:boolean
}

