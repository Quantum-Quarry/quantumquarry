document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("tableBody");

    // Function to retrieve data from localStorage
    function loadDataFromLocalStorage(key) {
        return localStorage.getItem(key);
    }

    // Function to save data to localStorage
    function saveDataToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    // Function to create a new row with editable cells
    function createRow(rowNumber) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${rowNumber}</td>
            <td><input type="checkbox" id="checkbox_${rowNumber}" class="checkbox"></td>
            <td id="chapter_${rowNumber}" class="editable">Chapter ${rowNumber}</td>
            <td id="numQs_${rowNumber}" class="editable">0</td>
            <td id="lectureDuration_${rowNumber}" class="editable">0</td>
        `;
        tableBody.appendChild(newRow);

        // Add event listeners to editable cells
        const editableCells = newRow.querySelectorAll(".editable");
        editableCells.forEach(cell => {
            cell.addEventListener("click", function() {
                const oldValue = this.innerText;
                const newValue = prompt("Enter new value:", oldValue);
                if (newValue !== null) {
                    this.innerText = newValue;
                    saveDataToLocalStorage(`${cell.id}_${rowNumber}`, newValue); // Save data to localStorage
                }
            });
        });

        // Load data from localStorage and populate the cells
        editableCells.forEach(cell => {
            const savedValue = loadDataFromLocalStorage(`${cell.id}_${rowNumber}`);
            if (savedValue) {
                cell.innerText = savedValue;
            }
        });

        // Load checkbox state from localStorage
        const checkbox = newRow.querySelector(`#checkbox_${rowNumber}`);
        checkbox.checked = loadDataFromLocalStorage(`checkbox_${rowNumber}`) === "true";
        checkbox.addEventListener("change", function() {
            saveDataToLocalStorage(`checkbox_${rowNumber}`, this.checked); // Save checkbox state to localStorage
        });
    }

    // Create initial rows
    const numRows = 15;
    for (let i = 1; i <= numRows; i++) {
        createRow(i);
    }
});
