// Storage utility functions for saving and loading dashboard data

const STORAGE_KEY = 'reactflow-dashboard';

export const saveFlowToStorage = (nodes, edges) => {
    try {
        const flowData = {
            nodes,
            edges,
            timestamp: new Date().toISOString(),
            version: '1.0.0',
        };

        const serializedData = JSON.stringify(flowData);
        localStorage.setItem(STORAGE_KEY, serializedData);

        return {
            success: true,
            message: 'Dashboard saved successfully!',
            data: flowData,
        };
    } catch (error) {
        console.error('Error saving dashboard:', error);
        return {
            success: false,
            message: 'Failed to save dashboard. Please try again.',
            error: error.message,
        };
    }
};

export const loadFlowFromStorage = () => {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
            return {
                success: false,
                message: 'No saved dashboard found.',
                data: null,
            };
        }

        const flowData = JSON.parse(savedData);

        // Validate the loaded data structure
        if (!flowData.nodes || !flowData.edges) {
            throw new Error('Invalid dashboard data format');
        }

        return {
            success: true,
            message: 'Dashboard loaded successfully!',
            data: flowData,
        };
    } catch (error) {
        console.error('Error loading dashboard:', error);
        return {
            success: false,
            message: 'Failed to load dashboard. Data might be corrupted.',
            error: error.message,
        };
    }
};

export const clearStorageData = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return {
            success: true,
            message: 'Dashboard data cleared successfully!',
        };
    } catch (error) {
        console.error('Error clearing dashboard data:', error);
        return {
            success: false,
            message: 'Failed to clear dashboard data.',
            error: error.message,
        };
    }
};

export const exportFlowAsJSON = (nodes, edges) => {
    try {
        const flowData = {
            nodes,
            edges,
            timestamp: new Date().toISOString(),
            version: '1.0.0',
        };

        const dataStr = JSON.stringify(flowData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `dashboard-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();

        return {
            success: true,
            message: 'Dashboard exported successfully!',
        };
    } catch (error) {
        console.error('Error exporting dashboard:', error);
        return {
            success: false,
            message: 'Failed to export dashboard.',
            error: error.message,
        };
    }
};

export const importFlowFromJSON = (jsonData) => {
    try {
        const flowData = JSON.parse(jsonData);

        // Validate the imported data structure
        if (!flowData.nodes || !flowData.edges) {
            throw new Error('Invalid dashboard data format');
        }

        return {
            success: true,
            message: 'Dashboard imported successfully!',
            data: flowData,
        };
    } catch (error) {
        console.error('Error importing dashboard:', error);
        return {
            success: false,
            message: 'Failed to import dashboard. Please check the file format.',
            error: error.message,
        };
    }
};