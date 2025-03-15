import { Harvest } from '../../types';
import { Card, CardHeader, CardBody } from '../Card/Card';
import './HarvestTable.css';

interface HarvestTableProps {
    harvests: Harvest[];
}

export const HarvestTable = ({ harvests }: HarvestTableProps) => {
    return (
        <Card className="harvest-card">
            <CardHeader className="harvest-card-header">
                Harvest History
            </CardHeader>
            <CardBody className="harvest-card-body">
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
            </CardBody>
        </Card>
    );
};