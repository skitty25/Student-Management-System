// Store students in localStorage
let students = JSON.parse(localStorage.getItem('students')) || [];

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

// Function to save students to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to add a new student
function addStudent(studentID, name, age, grade) {
    const student = {
        id: Date.now(), // Simple way to generate unique id
        studentID,
        name,
        age,
        grade
    };
    students.push(student);
    saveStudents();
    displayStudents();
}

// Function to delete a student
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    saveStudents();
    displayStudents();
}

// Function to edit a student
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('name').value = student.name;
        document.getElementById('age').value = student.age;
        document.getElementById('grade').value = student.grade;
        
        // Remove the old student entry
        deleteStudent(id);
        
        // Focus on the name input
        document.getElementById('name').focus();
    }
}

// Function to display students in the table
function displayStudents() {
    studentTable.innerHTML = '';
    
    students.forEach(student => {
        const row = studentTable.insertRow();
        row.innerHTML = `
            <td>${student.studentID}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
    });
}

// Handle form submission
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const studentID = document.getElementById('studentID').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    
    addStudent(studentID, name, age, grade);
    
    // Reset form
    studentForm.reset();
});

// Initial display
displayStudents();