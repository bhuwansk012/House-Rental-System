import api from './api';

export const getPublicData = async () => {
    try 
    {
        const response = await api.get('/all');
        return response.data;
        // console.log('Public data fetched successfully:', response.data);
    } 
    catch (error) 
    {
        console.error('Error fetching public data:', error);
        throw error;
    }   
};

