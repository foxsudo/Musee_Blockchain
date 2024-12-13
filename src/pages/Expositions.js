import { GalleryData } from "../GalleryData";
import React, { useEffect, useState } from 'react';
import Banner from "../components/Banner";


function Expositions() {

  const [data,setData] = useState([]);
  const [collection,setCollection] = useState([]);

  useEffect(()=>{
    setData(GalleryData);
    setCollection([... new Set(GalleryData.map((item)=> item.titile))])
  },[]) 

  const gallery_filter = (itemData) =>{
    const filterData = GalleryData.filter((item)=> item.titile == itemData);
    setData(filterData);
  }
  
  return (
    <main>
      
      <div className="title_expo">
        <Banner text="Expositions" />
      </div>

      <div className="galleryWrapper">
        <div className="filterItem">
          <ul>
            <li><button onClick={()=> setData(GalleryData)}>All</button></li>
            {
              collection.map((item)=> <li><button onClick={()=>{gallery_filter(item)}}>{item}</button></li>)
            }
          </ul>
        </div>
        <div className="galleryContainer">
          {
            data.map((item)=> <div  key={item.id} className="galleryItem">
                <div className="test">
                  <img src={item.image  } className="image-item" />
                  <div className="overlay">
                    <div className="text">{item.description }</div>
                </div>
                </div>
              </div> )
          }
        </div>
      </div>

    </main>
  );
}

export default Expositions;
