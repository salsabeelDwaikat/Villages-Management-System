document.addEventListener('DOMContentLoaded', function() {
    const adminList = document.getElementById('adminList');
    const searchInput = document.getElementById('searchInput');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const adminNameElement = document.getElementById('adminName');
    const chatSection = document.getElementById('chatSection');

    const admins = [
        { name: 'Salsabeel', image: '/images/admin1.jpg' },
        { name: 'Najwa', image: '/images/admin2.jpg' },
        { name: 'Alaa', image: '/images/admin3.jpg' }
    ];

    function displayAdmins(admins) {
        adminList.innerHTML = '';
        admins.forEach(admin => {
            const adminDiv = document.createElement('div');
            adminDiv.classList.add('admin');
            adminDiv.innerHTML = `
                <img src="${admin.image}" alt="${admin.name}">
                <p>${admin.name}</p>
            `;
            adminList.appendChild(adminDiv);
        });
    }

    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.toLowerCase();
        const filteredAdmins = admins.filter(admin => admin.name.toLowerCase().includes(searchValue));
        displayAdmins(filteredAdmins);
    });

    adminList.addEventListener('click', function(event) {
        const adminDiv = event.target.closest('.admin');

        if (adminDiv) {
            const adminName = adminDiv.querySelector('p').textContent;
            adminNameElement.textContent = adminName;
            chatMessages.innerHTML = '';

            const welcomeMessage = document.createElement('div');
            welcomeMessage.classList.add('message', 'admin-message');
            welcomeMessage.innerHTML = `<p>${adminName}: Hello! How can I assist you today?</p>`;
            chatMessages.appendChild(welcomeMessage);

            chatSection.classList.add('active');

            const socket = new WebSocket('ws://localhost:8080');  // Use your WebSocket server URL

            socket.onopen = function() {
                socket.send(`connect:${adminName}`);
            };

            socket.onmessage = function(event) {
                const message = event.data;
                const adminMessage = document.createElement('div');
                adminMessage.classList.add('message', 'admin-message');
                adminMessage.innerHTML = `<p>${adminName}: ${message}</p>`;
                chatMessages.appendChild(adminMessage);
            };

            sendMessageButton.addEventListener('click', function() {
                const userMessage = messageInput.value;
                if (userMessage.trim()) {
                    const message = document.createElement('div');
                    message.classList.add('message', 'user-message');
                    message.innerHTML = `<p>You: ${userMessage}</p>`;
                    chatMessages.appendChild(message);

                    socket.send(userMessage);
                    messageInput.value = '';  // Clear the input field
                }
            });
        }
    });

    displayAdmins(admins);
});
