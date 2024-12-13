import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ContractABI from './contracts/ImageStorage.json'; // Assure-toi que l'ABI est correcte

const contractAddress = '0x8c35667364980a939c91c824547124c171a6bfba'; // Adresse de ton contrat déployé sur Ganache

const DisplayImage = () => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const fetchImageData = async () => {
            // Connexion à Web3 et au contrat
            const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
            const contract = new web3.eth.Contract(ContractABI, contractAddress);

            try {
                const imageId = 1; // ID de l'image à récupérer (peut être modifié)
                const data = await contract.methods.getImage(imageId).call();
                setImageData(data);
            } catch (error) {
                console.error("Error fetching image data: ", error);
            }
        };

        fetchImageData();
    }, []);

    return (
        <div>
            {imageData ? (
                <>
                    <h3>{imageData[1]}</h3> {/* Titre de l'image */}
                    <p>{imageData[2]}</p> {/* Description de l'image */}
                    <img src={`https://gateway.pinata.cloud/ipfs/${imageData[0]}`} alt="IPFS Image" />
                </>
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default DisplayImage;
