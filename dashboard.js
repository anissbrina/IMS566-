const STORAGE_KEY = "recentApplications";

let applications = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const recentBody = document.getElementById("recentBody");
const addBtn = document.getElementById("addApplicationBtn");

function renderTable() {
    recentBody.innerHTML = "";

    applications.forEach((app, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.position}</td>
            <td>${app.status}</td>
            <td>
                <button class="edit-btn" onclick="editApplication(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteApplication(${index})">Delete</button>
            </td>
        `;

        recentBody.appendChild(row);
    });
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

addBtn.addEventListener("click", () => {
    let company = prompt("Enter company name:");
    if (!company) return;

    let position = prompt("Enter position:");
    if (!position) return;

    let status = prompt("Enter status (Under Review, Accepted, Rejected):");
    if (!status) return;

    applications.push({ company, position, status });
    saveData();
    renderTable();
});

function editApplication(index) {
    let app = applications[index];

    let newCompany = prompt("Edit company:", app.company);
    if (!newCompany) return;

    let newPosition = prompt("Edit position:", app.position);
    if (!newPosition) return;

    let newStatus = prompt("Edit status (Under Review, Accepted, Rejected):", app.status);
    if (!newStatus) return;

    applications[index] = {
        company: newCompany,
        position: newPosition,
        status: newStatus
    };

    saveData();
    renderTable();
}

function deleteApplication(index) {
    if (confirm("Delete this application?")) {
        applications.splice(index, 1);
        saveData();
        renderTable();
    }
}

renderTable();
