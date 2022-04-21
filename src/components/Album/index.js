import React, {useState} from 'react';


export default function Track ({url_image, title, artist, select, toggleSelect}) {
  const [isSelected, setIsSelected] = useState(select);
  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className="border border-2 border-white m-4 p-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <img
            className="card-image"
            src={url_image}
            alt="{title}"
            width={300}
            height={300}
          />
        </div>
        <div>
          <p className="mx-4 mt-4 text-2xl text-white font-bold hover">
            {title}
          </p>
          <p className="mx-4 mt-2 text-gray-400 w-36">{artist}</p>
          <button
            className="mx-4 mt-40 button-search px-24 py-2 bg-sky-600 text-white rounded-lg mb-3 hover:bg-sky-800"
            onClick={handleToggleSelect}
          >
            {isSelected ? "Deselect" : "Select"}
          </button>
        </div>
      </div>
    </div>
  )
}