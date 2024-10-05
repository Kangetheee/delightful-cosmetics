import axios from 'axios';
import base64 from 'base-64';

const getAccessToken = async () => {
    const consumerKey = process.env.CONSUMER_KEY; // Your Consumer Key
    const consumerSecret = process.env.CONSUMER_SECRET; // Your Consumer Secret

    const auth = base64.encode(`${consumerKey}:${consumerSecret}`);
    
    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${auth}`,
            }
        });
        return response.data.access_token; // This is your ACCESS_TOKEN
    } catch (error) {
        console.error('Error generating access token:', error.response.data);
    }
};

getAccessToken();
