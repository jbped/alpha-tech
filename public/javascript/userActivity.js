const tabs = document.querySelector(".tabs");

function updateTab(event) {
    event.preventDefault;
    let active = document.querySelectorAll(".is-active")
    active.classList.remove("is-active")
    console.log(active)
    event.target.parentElement.classList.add("is-active");
}

tabs.addEventListener("click", updateTab)