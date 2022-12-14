const signupFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // will return homepage when login successfully
    document.location.replace("/login");
  } else {
    alert("Failed to sign up");
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
