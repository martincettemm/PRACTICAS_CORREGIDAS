const tableBody = document.getElementById("tableBody");
const fetchDataButton = document.getElementById("fetchDataButton");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalEmail = document.getElementById("modalEmail");
const closeModal = document.getElementById("closeModal");

fetchDataButton.addEventListener("click", fetchData);

async function fetchData() {
    try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        const data = await response.json();

        if (data && data.results) {
            renderTable(data.results);
        } else {
            console.error("Estructura inesperada:", data);
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

function renderTable(users) {
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        const imageUrl = user.picture.medium;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
            <td><img src="${imageUrl}" alt="Foto de ${user.name.first}" /></td>
        `;
        row.addEventListener("click", () => showDetails(user, imageUrl));
        tableBody.appendChild(row);
    });
}

function showDetails(user, imageUrl) {
    modalImage.src = imageUrl;
    modalName.textContent = `Nombre: ${user.name.first} ${user.name.last}`;
    modalEmail.textContent = `Email: ${user.email}`;
    modal.style.display = "block";
    overlay.style.display = "block";
}

closeModal.addEventListener("click", closeDetails);
overlay.addEventListener("click", closeDetails);

function closeDetails() {
    modal.style.display = "none";
    overlay.style.display = "none";
}
