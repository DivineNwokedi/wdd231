// Parse query string and display submitted data
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const submittedData = document.getElementById("submitted-data");

  const fields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Mobile Phone" },
    { key: "organization", label: "Organization" },
    { key: "timestamp", label: "Submitted At" }
  ];

  fields.forEach(field => {
    if (params.has(field.key)) {
      const li = document.createElement("li");
      li.textContent = `${field.label}: ${params.get(field.key)}`;
      submittedData.appendChild(li);
    }
  });

  // Footer dates
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
});