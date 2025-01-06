const imageGrid = document.querySelector('.image-grid');
const addNewImageButton = document.getElementById('addNewImage');

const fakeData = [
    {
        imageUrl: '/images/image1.jpg',
        description: 'Bethlehem, a historic Palestinian village located west of Jerusalem. It is famous for its ancient history and the events of the Nakba that destroyed the village in 1948.'
    },
    {
        imageUrl: '/images/image2.jpg',
        description: 'Jabalia, a city in the northern Gaza Strip, known for its high population density and the large refugee camp that bears its name.'
    },
    {
        imageUrl: '/images/image3.jpg',
        description: 'Hebron, a historic city in the southern West Bank, is famous for the Ibrahimi Mosque, its traditional markets, and its handicrafts.'
    },
    {
        imageUrl: '/images/image4.jpg',
        description: 'Jerusalem, a holy city located in the heart of Palestine, considered a spiritual and historical center for the three heavenly religions.'
    },
    {
        imageUrl: '/images/image5.jpg',
        description: 'Shejaiya, one of the oldest and largest neighborhoods in Gaza City. It is distinguished by its ancient history and cultural and social status.'
    }
];

function displayImages() {
    imageGrid.innerHTML = ''; 
    fakeData.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('card'); 

        imageItem.innerHTML = `
            <img src="${image.imageUrl}" alt="${image.description}">
            <div class="card-info">
                <h3>${image.description.split(',')[0]}</h3>
                <p>${image.description}</p>
            </div>
        `;
        imageGrid.appendChild(imageItem);
    });
}

addNewImageButton.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'images/*';  // Only accept image files

    fileInput.click();

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newImageUrl = e.target.result; // This is the data URL of the image
                const newImageDescription = prompt('Enter the image description:'); // Prompt for description

                if (newImageDescription) {
                    fakeData.push({
                        imageUrl: newImageUrl,
                        description: newImageDescription.trim()
                    });

                    displayImages(); 
                } else {
                    alert('Image description is required.');
                }
            };
            reader.readAsDataURL(file);  // Read the selected image as a data URL
        }
    });
});

displayImages();
