// Job Sheet 14 - Session Storage
function showAll() {
  var name = sessionStorage.getItem("js14_name");
  var note = sessionStorage.getItem("js14_note");
  var visits = sessionStorage.getItem("js14_visits");

  document.getElementById("nameResult").textContent =
    name ? "Saved name: " + name : "No name saved yet.";
  document.getElementById("noteResult").textContent =
    note ? "Saved note: " + note : "No note saved yet.";
  document.getElementById("counterResult").textContent =
    "You have viewed this page " + (visits || 0) + " time(s).";
}

// Count visit (once per page load)
var visits = Number(sessionStorage.getItem("js14_visits")) || 0;
sessionStorage.setItem("js14_visits", visits + 1);
showAll();

document.getElementById("saveName").onclick = function () {
  var v = document.getElementById("nameInput").value.trim();
  if (v === "") { alert("Please enter your name."); return; }
  sessionStorage.setItem("js14_name", v);
  document.getElementById("nameInput").value = "";
  showAll();
};

document.getElementById("clearName").onclick = function () {
  sessionStorage.removeItem("js14_name");
  showAll();
};

document.getElementById("saveNote").onclick = function () {
  var v = document.getElementById("noteInput").value.trim();
  if (v === "") { alert("Please write a note."); return; }
  sessionStorage.setItem("js14_note", v);
  document.getElementById("noteInput").value = "";
  showAll();
};

document.getElementById("clearNote").onclick = function () {
  sessionStorage.removeItem("js14_note");
  showAll();
};

document.getElementById("resetCounter").onclick = function () {
  sessionStorage.setItem("js14_visits", 0);
  showAll();
};

document.getElementById("clearAll").onclick = function () {
  sessionStorage.removeItem("js14_name");
  sessionStorage.removeItem("js14_note");
  sessionStorage.removeItem("js14_visits");
  showAll();
  document.getElementById("msg").textContent = "Job Sheet 14 data cleared.";
};
