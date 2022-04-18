import React, {useState} from 'react';


export default function Track ({url_image, title, artist, select, toggleSelect}) {
  const [isSelected, setIsSelected] = useState(select);
  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className="card-album">
      <div className='card-wrapper'>
        <div className="copy-music">
          <div className='card-content'>
            <img className="card-image" src={url_image} alt="{title}" />
            <p className='song-title'>{title}</p>
            <p className='song-artist'>{artist}</p>
            <button className='button-search' onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}