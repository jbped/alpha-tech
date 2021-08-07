const commentForm = document.querySelector("#comment-form");
const editBtns = document.querySelectorAll(".edit-comment-button");

async function commentHandler(event) {
    event.preventDefault();
    console.log("clicked")
    const text = document.querySelector("#comment-text").value.trim();
    const commenter_id = commentForm.getAttribute("commenter_id")
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log({
        post_id,
        text,
        commenter_id
    })
    if(text) {
        const response = await fetch("/api/comments", {
            method:"POST",
            body: JSON.stringify({
                text,
                commenter_id,
                post_id
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

const getCommentId = (event) => {
    event.preventDefault();
    // console.log(event)
    const editBtn = event.target
    const commentId = editBtn.parentElement.getAttribute("comment-id")
    return commentId
}

const editCommentHandler = (event) => {
    event.preventDefault();
    const editBtn = event.target
    const currentComment = editBtn.parentElement.firstElementChild
    const commentId = editBtn.parentElement.getAttribute("comment-id")
    const editForm = editBtn.previousElementSibling;
    const deleteBtn = editForm[2]
    const cancelBtn = editForm[3]
    const editInput = editForm[0]
    // const cancelBtn
    // console.log(event)
    // console.log(editBtn)
    // console.log(commentId)
    // console.log(currentComment)
    // console.log(editForm)
    // console.log(deleteBtn)
    
    currentComment.classList.add("hidden");
    editForm.classList.remove("hidden");
    editBtn.classList.add("hidden");
    editForm.addEventListener("submit", submitCommentEdit);
    deleteBtn.addEventListener("click", deleteCommentHandler)
    cancelBtn.addEventListener("click", cancelCommentEditHandler)
}

async function submitCommentEdit (event) {
    event.preventDefault()

    const commentId = event.target.getAttribute("comment-form")
    const commentText = event.target[0].value.trim()
    // console.log(commentId);
    // console.log(commentText);

    if (commentText && commentId) {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            body: JSON.stringify({
                text: commentText
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
}
async function deleteCommentHandler (event) {
    event.preventDefault()

    const commentId = event.target.parentElement.parentElement.parentElement.getAttribute("comment-form")

    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}
function cancelCommentEditHandler (event) {
    event.preventDefault()

    const editForm = event.target.parentElement.parentElement.parentElement
    const editBtn = editForm.nextElementSibling
    const currentComment = editForm.parentElement.firstElementChild

    currentComment.classList.remove("hidden");
    editForm.classList.add("hidden");
    editBtn.classList.remove("hidden");
}


commentForm.addEventListener("submit", commentHandler)
for(let i = 0; i < editBtns.length; i++){
    editBtns[i].addEventListener("click", editCommentHandler)
}