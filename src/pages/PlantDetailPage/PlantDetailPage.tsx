import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ApiClient } from '../../services/api.ts';
import { Plant, Harvest } from '../../types';
import './PlantDetailPage.css';

const PlantDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [harvests, setHarvests] = useState<Harvest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize API client
    const api = new ApiClient('https://cpsc4910sq24.s3.amazonaws.com');

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                setLoading(true);

                // Fetch plant and harvests data in parallel
                const [plantData, harvestsData] = await Promise.all([
                    api.getPlant(Number(id)),
                    api.getHarvests(Number(id))
                ]);

                setPlant(plantData);
                setHarvests(harvestsData || []);
            } catch (err) {
                setError('Error loading plant information. Please try again later.');
                console.error('Error fetching plant data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Helper function to get the correct image URL based on species and cultivar
    const getImageUrl = (species: string, cultivar?: string) => {
        const speciesLower = species.toLowerCase().replace(/\s+/g, '-');

        if (cultivar) {
            const cultivarLower = cultivar.toLowerCase().replace(/\s+/g, '-');

            // Handle specific species + cultivar combinations
            if (speciesLower === 'lettuce' && cultivarLower === 'butter') {
                return 'https://cpsc4910sq24.s3.amazonaws.com/images/butter-lettuce.jpg';
            } else if (speciesLower === 'lettuce' && cultivarLower === 'green-leaf') {
                return 'https://cpsc4910sq24.s3.amazonaws.com/images/green-leaf-lettuce.jpg';
            }
        }

        // Generic species mapping
        switch (speciesLower) {
            case 'arugula':
                return 'https://cpsc4910sq24.s3.amazonaws.com/images/arugula.jpg';
            case 'bell pepper':
                return 'https://cpsc4910sq24.s3.amazonaws.com/images/bell-pepper.jpg';
            case 'strawberry':
                return 'https://cpsc4910sq24.s3.amazonaws.com/images/strawberry.jpg';
            case 'lettuce':
                // Default to green leaf if no specific cultivar match
                return 'https://cpsc4910sq24.s3.amazonaws.com/images/green-leaf-lettuce.jpg';
            default:
                // Fallback image or placeholder
                return 'https://cpsc4910sq24.s3.amazonaws.com/images/arugula.jpg';
        }
    };

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
                    <div className="plant-image-container">
                        <img
                            src={getImageUrl(plant.species, plant.cultivar)}
                            alt={`${plant.name} (${plant.species}${plant.cultivar ? ` - ${plant.cultivar}` : ''})`}
                            className="plant-image"
                        />
                    </div>

                    <div className="plant-details">
                        <p><strong>Species:</strong> {plant.species}</p>
                        {plant.cultivar && <p><strong>Cultivar:</strong> {plant.cultivar}</p>}
                        <p><strong>Life Stage:</strong> {plant.lifeStage}</p>
                        <p><strong>Location:</strong> {plant.location}</p>
                    </div>
                </div>

                <div className="harvests-section">
                    <h2 className="section-title">Harvests</h2>

                    {harvests.length === 0 ? (
                        <p className="plant-empty">No harvests recorded for this plant yet.</p>
                    ) : (
                        <table className="harvests-table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {harvests.map((harvest, index) => (
                                <tr key={harvest.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{harvest.date}</td>
                                    <td>{harvest.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
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

export { PlantDetailPage };