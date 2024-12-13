import axios from 'axios';

const pinataApiKey = '86ca5d0dff29a7539885';
const pinataSecretApiKey = 'fb987dbf136ce7ecd2d7b7c195fe0f69debba2ca8a7e0eee59029e277aad81ce';

export const uploadImageToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const formData = new FormData();
    formData.append('file', file);

    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
        },
    };

    try {
        console.log("Uploating to IPFS to pinata network from .");
        const response = await axios.post(url, formData, options);
        return response.data.IpfsHash;  // Retourne le hash IPFS de l'image
    } catch (error) {
        console.error("Error uploading to IPFS: ", error);
        return null;
    }
};
