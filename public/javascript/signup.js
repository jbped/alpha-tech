const signupBtn = document.querySelector("#button-signup");
const signupForm = document.querySelector("#signup-form");
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

async function signupHandler() {
    const username = document.querySelector("#username-input").value.trim();
    const email = document.querySelector("#email-input").value.trim();
    const password = document.querySelector("#password-input").value.trim();

    if (username && email && password) {
        const response = await fetch("/api/users", {
            method:"post",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { "Content-Type":"application/json"}
        })
        if(response.ok) {
            document.location.reload()
            console.log("signed up")
        } else {
            alert(response.statusText)
        }
    } else {
        alert("Information needs to be provided in each field")
    }
}

signupBtn.addEventListener("click", openSignupModal);
signupClose.addEventListener("click", closeSignupModal);
signupModalBackground.addEventListener("click", closeSignupModal);
signupForm.addEventListener("submit", signupHandler)
