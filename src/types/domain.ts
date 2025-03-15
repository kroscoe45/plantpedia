export interface Plant {
    id: number;
    name: string;
    species: string;
    cultivar?: string;
    lifeStage: string;
    location: string;
}

export interface Harvest {
    id: number;
    date: string;
    quantity: string;
}