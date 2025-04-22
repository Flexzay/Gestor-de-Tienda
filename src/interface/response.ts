export interface Response {
    title: string;
    message: string;
    state: {
        id:number;
        status : number;
        label:string;
    };
    bill : number;
    vouchers?: any[];
}
