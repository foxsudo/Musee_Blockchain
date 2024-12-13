import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ContractABI from '../contracts/ImageStorage.json';

const contractAddress = '0x8c35667364980a939c91c824547124c171a6bfba';

const DisplayImage = () => {
    const [imageData, setImageData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                // Connexion à Web3
                const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
                const contract = new web3.eth.Contract(ContractABI, contractAddress);

                // Vérifier le nombre total d'images
                const imageCount = await contract.methods.imageCount().call();
                console.log("Nombre total d'images :", imageCount);

                if (imageCount < 1) {
                    setErrorMessage("Aucune image trouvée dans le contrat.");
                    return;
                }

                // Récupérer les données pour l'image avec l'ID 1
                const data = await contract.methods.getImage(1).call();
                console.log("Données récupérées :", data);

                // Vérifier les données retournées
                if (!data[0] || !data[1] || !data[2]) {
                    setErrorMessage("Données invalides ou inexistantes pour l'image demandée.");
                    return;
                }

                setImageData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
                setErrorMessage("Une erreur est survenue lors de la récupération des données.");
            }
        };

        fetchImageData();
    }, []);

    return (
        <div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {imageData ? (
                <>
                    <h3>{imageData[1]}</h3> {/* Titre de l'image */}
                    <p>{imageData[2]}</p> {/* Description de l'image */}
                    <img
                        src={`https://gateway.pinata.cloud/ipfs/${imageData[0]}`}
                        alt={imageData[1]}
                        style={{ maxWidth: "100%" }}
                    />
                </>
            ) : (
                !errorMessage && <p>Loading image...</p>
            )}
        </div>
    );
};

export default DisplayImage;
