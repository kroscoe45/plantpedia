import { useState, useEffect } from 'react';
import { useApi } from '../../contexts/api-context.tsx';
import { Plant } from '../../types';
import { CollapsibleLocationContainer } from '../../components/CollapsibleLocationContainer';
import './PlantListPage.css';

export const PlantListPage = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use API context instead of creating a new instance
    const api = useApi();

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                setLoading(true);
                const plantList = await api.getPlantList();
                setPlants(plantList || []);
            } catch (err) {
                setError('Error loading plants. Please try again later.');
                console.error('Error fetching plant list:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlants();
    }, [api]);

    // Group plants by location
    const groupPlantsByLocation = (plants: Plant[]): Record<string, Plant[]> => {
        if (!plants || plants.length === 0) {
            return {};
        }

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
        <div className="plant-list-page container">
            {Object.keys(plantsByLocation).length === 0 ? (
                <p className="plant-empty">No plants found.</p>
            ) : (
                Object.entries(plantsByLocation).map(([location, locationPlants]) => (
                    <CollapsibleLocationContainer
                        key={location}
                        location={location}
                        plants={locationPlants}
                    />
                ))
            )}
        </div>
    );
};