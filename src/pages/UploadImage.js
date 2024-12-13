import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { uploadImageToIPFS } from '../utils/pinata'; // Fonction pour uploader sur IPFS
import ContractABI from '../contracts/ImageStorage.json'; // Assure-toi que l'ABI est correcte

const contractAddress = '0x8c35667364980a939c91c824547124c171a6bfba'; // Adresse de ton contrat déployé sur Ganache

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]); // Liste des images uploadées
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    // Charger les images stockées localement au chargement du composant
    /*useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5001/public/images-data');
                setImages(response.data); // Charger les images dans l'état
            } catch (error) {
                console.error('Error fetching images from backend:', error);
            }
        };

        fetchImages();
    }, []);
     */
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !title || !description) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        setLoading(true);
        setSuccessMessage("");

        try {
            // Étape 1 : Uploader sur le backend
            /*
            const formData = new FormData();
            formData.append('image', file);

            const localUploadResponse = await axios.post('http://localhost:5001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const localPath = localUploadResponse.data.filePath;
            */
            // Étape 2 : Uploader sur IPFS
            const ipfsHash = await uploadImageToIPFS(file);

            if (ipfsHash) {
                // Étape 3 : Stocker les métadonnées sur Ethereum via le contrat
                const accounts = await web3.eth.getAccounts();
                const contract = new web3.eth.Contract(ContractABI, contractAddress);

                await contract.methods.storeImage(ipfsHash, title, description).send({
                    from: accounts[0],
                    gas: 3000000,
                });

                // Étape 4 : Mettre à jour l'état avec la nouvelle image
                const newImage = {
                    ipfsHash,
                    title,
                    description,
                    /* 
                    id: images.length > 0 ? images[images.length - 1].id + 1 : 1,
                    title,
                    image: `http://localhost:5001${localPath}`, // URL de l'image uploadée
                    description,*/
                };

                setImages([...images, newImage]);
                setSuccessMessage(`Image successfully uploaded and stored with IPFS hash: ${ipfsHash}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
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

            {/* Galerie d'images */}
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
