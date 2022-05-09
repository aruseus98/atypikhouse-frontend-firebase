export interface Lodgings {

    id: number;
    owner: string;
    category: {
        type: string
    };
    name: string;
    rate: string;
    description: string;
    address: string;
    lodgingValues: [];
    media: [];
    reservations: [];

}
