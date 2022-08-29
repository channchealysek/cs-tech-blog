const post_id = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector(
    'textarea[name="post-body"]'
  ).value;

  // edit post
  await fetch(`/api/post/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  document.location.replace(`/post/${post_id}`);
};

// delete post
const deleteClickHandler = async () => {
  await fetch(`/api/post/${post_id}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
