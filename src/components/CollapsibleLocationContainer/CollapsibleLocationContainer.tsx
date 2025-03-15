import { Plant } from '../../types';
import { PlantCard } from '../PlantCard/PlantCard';
import './CollapsibleLocationContainer.css';

interface CollapsibleLocationContainerProps {
    location: string;
    plants: Plant[];
}

export const CollapsibleLocationContainer = ({ location, plants }: CollapsibleLocationContainerProps) => {
    return (
        <details open className="location-section">
            <summary className="location-name">{location}</summary>
            <div className="plant-grid">
                {plants && plants.length > 0 ? (
                    plants.map(plant => (
                        <PlantCard key={plant.id} plant={plant} />
                    ))
                ) : (
                    <p className="plant-empty">No plants in this location.</p>
                )}
            </div>
        </details>
    );
};