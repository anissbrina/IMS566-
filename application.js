let applications = [];
let editIndex = -1; 
let isEditing = false;

function loadApplications() {
    const stored = localStorage.getItem("applications");
    if (stored) {
        applications = JSON.parse(stored);
    } else {
        applications = [];
    }
    renderApplications();
    updateSummary();
}

function saveToStorage() {
    localStorage.setItem("applications", JSON.stringify(applications));
}

function saveApplication() {
    const saveBtn = document.getElementById('saveBtn');
    if (!saveBtn) return;

    if (saveBtn.disabled) return;
    saveBtn.disabled = true;

    const company = document.getElementById('companyName').value.trim();
    const position = document.getElementById('positionApplied').value.trim();
    const dateApplied = document.getElementById('dateApplied').value;
    const status = document.getElementById('applicationStatus').value;
    const method = document.getElementById('applicationMethod').value;

    if (!company || !position || !dateApplied) {
        alert("Please fill all fields.");
        saveBtn.disabled = false;
        return;
    }

    const application = { company, position, dateApplied, status, method };

    if (isEditing && editIndex !== -1 && editIndex < applications.length) {
        applications[editIndex] = application;
        isEditing = false;
        editIndex = -1;
        document.getElementById("saveBtn").textContent = "Save Application";
    }

    else {
        applications.push(application);
    }

    saveToStorage();

    renderApplications();
    updateSummary();

    document.getElementById('companyName').value = '';
    document.getElementById('positionApplied').value = '';
    document.getElementById('dateApplied').value = '';
    document.getElementById('applicationStatus').value = 'under review';
    document.getElementById('applicationMethod').value = 'Email';

    setTimeout(() => saveBtn.disabled = false, 150);
}

function renderApplications() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    applications.forEach((app, index) => {
        const div = document.createElement('div');
        div.classList.add('history-item');

        div.innerHTML = `
            <div>
                <strong>Company:</strong> ${escapeHtml(app.company)} |
                <strong>Position:</strong> ${escapeHtml(app.position)} |
                <strong>Date:</strong> ${escapeHtml(app.dateApplied)} |
                <strong>Status:</strong> ${escapeHtml(app.status)} |
                <strong>Method:</strong> ${escapeHtml(app.method)}
            </div>

            <div>
                <button class="edit-btn" onclick="editApplication(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteApplication(${index})">Delete</button>
            </div>
        `;

        historyList.appendChild(div);
    });
}

function editApplication(index) {
    const app = applications[index];
    editIndex = index;
    isEditing = true;

    document.getElementById('companyName').value = app.company;
    document.getElementById('positionApplied').value = app.position;
    document.getElementById('dateApplied').value = app.dateApplied;
    document.getElementById('applicationStatus').value = app.status;
    document.getElementById('applicationMethod').value = app.method;

    document.getElementById('saveBtn').textContent = "Update Application";
}

function deleteApplication(index) {
    applications.splice(index, 1);
    saveToStorage(); 

    if (isEditing && editIndex === index) {
        isEditing = false;
        editIndex = -1;
        document.getElementById("saveBtn").textContent = "Save Application";
    }

    renderApplications();
    updateSummary();
}

function updateSummary() {
    let review = 0, interview = 0, accepted = 0, rejected = 0;

    applications.forEach(app => {
        switch(app.status.toLowerCase()) {
            case 'under review': review++; break;
            case 'interview scheduled': interview++; break;
            case 'accepted offer': accepted++; break;
            case 'rejected': rejected++; break;
        }
    });

    document.getElementById('reviewCount').textContent = review;
    document.getElementById('interviewCount').textContent = interview;
    document.getElementById('acceptedCount').textContent = accepted;
    document.getElementById('rejectedCount').textContent = rejected;
    document.getElementById('totalCount').textContent = applications.length;
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
        return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m];
    });
}

window.onload = function () {
    loadApplications(); 
};
