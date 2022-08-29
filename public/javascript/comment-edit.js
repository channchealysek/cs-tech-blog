const comment_id = document.querySelector('input[name="comment_id"]').value;
const post_id = document.querySelector('input[name="post_id"]').value;

// update comment
const editFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;

  // edit comment
  await fetch(`/api/comments/${comment_id}`, {
    method: "PUT",
    body: JSON.stringify({
      comment_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  document.location.replace(`/post/${post_id}`);
};

// delete comment
const deleteClickHandler = async () => {
  await fetch(`/api/comments/${comment_id}`, {
    method: "DELETE",
  });

  document.location.replace(`/post/${post_id}`);
};

document
  .querySelector("#edit-comment-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);