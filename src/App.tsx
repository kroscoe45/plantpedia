import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlantListPage } from './pages/PlantListPage';
import { PlantDetailPage } from './pages/PlantDetailPage';
import './styles/styles.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PlantListPage />} />
                <Route path="/plant/:id" element={<PlantDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;