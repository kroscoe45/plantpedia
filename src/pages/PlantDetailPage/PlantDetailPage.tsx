import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../../contexts/api-context.tsx';
import { Plant, Harvest } from '../../types';
import { Card, CardHeader, CardBody } from '../../components/Card/Card';
import { HarvestTable } from '../../components/HarvestTable';
import './PlantDetailPage.css';

export const PlantDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [harvests, setHarvests] = useState<Harvest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use API context instead of creating a new instance
    const api = useApi();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                setLoading(true);
                console.log(`Fetching plant with ID: ${id}`);

                // Fetch plant and harvests data in parallel
                const [plantData, harvestsData] = await Promise.all([
                    api.getPlant(Number(id)),
                    api.getHarvests(Number(id))
                ]);

                console.log('Plant data received:', plantData);
                console.log('Harvests data received:', harvestsData);

                setPlant(plantData);
                setHarvests(harvestsData || []);
            } catch (err) {
                console.error('Error fetching plant data:', err);
                setError('Error loading plant information. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, api]);

    if (loading) {
        return <div className="plant-loading">Loading plant information...</div>;
    }

    if (error || !plant) {
        return (
            <div className="plant-error">
                <p>{error || 'Plant not found'}</p>
                <Link to="/">
                    <button className="button">Back to Plants</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="plant-detail-page container">
            <h1 className="plant-name">{plant.name}</h1>

            <div className="plant-content">
                <div className="plant-info">
                    <Card className="plant-detail-card">
                        <CardHeader className="plant-detail-card-header">
                            Plant Information
                        </CardHeader>
                        <CardBody className="plant-detail-card-body">
                            <div className="plant-image-container">
                                <img
                                    src={api.getPlantImageUrl(plant.id)}
                                    alt={`${plant.name} (${plant.species}${plant.cultivar ? ` - ${plant.cultivar}` : ''})`}
                                    className="plant-detail-image"
                                />
                            </div>

                            <div className="plant-details">
                                <p><strong>Species:</strong> {plant.species}</p>
                                {plant.cultivar && <p><strong>Cultivar:</strong> {plant.cultivar}</p>}
                                <p><strong>Life Stage:</strong> {plant.lifeStage}</p>
                                <p><strong>Location:</strong> {plant.location}</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="harvests-section">
                    <HarvestTable harvests={harvests} />
                </div>
            </div>

            <div className="back-link">
                <Link to="/">
                    <button className="button">Back to Plants</button>
                </Link>
            </div>
        </div>
    );
};