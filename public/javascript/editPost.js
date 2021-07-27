const postCont = document.querySelector("#post-container");
const editForm = document.querySelector("#edit-form");
const editFormCont = document.querySelector("#edit-form-container");
const editBtn = document.querySelector("#edit-button");
const cancelBtn = document.querySelector("#cancel-update");
const postId = document.querySelector("section").getAttribute("post-id")

function exposeEditForm(event) {
    event.preventDefault();
    console.log("clicked")
    postCont.className = "hidden";
    editForm.classList.remove("hidden");
    editBtn.classList.add("hidden");
}

function hideEditForm (event) {
    event.preventDefault();
    console.log("clicked")
    postCont.className = "";
    editForm.classList.add("hidden");
    editBtn.classList.remove("hidden");
}

async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector("#edited-title").value.trim();
    const text = document.querySelector("#edited-text").value.trim();

    editedPost = {
        title,
        text
    }
    if(text || title) {
        const response = await fetch(`/api/posts/${postId}`, {
            method:"PUT",
            body: JSON.stringify({
                title,
                text
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}

editBtn.addEventListener("click", exposeEditForm);
editForm.addEventListener("submit", editFormHandler);
cancelBtn.addEventListener("click", hideEditForm);