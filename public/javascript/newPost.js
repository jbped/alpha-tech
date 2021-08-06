const newPostOpenbtn = document.querySelector("#new-post-btn");
const newPostForm = document.querySelector("#new-post-form");
const newPostClose = document.querySelector("#close-new-post-modal");
const newPostModal = document.querySelector("#new-post-modal");
const newPostBackground = document.querySelector("#new-post-background");

function openNewPostModal (event){
    event.preventDefault()
    console.log("new post clicked");
    newPostModal.classList.add("is-active");
}

function closeSignupModal (event){
    event.preventDefault()
    console.log("close clicked");
    newPostModal.classList.remove("is-active");
}

async function newPostHandler(event) {
    event.preventDefault()
    const title = document.querySelector("#new-title-input").value.trim();
    const text = document.querySelector("#new-content-input").value.trim();
    const author_id = document.querySelector("#user-activity-header").getAttribute("data-user-id");

    if (title && text && author_id) {
        console.log("new post good", title, text, author_id)
        const response = await fetch("/api/posts", {
            method:"post",
            body: JSON.stringify({
                title,
                text,
                author_id
            }),
            headers: { "Content-Type":"application/json"}
        })
        if(response.ok) {
            document.location.replace(`/user/${author_id}/activity`)
            console.log("post created")
        } else {
            alert(response.statusText)
        }
    } else {
        console.log("new post bad", title, text, author_id)
        alert("Information needs to be provided in each field")
    }
}

newPostOpenbtn.addEventListener("click", openNewPostModal);
newPostClose.addEventListener("click", closeSignupModal);
newPostBackground.addEventListener("click", closeSignupModal);
newPostForm.addEventListener("submit", newPostHandler)
