import { useState, useEffect } from 'react';
import { ApiClient } from '../api';
import { Plant } from '../domain';
import LocationSection from './LocationSection';
// Using consolidated styles.css

const PlantListPage = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize API client
    const api = new ApiClient('https://cpsc4910sq24.s3.amazonaws.com');

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                setLoading(true);
                const plantList = await api.getPlantList();
                setPlants(plantList);
            } catch (err) {
                setError('Error loading plants. Please try again later.');
                console.error('Error fetching plant list:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlants();
    }, []);

    // Group plants by location
    const groupPlantsByLocation = (plants: Plant[]): Record<string, Plant[]> => {
        return plants.reduce((acc, plant) => {
            const location = plant.location;
            if (!acc[location]) {
                acc[location] = [];
            }
            acc[location].push(plant);
            return acc;
        }, {} as Record<string, Plant[]>);
    };

    if (loading) {
        return <div className="plant-loading">Loading plants...</div>;
    }

    if (error) {
        return <div className="plant-error"><p>{error}</p></div>;
    }

    const plantsByLocation = groupPlantsByLocation(plants);

    return (
        <div className="plant-listing-page container">
            {Object.keys(plantsByLocation).length === 0 ? (
                <p className="plant-empty">No plants found.</p>
            ) : (
                Object.entries(plantsByLocation).map(([location, locationPlants]) => (
                    <LocationSection
                        key={location}
                        location={location}
                        plants={locationPlants}
                    />
                ))
            )}
        </div>
    );
};

export { PlantListPage };