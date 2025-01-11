import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Sidebar from '../Sidebar/Sidebar';

// GraphQL Query to get images
const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      imageUrl
      description
    }
  }
`;

// GraphQL Mutation to add an image
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
            }).catch((err) => {
              console.error('Error adding image:', err);
              alert('Failed to add image. Please try again.');
            });
          } else {
            alert('Image description is required.');
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {error ? (
          <p className="text-red-500 text-center py-4">Error: {error.message}</p>
        ) : loading ? (
          <p className="text-white text-center py-4">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        )}
        <button
          className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
          onClick={handleAddImage}
        >
          Add New Image
        </button>
      </div>
    </div>
  );
};

export default Gallery;
