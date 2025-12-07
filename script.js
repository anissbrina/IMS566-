function togglePassword() {
  let password = document.getElementById("password");
  let eye = document.querySelector(".eye");

  if (password.type === "password") {
    password.type = "text";
    eye.textContent = "🙈";
  } else {
    password.type = "password";
    eye.textContent = "👁"; 
  }
}

function login() {
  console.log("Login Button Clicked");

  const correctUsername = "Intern";
  const correctPassword = "ims566";

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let error = document.getElementById("error-message");

  // 1) Check hardcoded credentials
  if (username === correctUsername && password === correctPassword) {
    window.location.href = "dashboard.html";
    return;
  }

  let savedUser = localStorage.getItem("registeredUser");
  let savedPass = localStorage.getItem("registeredPass");

  if (savedUser && username === savedUser && password === savedPass) {
    window.location.href = "dashboard.html";
    return;
  }

  error.innerText = "Invalid username or password!";
}
