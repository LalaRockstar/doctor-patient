// import axios from "axios";
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// eslint-disable-next-line import/prefer-default-export
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};

const login = async (email, password) => {
  try {
    // eslint-disable-next-line no-undef
    const res = await axios({
      method: "POST",
      withCredentials: true,
      url: "/api/v1/booking/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Login Successfull");
      window.setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        location.assign("/dashboard");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
  console.log(email, password);
});

const logout = async () => {
  try {
    // eslint-disable-next-line no-undef
    const res = await axios({
      method: "GET",
      url: "/api/v1/booking/logout",
    });
    // eslint-disable-next-line no-restricted-globals
    if (res.data.status === "success") {
      showAlert("success", "Logout successfully");
      // eslint-disable-next-line no-restricted-globals
      location.reload(true);
    }
  } catch (err) {
    showAlert("error", "Error loging out! Try again");
  }
};
const logoutBtn = document.querySelector(".logout");
