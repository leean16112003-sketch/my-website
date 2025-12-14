
document.addEventListener("DOMContentLoaded", () => {

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        birthDate: document.getElementById("birthDate").value,
        nationality: document.getElementById("nationality").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value
      };

      if (Object.values(user).includes("") || !user.gender) {
        alert("Lütfen tüm alanları doldurun");
        return;
      }

      if (user.password.length < 6) {
        alert("Şifre en az 6 karakter olmalı");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
    window.location.href = "profile.html";

    });
  }

  if (window.location.pathname.includes("profile.html")) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      window.location.replace("login.html");
      return;
    }

    document.getElementById("pFirstName").innerText = user.firstName;
    document.getElementById("pLastName").innerText = user.lastName;
    document.getElementById("pEmail").innerText = user.email;
    document.getElementById("pBirthDate").innerText = user.birthDate;
    document.getElementById("pNationality").innerText = user.nationality;
    document.getElementById("pGender").innerText = user.gender;
  }

});

// ŞİFRE DEĞİŞTİRME
const passwordForm = document.getElementById("passwordForm");

if (passwordForm) {
  passwordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (oldPassword !== user.password) {
      alert("Mevcut şifre yanlış!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Yeni şifre en az 6 karakter olmalı!");
      return;
    }

    user.password = newPassword;
    localStorage.setItem("user", JSON.stringify(user));

    alert("Şifre başarıyla değiştirildi!");
    window.location.href = "profile.html";
  });
}
