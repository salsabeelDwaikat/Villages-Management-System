import React, { useState } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([
    {
      imageUrl: '/images/image1.jpg',
      description: 'Bethlehem, a historic Palestinian village located west of Jerusalem. It is famous for its ancient history and the events of the Nakba that destroyed the village in 1948.',
    },
    {
      
      imageUrl: '/images/image2.jpg',
      description: 'Jabalia, a city in the northern Gaza Strip, known for its high population density and the large refugee camp that bears its name.',
    },
    {
      imageUrl: '/images/image3.jpg',
      description: 'Hebron, a historic city in the southern West Bank, is famous for the Ibrahimi Mosque, its traditional markets, and its handicrafts.',
    },
    {
      imageUrl: '/images/image4.jpg',
      description: 'Jerusalem, a holy city located in the heart of Palestine, considered a spiritual and historical center for the three heavenly religions.',
    },
    {
      imageUrl: '/images/image5.jpg',
      description: 'Shejaiya, one of the oldest and largest neighborhoods in Gaza City. It is distinguished by its ancient history and cultural and social status.',
    },
  ]);

  const addNewImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImageUrl = e.target.result;
          const newImageDescription = prompt('Enter the image description:');
          if (newImageDescription) {
            setImages([
              ...images,
              { imageUrl: newImageUrl, description: newImageDescription.trim() },
            ]);
          } else {
            alert('Image description is required.');
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-6 bg-gray-800 shadow-lg">
        <h1 className="text-lg font-bold">Image Gallery</h1>
        <button
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          onClick={addNewImage}
        >
          Add New Image
        </button>
      </header>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={image.imageUrl}
              alt={image.description}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">
                {image.description.split(',')[0]}
              </h3>
              <p className="text-sm text-gray-300">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
