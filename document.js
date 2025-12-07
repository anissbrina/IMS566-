const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const fileList = document.getElementById("fileList");
const docCategory = document.getElementById("docCategory");
const submitBtn = document.getElementById("submitBtn");

const historyList = document.getElementById("historyList");

let documents = JSON.parse(localStorage.getItem("documents")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function saveData() {
    localStorage.setItem("documents", JSON.stringify(documents));
    localStorage.setItem("history", JSON.stringify(history));
}

uploadBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    const category = docCategory.value;

    if (!file || !category) {
        alert("Please select a file and category.");
        return;
    }

    documents.push({
        name: file.name,
        category: category
    });

    saveData();
    renderList();

    fileInput.value = "";
    docCategory.value = "";
});

function renderList() {
    fileList.innerHTML = "";

    documents.forEach((doc, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><b>${doc.name}</b> — ${doc.category}</span>
            <div class="file-actions">
                <button class="download">Download</button>
                <button class="delete">Delete</button>
            </div>
        `;

        li.querySelector(".delete").addEventListener("click", () => {
            documents.splice(index, 1);
            saveData();
            renderList();
        });

        fileList.appendChild(li);
    });
}

submitBtn.addEventListener("click", () => {

    if (documents.length === 0) {
        alert("No documents to submit.");
        return;
    }

    history.push(...documents);

    documents = [];

    saveData();
    renderList();
    renderHistory();

    alert("All documents successfully submitted and moved to history!");
});

function renderHistory() {
    historyList.innerHTML = "";

    history.forEach((doc, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><b>${doc.name}</b> — ${doc.category}</span>
            <button class="history-delete">Delete</button>
        `;

        li.querySelector(".history-delete").addEventListener("click", () => {
            history.splice(index, 1);
            saveData();
            renderHistory();
        });

        historyList.appendChild(li);
    });
}

renderList();
renderHistory();
