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
  } else if (action === "edit") {
    // try {
    //   fetch(`/users/edit/${id}`, {
    //     method: "POST", // using POST for an update
    //     headers: { "Content-Type": "application/json" },
    //   }).then(response => response.json)
    //     .then(data => {
    //       console.log(data);
    //       if (data.redirectUrl) {
    //         window.location.href = data.redirectUrl;
    //       }
    //     });
    // } catch (error) {
    //   console.error(error);
    //   alert("Error updating user");
    // }
  }
});
