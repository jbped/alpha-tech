const loginOpen = document.querySelector("#button-login");
const loginClose = document.querySelector("#close-login-modal");
const loginModal = document.querySelector("#login-modal");
const loginModalBackground = document.querySelector("#login-background");
const loginBtn = document.querySelector("#login-btn")

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

async function loginHandler(event) {
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        const response = await fetch("/api/users/login", {
            method:"post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: { "Content-Type":"application/json"}
        })
        if(response.ok) {
            document.location.replace("/dashboard")
            console.log("Logged in")
        } else {
            alert(response.statusText)
        }
    }
}

loginOpen.addEventListener("click", openLoginModal);
loginClose.addEventListener("click", closeLoginModal);
loginModalBackground.addEventListener("click", closeLoginModal);

loginBtn.addEventListener("click", loginHandler);