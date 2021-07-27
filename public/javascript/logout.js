const logoutOpen = document.querySelector("#button-logout");
const logoutClose = document.querySelector("#logout-cancel");
const logoutModal = document.querySelector("#logout-modal");
const logoutModalBackground = document.querySelector("#logout-background");
const logoutBtn = document.querySelector("#logout-confirm")

function openLogoutModal (event){
    event.preventDefault()
    console.log("logout clicked");
    logoutModal.classList.add("is-active");
}

function closeLogoutModal (event){
    event.preventDefault()
    console.log("close clicked");
    logoutModal.classList.remove("is-active");
}

async function logoutHandler() {
    const response = await fetch("/api/users/logout", {
        method: "post",
        headers: { "Content-Type":"application/json" }
    });

    if (response.ok) {
        document.location.replace("/");
    } else {
        alert(response.statusText)
    }
}

logoutOpen.addEventListener("click", openLogoutModal);
logoutClose.addEventListener("click", closeLogoutModal);
logoutModalBackground.addEventListener("click", closeLogoutModal);

logoutBtn.addEventListener("click", logoutHandler);