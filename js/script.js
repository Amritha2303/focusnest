// ---------- TO DO LIST ----------

let tasks = [];

function addTask(){
let input = document.getElementById("taskInput");
if(!input) return;

let task = input.value;

if(task === "") return;

tasks.push({
text: task,
done: false
});

input.value = "";

saveTasks();
renderTasks();
}

function renderTasks(){
let list = document.getElementById("taskList");
if(!list) return;

list.innerHTML = "";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

let checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = task.done;

checkbox.onchange = function(){
tasks[index].done = checkbox.checked;
saveTasks();
};

let span = document.createElement("span");
span.textContent = task.text;

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.onclick = function(){
tasks.splice(index,1);
saveTasks();
renderTasks();
};

li.appendChild(checkbox);
li.appendChild(span);
li.appendChild(deleteBtn);

list.appendChild(li);

});
}

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
let stored = localStorage.getItem("tasks");

if(stored){
tasks = JSON.parse(stored);
}

renderTasks();
}

loadTasks();



// ---------- POMODORO TIMER ----------

let time = 1500;
let timer;

function startTimer(){

if(timer) return;

timer = setInterval(function(){

let display = document.getElementById("time");
if(!display) return;

let minutes = Math.floor(time / 60);
let seconds = time % 60;

display.textContent =
minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

time--;

if(time < 0){
clearInterval(timer);
timer = null;
alert("Time's up!");
}

},1000);

}

function pauseTimer(){
clearInterval(timer);
timer = null;
}

function resetTimer(){
clearInterval(timer);
timer = null;

time = 1500;

let display = document.getElementById("time");
if(display){
display.textContent = "25:00";
}
}


// ---------- EXAM COUNTDOWN ----------

let exams = [];

function addExam(){

let name = document.getElementById("examName");
let date = document.getElementById("examDate");

if(!name || !date) return;

if(name.value === "" || date.value === "") return;

exams.push({
name: name.value,
date: date.value
});

name.value = "";
date.value = "";

saveExams();
renderExams();
}

function renderExams(){

let list = document.getElementById("examList");
if(!list) return;

list.innerHTML = "";

exams.forEach((exam,index)=>{

let li = document.createElement("li");

let today = new Date();
let examDate = new Date(exam.date);

let diff = examDate - today;
let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

li.textContent = exam.name + " - " + days + " days left";

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.onclick = function(){
exams.splice(index,1);
saveExams();
renderExams();
};

li.appendChild(deleteBtn);

list.appendChild(li);

});

}

function saveExams(){
localStorage.setItem("exams", JSON.stringify(exams));
}

function loadExams(){

let stored = localStorage.getItem("exams");

if(stored){
exams = JSON.parse(stored);
}

renderExams();
}

loadExams();


// ---------- NOTES ----------

let notes = [];

function addNote(){

let input = document.getElementById("noteInput");
let fileInput = document.getElementById("fileInput");

if(!input) return;

let file = fileInput.files[0];

let note = {
text: input.value,
file: file ? URL.createObjectURL(file) : null,
fileName: file ? file.name : null
};

notes.push(note);

input.value = "";
fileInput.value = "";

saveNotes();
renderNotes();
}

function renderNotes(){

let container = document.getElementById("notesContainer");

if(!container) return;

container.innerHTML = "";

notes.forEach((note,index)=>{

let div = document.createElement("div");

let text = document.createElement("p");
text.textContent = note.text;

div.appendChild(text);

if(note.file){

let link = document.createElement("a");
link.href = note.file;
link.textContent = note.fileName;
link.target = "_blank";

div.appendChild(link);

}

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.onclick = function(){
notes.splice(index,1);
saveNotes();
renderNotes();
};

div.appendChild(deleteBtn);

container.appendChild(div);

});

}

function saveNotes(){
localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes(){

let stored = localStorage.getItem("notes");

if(stored){
notes = JSON.parse(stored);
}

renderNotes();
}

loadNotes();


// ---------- MARKS TRACKER ----------

let marksData = [];

function addMarks(){

let subject = document.getElementById("subject");
let marks = document.getElementById("marks");
let total = document.getElementById("total");

if(!subject || !marks || !total) return;

if(subject.value === "" || marks.value === "" || total.value === "" || total.value == 0) return;

let percentage = ((Number(marks.value) / Number(total.value)) * 100).toFixed(1);

marksData.push({
subject: subject.value,
marks: marks.value,
total: total.value,
percentage: percentage
});

subject.value = "";
marks.value = "";
total.value = "";

saveMarks();
renderMarks();
}

function renderMarks(){

let table = document.getElementById("marksTable");
if(!table) return;

table.innerHTML = `
<tr>
<th>Subject</th>
<th>Marks</th>
<th>Total</th>
<th>%</th>
<th>Delete</th>
</tr>
`;

marksData.forEach((item,index)=>{

let row = table.insertRow();

row.insertCell(0).textContent = item.subject;
row.insertCell(1).textContent = item.marks;
row.insertCell(2).textContent = item.total;
row.insertCell(3).textContent = item.percentage + "%";

let deleteCell = row.insertCell(4);

let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.onclick = function(){
marksData.splice(index,1);
saveMarks();
renderMarks();
};

deleteCell.appendChild(deleteBtn);

});

}

function saveMarks(){
localStorage.setItem("marks", JSON.stringify(marksData));
}

function loadMarks(){

let stored = localStorage.getItem("marks");

if(stored){
marksData = JSON.parse(stored);
}

renderMarks();
}

loadMarks();