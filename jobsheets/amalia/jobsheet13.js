// Job Sheet 13 - Local Storage
function showAll() {
  var name = localStorage.getItem("js13_name");
  var note = localStorage.getItem("js13_note");
  var visits = localStorage.getItem("js13_visits");

  document.getElementById("nameResult").textContent =
    name ? "Saved name: " + name : "No name saved yet.";
  document.getElementById("noteResult").textContent =
    note ? "Saved note: " + note : "No note saved yet.";
  document.getElementById("counterResult").textContent =
    "You have opened this page " + (visits || 0) + " time(s).";
}

// Count visit (once per page load)
var visits = Number(localStorage.getItem("js13_visits")) || 0;
localStorage.setItem("js13_visits", visits + 1);
showAll();

document.getElementById("saveName").onclick = function () {
  var v = document.getElementById("nameInput").value.trim();
  if (v === "") { alert("Please enter your name."); return; }
  localStorage.setItem("js13_name", v);
  document.getElementById("nameInput").value = "";
  showAll();
};

document.getElementById("clearName").onclick = function () {
  localStorage.removeItem("js13_name");
  showAll();
};

document.getElementById("saveNote").onclick = function () {
  var v = document.getElementById("noteInput").value.trim();
  if (v === "") { alert("Please write a note."); return; }
  localStorage.setItem("js13_note", v);
  document.getElementById("noteInput").value = "";
  showAll();
};

document.getElementById("clearNote").onclick = function () {
  localStorage.removeItem("js13_note");
  showAll();
};

document.getElementById("resetCounter").onclick = function () {
  localStorage.setItem("js13_visits", 0);
  showAll();
};

document.getElementById("clearAll").onclick = function () {
  localStorage.removeItem("js13_name");
  localStorage.removeItem("js13_note");
  localStorage.removeItem("js13_visits");
  showAll();
  document.getElementById("msg").textContent = "Job Sheet 13 data cleared.";
};
