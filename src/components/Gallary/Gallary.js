import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      imageUrl
      description
    }
  }
`;

const ADD_IMAGE = gql`
  mutation AddImage($imageUrl: String!, $description: String!) {
    addImage(input: { imageUrl: $imageUrl, description: $description }) {
      id
      imageUrl
      description
    }
  }
`;

const Gallery = () => {
  const { loading, error, data } = useQuery(GET_IMAGES);
  const [addImage] = useMutation(ADD_IMAGE, {
    refetchQueries: [{ query: GET_IMAGES }],
  });

  const handleAddImage = () => {
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
            addImage({
              variables: { imageUrl: newImageUrl, description: newImageDescription },
            });
          } else {
            alert('Image description is required.');
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  if (loading) return <p className="text-white text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-4">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.images.map((image) => (
          <div
            key={image.id}
            className="bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
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
      <button
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        onClick={handleAddImage}
      >
        Add New Image
      </button>
    </div>
  );
};

export default Gallery;