const loginBtn = document.querySelector("#button-login");
const loginClose = document.querySelector("#close-login-modal");
const loginModal = document.querySelector("#login-modal");
const loginModalBackground = document.querySelector("#login-background");

function openLoginModal (event){
    event.preventDefault()
    console.log("login clicked");
    loginModal.classList.add("is-active");
}

function closeLoginModal (event){
    event.preventDefault()
    console.log("close clicked");
    loginModal.classList.remove("is-active");
}

loginBtn.addEventListener("click", openLoginModal);
loginClose.addEventListener("click", closeLoginModal);
loginModalBackground.addEventListener("click", closeLoginModal);