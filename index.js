document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("user-form");

    const retrieveEntries = () => {
        let entries = localStorage.getItem("user-entries");
        if (entries) {
            entries = JSON.parse(entries);
        } else {
            entries = [];
        }
        return entries;
    };

    let userEntries = retrieveEntries();

    const displayEntries = () => {
        const entries = retrieveEntries();
        const tableEntries = entries.map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const termsCell = `<td class='border px-4 py-2'>${entry.acceptTermsAndconditions}</td>`;

            const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${termsCell}</tr>`;
            return row;
        }).join("\n");

        const table = `<table class="table-auto w-full">
                        <tr>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Email</th>
                            <th class="px-4 py-2">Password</th>
                            <th class="px-4 py-2">DOB</th>
                            <th class="px-4 py-2">Accepted Terms?</th>
                        </tr>
                        ${tableEntries}
                    </table>`;

        let details = document.getElementById("user-entries");
        details.innerHTML = table;
    };

    // Function to display all entries in the table
    const displayAllEntries = () => {
        const allEntries = retrieveEntries();
        const tableEntries = allEntries.map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const termsCell = `<td class='border px-4 py-2'>${entry.acceptTermsAndconditions}</td>`;

            const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${termsCell}</tr>`;
            return row;
        }).join("\n");

        const table = `<table class="table-auto w-full">
                        <tr>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Email</th>
                            <th class="px-4 py-2">Password</th>
                            <th class="px-4 py-2">DOB</th>
                            <th class="px-4 py-2">Accepted Terms?</th>
                        </tr>
                        ${tableEntries}
                    </table>`;

        let details = document.getElementById("user-entries");
        details.innerHTML = table;
    };

    // Update table with the latest entry
    const updateTableWithLatestEntry = (entry) => {
        const tableBody = document.querySelector("table");
        const newRow = tableBody.insertRow(-1);

        const nameCell = newRow.insertCell(0);
        nameCell.textContent = entry.name;

        const emailCell = newRow.insertCell(1);
        emailCell.textContent = entry.email;

        const passwordCell = newRow.insertCell(2);
        passwordCell.textContent = entry.password;

        const dobCell = newRow.insertCell(3);
        dobCell.textContent = entry.dob;

        const termsCell = newRow.insertCell(4);
        termsCell.textContent = entry.acceptTermsAndconditions;
    };

    const saveUserForm = (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dob = document.getElementById("dob").value;
        const acceptTermsAndconditions = document.getElementById("terms").checked;

        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age >= 18 && age <= 55) {
            const entry = {
                name,
                email,
                password,
                dob,
                acceptTermsAndconditions
            };

            userEntries.push(entry);
            localStorage.setItem("user-entries", JSON.stringify(userEntries));
            updateTableWithLatestEntry(entry);
            displayAllEntries(); // Display all entries after adding the latest one
        } else {
            alert("Age should be between 18 and 55.");
        }
    };

    userForm.addEventListener("submit", saveUserForm);
    displayEntries();
});
