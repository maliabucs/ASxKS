// Job Sheet 14 - Local Storage
function showAll() {
  var name = localStorage.getItem("js14_name");
  var note = localStorage.getItem("js14_note");
  var visits = localStorage.getItem("js14_visits");

  document.getElementById("nameResult").textContent =
    name ? "Saved name: " + name : "No name saved yet.";
  document.getElementById("noteResult").textContent =
    note ? "Saved note: " + note : "No note saved yet.";
  document.getElementById("counterResult").textContent =
    "You have opened this page " + (visits || 0) + " time(s).";
}

// Count visit (once per page load)
var visits = Number(localStorage.getItem("js14_visits")) || 0;
localStorage.setItem("js14_visits", visits + 1);
showAll();

document.getElementById("saveName").onclick = function () {
  var v = document.getElementById("nameInput").value.trim();
  if (v === "") { alert("Please enter your name."); return; }
  localStorage.setItem("js14_name", v);
  document.getElementById("nameInput").value = "";
  showAll();
};

document.getElementById("clearName").onclick = function () {
  localStorage.removeItem("js14_name");
  showAll();
};

document.getElementById("saveNote").onclick = function () {
  var v = document.getElementById("noteInput").value.trim();
  if (v === "") { alert("Please write a note."); return; }
  localStorage.setItem("js14_note", v);
  document.getElementById("noteInput").value = "";
  showAll();
};

document.getElementById("clearNote").onclick = function () {
  localStorage.removeItem("js14_note");
  showAll();
};

document.getElementById("resetCounter").onclick = function () {
  localStorage.setItem("js14_visits", 0);
  showAll();
};

document.getElementById("clearAll").onclick = function () {
  localStorage.removeItem("js14_name");
  localStorage.removeItem("js14_note");
  localStorage.removeItem("js14_visits");
  showAll();
  document.getElementById("msg").textContent = "Job Sheet 14 data cleared.";
};
