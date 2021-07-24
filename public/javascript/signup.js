const signupBtn = document.querySelector("#button-signup");
const signupClose = document.querySelector("#close-signup-modal");
const signupModal = document.querySelector("#signup-modal");
const signupModalBackground = document.querySelector("#signup-background");

function openSignupModal (event){
    event.preventDefault()
    console.log("signup clicked");
    signupModal.classList.add("is-active");
}

function closeSignupModal (event){
    event.preventDefault()
    console.log("close clicked");
    signupModal.classList.remove("is-active");
}

signupBtn.addEventListener("click", openSignupModal);
signupClose.addEventListener("click", closeSignupModal);
signupModalBackground.addEventListener("click", closeSignupModal);
