import { Link } from 'react-router-dom';
import { Plant } from '../../types';
import { useApi } from '../../contexts/api-context.tsx';
import { Card, CardBody } from '../Card/Card';
import './PlantCard.css';

interface PlantCardProps {
    plant: Plant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
    // Use API context instead of creating a new instance
    const api = useApi();

    return (
        <Card className="plant-card" hoverable>
            <CardBody className="plant-card-content">
                <div className="plant-card-image">
                    <img
                        src={api.getPlantImageUrl(plant.id)}
                        alt={`${plant.name} (${plant.species}${plant.cultivar ? ` - ${plant.cultivar}` : ''})`}
                        className="circle-image"
                    />
                </div>
                <div className="plant-card-info">
                    <h3 className="plant-card-title">{plant.name}</h3>
                    <p><strong>Species:</strong> {plant.species}</p>
                    {plant.cultivar && <p><strong>Cultivar:</strong> {plant.cultivar}</p>}
                    <p><strong>Life Stage:</strong> {plant.lifeStage}</p>
                    <Link to={`/plant/${plant.id}`} className="view-details-link">
                        View Details
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
};