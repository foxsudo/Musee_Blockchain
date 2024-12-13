import React from 'react';
import './Collections.css';
import UploadImage from './UploadImage.js';
import DisplayImage from './DisplayImage.js';

function Collections() {
  return (
    <main className="App">
      
      <div >
      <header className="App-header">
        <h1>Blockchain Image Storage for Museum</h1>
      </header>

      {/* Section pour uploader une image */}
      <section>
        <h2>Upload Image to IPFS and store on Ethereum</h2>
        <UploadImage />
      </section>

      {/* Section pour afficher l'image depuis IPFS 
      <section>
        <h2>Display Image from IPFS</h2>
        <DisplayImage />
      </section>
      */}
    </div>
      
    </main>
  );
}

export default Collections;
