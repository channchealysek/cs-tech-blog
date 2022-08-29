const editFormHandler = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector('input[name="post-id"]').value;
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
  })
    .then(async (response) => {
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        throw new Error(response.status + " Failed Fetch ");
      }
    })
    .catch((e) => console.error("EXCEPTION: ", e));
};

// delete post
const deleteFormHandler = async (event) => {
  event.preventDefault();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/post/${post_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);
