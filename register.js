function toggleRegisterPassword() {
    let password = document.getElementById("newPassword");
    let eye = document.querySelector(".eye");

    if (password.type === "password") {
        password.type = "text";
        eye.textContent = "🙈";  
    } else {
        password.type = "password";
        eye.textContent = "👁";  
    }
}

function registerUser() {
    let username = document.getElementById("newUsername").value.trim();
    let password = document.getElementById("newPassword").value.trim();
    let message = document.getElementById("register-message");

    if (username === "" || password === "") {
        message.textContent = "Please fill in all fields!";
        message.style.color = "red";
        return;
    }

    localStorage.setItem("registeredUser", username);
    localStorage.setItem("registeredPass", password);

    message.textContent = "Registration successful! You can now login.";
    message.style.color = "green";

    document.getElementById("newUsername").value = "";
    document.getElementById("newPassword").value = "";
}
