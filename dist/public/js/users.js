"use strict";
// console.log('here
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.getElementById("users").addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
    const target = e.target;
    if (target.tagName.toLowerCase() !== "button")
        return; // Only process button clicks
    // Split the id at the dash, e.g. "delete-3" => ["delete", "3"]
    const parts = target.id.split("-");
    const action = parts[0]; // "edit" or "delete"
    const id = parts[1];
    if (action === "delete") {
        if (!confirm("Are you sure you want to delete this student?"))
            return;
        try {
            const response = yield fetch(`/users/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            const result = yield response.json();
            if (response.ok) {
                alert(result.message || "User deleted successfully");
                // Optionally, remove the student's row from the table:
                // e.target.closest("tr").remove();
            }
            else {
                alert(result.error || "Error deleting user");
            }
        }
        catch (error) {
            console.error(error);
            alert("Error deleting user");
        }
    }
}));
function renderStudents(students) {
    const tbody = document.getElementById('students-table-body');
    tbody.innerHTML = students.map(student => `
    <tr class="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 transition">
      <td class="p-3 border border-gray-600">${student.id}</td>
      <td class="p-3 border border-gray-600">
        <a href="/users/${student.id}" class="hover:underline">${student.full_name}</a>
      </td>
      <td class="p-3 border border-gray-600">${student.email}</td>
      <td class="p-3 border border-gray-600">${student.branch}</td>
      <td class="p-3 border border-gray-600">${student.student_contact}</td>
      <td class="p-3 border border-gray-600">${student.parent_contact}</td>
      <td class="p-3 border border-gray-600">${student.subjects ? student.subjects.join(', ') : 'N/A'}</td>
      <td class="p-3 border border-gray-600">${student.xii_diploma_type || 'N/A'}</td>
      <td class="p-3 border border-gray-600">${student.xii_diploma_score || 'N/A'}</td>
      <td class="p-3 border border-gray-600">${student.cet_jee_type || 'N/A'}</td>
      <td class="p-3 border border-gray-600">${student.cet_jee_score || 'N/A'}</td>
      <td class="p-3 border border-gray-600">${student.address || 'N/A'}</td>
      <td class="p-3 border border-gray-600">${student.college_name || 'N/A'}</td>
      <td class="p-3 border border-gray-600">${student.totalfees}</td>
      <td class="p-3 border border-gray-600">${student.studentfees}</td>
      <td class="p-3 border border-gray-600">${student.packages ? student.packages.join(', ') : 'N/A'}</td>
      <td class="p-3 border border-gray-600 flex justify-center items-center space-x-3">
        <form id="editForm-${student.id}" action="/users/edit/${student.id}" method="POST">
          <button type="submit" class="bg-yellow-500 text-white p-2 rounded">Edit</button>
        </form>
        <button id="delete-${student.id}" class="bg-red-500 text-white p-2 rounded">Delete</button>
      </td>
    </tr>
  `).join('');
}
const debounce = function (callback, time) {
    let timeout;
    return function (...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            callback(args);
        }, time);
    };
};
const search = document.getElementById("search");
search.addEventListener("input", debounce(() => {
    // console.log(search.value);
    fetch('/users', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: search.value })
    })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        renderStudents(data);
    })
        .catch(error => console.error('Error:', error));
}, 750));
