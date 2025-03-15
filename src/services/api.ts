import { Plant, Harvest } from '../types';

class ApiClient {
    readonly baseUrl: string;
    private plantImageMap: Map<number, string> = new Map();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    };

    // Get image URL for a plant by ID
    getPlantImageUrl(id: number): string {
        // Check if we already have the image URL for this plant
        if (this.plantImageMap.has(id)) {
            return this.plantImageMap.get(id)!;
        }

        // If we don't have the URL, return a placeholder
        return `${this.baseUrl}/images/placeholder.jpg`;
    }

    plantUrl(id: number): string {
        return this.baseUrl + `/data/plants/${id}.json`;
    }

    plantListUrl(): string {
        return this.baseUrl + `/data/plants.json`;
    }

    harvestsUrl(id: number): string {
        return this.baseUrl + `/data/plants/${id}/harvests.json`;
    }

    // Build image URL from species and cultivar
    private buildImageUrl(species: string, cultivar?: string): string {
        const speciesName = species.toLowerCase().replace(/\s+/g, '-');

        if (cultivar) {
            const cultivarName = cultivar.toLowerCase().replace(/\s+/g, '-');
            return `${this.baseUrl}/images/${speciesName}-${cultivarName}.jpg`;
        }

        return `${this.baseUrl}/images/${speciesName}.jpg`;
    }

    // Return JSON data for all plants and build the image map
// Updated getPlantList method with better error handling and proper TypeScript types
    async getPlantList(): Promise<Plant[]> {
        try {
            const response = await fetch(this.plantListUrl());
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('API response for plant list:', data);

            // Handle different potential response formats with proper type checking
            let plants: Plant[] = [];

            if (Array.isArray(data)) {
                // If API returns an array directly
                plants = data as Plant[];
            } else if (data && typeof data === 'object') {
                // If API returns an object with a 'plants' property that's an array
                if (data.plants && Array.isArray(data.plants)) {
                    plants = data.plants as Plant[];
                }
            }

            // Validate plant objects and filter out invalid ones
            plants = plants.filter(plant =>
                plant &&
                typeof plant === 'object' &&
                'id' in plant &&
                typeof plant.id === 'number'
            );

            console.log(`Found ${plants.length} valid plants in the API response`);

            // Build the image URL map for valid plants
            plants.forEach((plant: Plant) => {
                const imageUrl = this.buildImageUrl(plant.species, plant.cultivar);
                this.plantImageMap.set(plant.id, imageUrl);
            });

            return plants;
        } catch (error) {
            console.error('Error fetching plant list:', error);
            // Rethrow to allow component to handle the error
            throw error;
        }
    }
    // Return JSON data for an individual plant
    async getPlant(id: number): Promise<Plant> {
        try {
            const response = await fetch(this.plantUrl(id));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // The API returns the plant data directly, not wrapped in a "plant" property
            const plantData = await response.json();

            // Add this plant to the image map if it's not already there
            if (plantData && !this.plantImageMap.has(plantData.id)) {
                const imageUrl = this.buildImageUrl(plantData.species, plantData.cultivar);
                this.plantImageMap.set(plantData.id, imageUrl);
            }

            return plantData;
        } catch (error) {
            console.error(`Error fetching plant ${id}:`, error);
            throw error;
        }
    }

    // Return JSON data for all harvests for a plant
    async getHarvests(id: number): Promise<Harvest[]> {
        try {
            const response = await fetch(this.harvestsUrl(id));
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.harvests || [];
        } catch (error) {
            console.error(`Error fetching harvests for plant ${id}:`, error);
            return [];
        }
    }
}

export { ApiClient };