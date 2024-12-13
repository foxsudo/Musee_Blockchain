import React, { useState } from 'react';
import Web3 from 'web3';
import { uploadImageToIPFS } from './utils/pinata'; // Fonction pour uploader sur IPFS
import ContractABI from './contracts/ImageStorage.json'; // Assure-toi que l'ABI est correcte

const contractAddress = '0x8c35667364980a939c91c824547124c171a6bfba'; // Adresse de ton contrat déployé sur Ganache

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]); // Liste des images uploadées
    const [loading, setLoading] = useState(false); // Loader state
    const [successMessage, setSuccessMessage] = useState(""); // Message de succès

    // Connexion à Web3 et au contrat
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            setLoading(true); // Afficher le loader
            setSuccessMessage(""); // Réinitialiser le message de succès
            // Upload l'image sur IPFS
            const ipfsHash = await uploadImageToIPFS(file);

            if (ipfsHash) {
                try {
                    // Récupérer les comptes depuis Web3
                    const accounts = await web3.eth.getAccounts();
                    const contract = new web3.eth.Contract(ContractABI, contractAddress);

                    // Appel de la méthode storeImage pour enregistrer l'image sur la blockchain
                    await contract.methods.storeImage(ipfsHash, title, description).send({
                        from: accounts[0],
                        gas: 3000000 // Augmenter cette valeur si nécessaire
                    });

                    // Ajout de l'image à la liste des images pour l'afficher
                    const newImage = {
                        ipfsHash,
                        title,
                        description,
                    };

                    setImages([...images, newImage]); // Ajouter la nouvelle image à la liste

                    // Afficher un message de succès pour l'utilisateur
                    setSuccessMessage(`Image successfully stored with IPFS hash: ${ipfsHash}`);

                } catch (error) {
                    console.error('Error storing image on Ethereum:', error);
                } finally {
                    setLoading(false); // Cacher le loader une fois terminé
                }
            }
        }
    };

    return (
        <div>
            <h2>Start uploading an image</h2>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>

            {/* Affichage du loader */}
            {loading && <div className="loader"></div>}

            {/* Affichage du message de succès */}
            {successMessage && <div className="success-message">{successMessage}</div>}

            {/* Section de galerie d'images */}
            <div className="image-gallery">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div className="image-item" key={index}>
                            <img
                                src={`https://gateway.pinata.cloud/ipfs/${image.ipfsHash}`}
                                alt={image.title}
                                className="gallery-image"
                            />
                            <h3>{image.title}</h3>
                            <p>{image.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No images uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default UploadImage;
