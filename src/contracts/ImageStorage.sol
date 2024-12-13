// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageStorage {
    // Structure pour stocker les informations d'une image
    struct Image {
        string ipfsHash;  // Hash IPFS de l'image
        string title;     // Titre de l'image
        string description; // Description de l'image
    }

    // Mapping des IDs d'image à leurs données
    mapping(uint256 => Image) public images;

    // Nombre total d'images stockées
    uint256 public imageCount;

    // Événement déclenché lorsqu'une nouvelle image est ajoutée
    event ImageStored(
        uint256 indexed id,
        string ipfsHash,
        string title,
        string description
    );

    // Fonction pour stocker une image
    function storeImage(
        string memory _ipfsHash,
        string memory _title,
        string memory _description
    ) public {
        // Incrémenter le compteur d'images
        imageCount++;

        // Ajouter l'image au mapping
        images[imageCount] = Image(_ipfsHash, _title, _description);

        // Émettre l'événement
        emit ImageStored(imageCount, _ipfsHash, _title, _description);
    }

    // Fonction pour récupérer une image par son ID
    function getImage(uint256 _id)
        public
        view
        returns (string memory, string memory, string memory)
    {
        require(_id > 0 && _id <= imageCount, "Invalid image ID");
        Image memory image = images[_id];
        return (image.ipfsHash, image.title, image.description);
    }
}
