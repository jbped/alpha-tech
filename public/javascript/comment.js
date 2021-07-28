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
    const deleteBtn = editForm.children[2].children[1].firstElementChild
    console.log(editBtn)
    console.log(commentId)
    console.log(currentComment)
    console.log(editForm)
    console.log(deleteBtn)
    
    currentComment.classList.add("hidden");
    editForm.classList.remove("hidden");
    editBtn.classList.add("hidden");
    editForm.addEventListener("submit", submitCommentEdit);
    deleteBtn.addEventListener("click", deleteCommentHandler)
}

function submitCommentEdit (event) {
    event.preventDefault();
    const commentId = event.target.getAttribute("comment-form")
    console.log(commentId);
}

function submitCommentEdit (event) {
    event.preventDefault();
    const commentId = event.target.getAttribute("comment-form")
    console.log(commentId);
}

commentForm.addEventListener("submit", commentHandler)
for(let i = 0; i < editBtns.length; i++){
    editBtns[i].addEventListener("click", editCommentHandler)
}