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
    // Gather updated values from input fields whose ids are in the format "edit-fieldname-<id>"
    const formData = {
      full_name: document.getElementById(`edit-full_name-${id}`)?.value,
      email: document.getElementById(`edit-email-${id}`)?.value,
      branch: document.getElementById(`edit-branch-${id}`)?.value,
      student_contact: document.getElementById(`edit-student_contact-${id}`)?.value,
      parent_contact: document.getElementById(`edit-parent_contact-${id}`)?.value,
      subjects: document.getElementById(`edit-subjects-${id}`)?.value, // as comma-separated string
      xii_diploma_type: document.getElementById(`edit-xii_diploma_type-${id}`)?.value,
      xii_diploma_score: document.getElementById(`edit-xii_diploma_score-${id}`)?.value,
      cet_jee_type: document.getElementById(`edit-cet_jee_type-${id}`)?.value,
      cet_jee_score: document.getElementById(`edit-cet_jee_score-${id}`)?.value,
      address: document.getElementById(`edit-address-${id}`)?.value,
      college_name: document.getElementById(`edit-college_name-${id}`)?.value,
      password: document.getElementById(`edit-password-${id}`)?.value,
      totalfees: document.getElementById(`edit-totalfees-${id}`)?.value,
      studentfees: document.getElementById(`edit-studentfees-${id}`)?.value,
      packages: document.getElementById(`edit-packages-${id}`)?.value // as comma-separated string
    };

    try {
      const response = await fetch(`/users/edit/${id}`, {
        method: "POST", // using POST for an update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message || "User updated successfully");
        // Optionally update the UI with new information here.
      } else {
        alert(result.error || "Error updating user");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating user");
    }
  }
});
