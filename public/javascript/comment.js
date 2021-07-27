const commentForm = document.querySelector("#comment-form")

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

commentForm.addEventListener("submit", commentHandler)