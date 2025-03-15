import { Plant } from '../../types';
import PlantCard from './PlantCard';

interface LocationSectionProps {
    location: string;
    plants: Plant[];
}

const LocationSection = ({ location, plants }: LocationSectionProps) => {
    return (
        <details open className="location-section">
            <summary className="location-name">{location}</summary>
            <div className="plant-grid">
                {plants.map(plant => (
                    <PlantCard key={plant.id} plant={plant} />
                ))}
            </div>
        </details>
    );
};

export default LocationSection;