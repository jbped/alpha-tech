const loginOpen = document.querySelector("#button-login");
const loginClose = document.querySelector("#close-login-modal");
const loginModal = document.querySelector("#login-modal");
const loginModalBackground = document.querySelector("#login-background");
const loginBtn = document.querySelector("#login-btn");

const fakeDashboard = document.querySelector("#not-logged-in-dashboard");

function openLoginModal(event) {
    event.preventDefault()
    console.log("login clicked");
    loginModal.classList.add("is-active");
}

function closeLoginModal(event) {
    event.preventDefault()
    console.log("close clicked");
    loginModal.classList.remove("is-active");
}

async function loginHandler() {
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: { "Content-Type": "application/json" }
        })
        if (response.ok) {
            document.location.reload()
            console.log("Logged in")
        } else {
            alert(response.statusText)
        }
    }
}

function unhideError(event) {
    event.preventDefault()
    document.querySelector("#not-logged-in-error").classList.remove("is-hidden");
}

loginOpen.addEventListener("click", openLoginModal);
loginClose.addEventListener("click", closeLoginModal);
loginModalBackground.addEventListener("click", closeLoginModal);

loginBtn.addEventListener("click", loginHandler);
fakeDashboard.addEventListener("click", unhideError)


document.querySelector('.delete').addEventListener("click", () => { 
    console.log("delete clicked")
    document.querySelector("#not-logged-in-error").classList.add("is-hidden");
})
