// console.log('here

document.getElementById("users").addEventListener("click", async (e) => {
  const target = e.target;
  if (target.tagName.toLowerCase() !== "button") return; // Only process button clicks

  // Split the id at the dash, e.g. "delete-3" => ["delete", "3"]
  const parts = target.id.split("-");
  const action = parts[0]; // "edit" or "delete"
  const id = parts[1];

  if (action === "delete") {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(`/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message || "User deleted successfully");
        // Optionally, remove the student's row from the table:
        // e.target.closest("tr").remove();
      } else {
        alert(result.error || "Error deleting user");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting user");
    }
  }
});

const debounce = function (callback, time) {
  let timeout;

  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback(args);
    }, time);
  }
};

const search = document.getElementById("search");
search.addEventListener("input", debounce(() => {
  console.log(search.value);
}, 750));
