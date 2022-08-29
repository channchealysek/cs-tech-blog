const comment_id = document.querySelector('input[name="comment_id"]').value;
const post_id = document.querySelector('input[name="post_id"]').value;

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
  }).then(async(response) => {
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    }
    else {
      throw new Error(response.status + " Failed Fetch ");
    }
  }).catch(e => console.error('EXCEPTION: ', e))
};

// delete comment
const deleteClickHandler = async () => {
  const response = await fetch(`/api/comments/${comment_id}`, {
    method: "DELETE",
    headers: {"Content-Type":"application/json"}
  });

  if (response.ok) {
    document.location.replace(`/post/${post_id}`);
  } else {
    alert(response.statusText);
  } 
};

document
  .querySelector("#edit-comment-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);