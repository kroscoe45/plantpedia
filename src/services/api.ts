import { Plant, Harvest } from '../types';

class ApiClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    };

    plantImageURL(id: string): string {
        return this.baseUrl + `/data/plants/${id}.json`;
    }

    private plantUrl(id: number): string {
        return this.baseUrl + `/data/plants/${id}.json`;
    }

    private plantListUrl(): string {
        return this.baseUrl + `/data/plants.json`;
    }

    private harvestsUrl(id: number): string {
        return this.baseUrl + `/data/plants/${id}/harvests.json`;
    }

    // return JSON data for all plants
    async getPlantList(): Promise<Plant[]> {
        return fetch(this.plantListUrl())
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.plants);
    }

    // return JSON data for an individual plant
    async getPlant(id: number): Promise<Plant> {
        return fetch(this.plantUrl(id))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.plant);
    }

    // return JSON data for all harvests for a plant
    async getHarvests(id: number): Promise<Harvest[]> {
        return fetch(this.harvestsUrl(id))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.harvests);
    }

    // return JSON data for an individual harvest
    // idk if we will need this
    async getHarvest(id: number): Promise<Harvest> {
        return fetch(this.harvestsUrl(id))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.harvest);
    }
}

export { ApiClient }
