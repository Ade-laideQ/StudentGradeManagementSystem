// Student records stored in arrays
let names = [];
let indexNumbers = [];
let mathMarks = [];
let englishMarks = [];
let scienceMarks = [];

// Register student form
const studentForm = document.getElementById("studentForm");
const message = document.getElementById("message");

// Calculate total marks
function calculateTotal(index) {
    return mathMarks[index]
        + englishMarks[index]
        + scienceMarks[index];
}

// Calculate average marks
function calculateAverage(index) {
    return calculateTotal(index) / 3;
}

// Calculate grade
function calculateGrade(average) {
    if (average >= 80) {
        return "A";
    } else if (average >= 70) {
        return "B";
    } else if (average >= 60) {
        return "C";
    } else if (average >= 50) {
        return "D";
    } else {
        return "F";
    }
}

// Register a student
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const indexNumber = document.getElementById("indexNumber").value.trim();

    const math = Number(document.getElementById("math").value);
    const english = Number(document.getElementById("english").value);
    const science = Number(document.getElementById("science").value);

    // Validate student information
    if (!name || !indexNumber) {
        message.textContent = "Please enter the student's name and index number.";
        return;
    }

    if ([math, english, science].some(mark =>
        !Number.isFinite(mark) || mark < 0 || mark > 100
    )) {
        message.textContent = "Marks must be numbers between 0 and 100.";
        return;
    }

    // Prevent duplicate index numbers
    if (indexNumbers.includes(indexNumber)) {
        message.textContent = "This index number already exists.";
        return;
    }

    // Store student information in arrays
    names.push(name);
    indexNumbers.push(indexNumber);
    mathMarks.push(math);
    englishMarks.push(english);
    scienceMarks.push(science);

    const studentIndex = names.length - 1;
    const average = calculateAverage(studentIndex);

    message.textContent =
        "Student registered successfully! Average: " +
        average.toFixed(2) +
        ", Grade: " +
        calculateGrade(average);

    studentForm.reset();

    displayStudents();
});

// Display student records
function displayStudents(records = null) {
    const tableBody = document.getElementById("studentTableBody");

    tableBody.replaceChildren();

    const totalStudents = document.getElementById("totalStudents");

    totalStudents.textContent = names.length;

    // Display all students or the selected search result
    const studentsToDisplay = records === null
        ? names.map((_, index) => index)
        : records;

    studentsToDisplay.forEach(function(index) {
        const row = document.createElement("tr");

        const values = [
            indexNumbers[index],
            names[index],
            mathMarks[index],
            englishMarks[index],
            scienceMarks[index],
            calculateTotal(index),
            calculateAverage(index).toFixed(2),
            calculateGrade(calculateAverage(index))
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            deleteStudent(index);
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// Search for a student
function searchStudent() {
    const searchValue = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();

    if (!searchValue) {
        message.textContent = "Enter an index number to search.";
        return;
    }

    const foundStudents = [];

    for (let i = 0; i < indexNumbers.length; i++) {
        if (indexNumbers[i].toLowerCase() === searchValue) {
            foundStudents.push(i);
        }
    }

    displayStudents(foundStudents);

    message.textContent = foundStudents.length > 0
        ? "Student found."
        : "No student found with that index number.";
}

// Delete a student
function deleteStudent(index) {
    names.splice(index, 1);
    indexNumbers.splice(index, 1);
    mathMarks.splice(index, 1);
    englishMarks.splice(index, 1);
    scienceMarks.splice(index, 1);

    message.textContent = "Student record deleted.";

    displayStudents();
}

// Connect the search button
document.getElementById("searchButton").addEventListener("click", searchStudent);

// Show all records
document.getElementById("showAllButton").addEventListener("click", function() {
    document.getElementById("searchInput").value = "";
    displayStudents();
    message.textContent = "";
});

// Display an empty table when the page loads
displayStudents();