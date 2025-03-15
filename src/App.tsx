import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './contexts/api-context.tsx';
import { PlantListPage } from './pages/PlantListPage';
import { PlantDetailPage } from './pages/PlantDetailPage';
import './styles/styles.css';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Plant Palace</h1>
            </header>

            <main className="app-content">
                <ApiProvider baseUrl="https://cpsc4910sq24.s3.amazonaws.com">
                    <Router>
                        <Routes>
                            <Route path="/" element={<PlantListPage />} />
                            <Route path="/plant/:id" element={<PlantDetailPage />} />
                        </Routes>
                    </Router>
                </ApiProvider>
            </main>

            <footer className="app-footer">
                <p>&copy; {new Date().getFullYear()} Plant Palace - Track your plants and harvests</p>
            </footer>
        </div>
    );
}

export default App;