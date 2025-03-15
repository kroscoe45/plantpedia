import React, { createContext, useContext, ReactNode } from 'react';
import { ApiClient } from '../services/api';

// Create the context
const ApiContext = createContext<ApiClient | undefined>(undefined);

// Props for the ApiProvider component
interface ApiProviderProps {
    baseUrl: string;
    children: ReactNode;
}

// Provider component that will wrap the app
export const ApiProvider: React.FC<ApiProviderProps> = ({ baseUrl, children }) => {
    // Create a single instance of ApiClient
    const apiClient = React.useMemo(() => new ApiClient(baseUrl), [baseUrl]);

    return (
        <ApiContext.Provider value={apiClient}>
            {children}
        </ApiContext.Provider>
    );
};

// Custom hook to use the API context
export const useApi = (): ApiClient => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};