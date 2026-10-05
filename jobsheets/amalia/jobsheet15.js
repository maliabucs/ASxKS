// Job Sheet 15 - Session Storage
function showAll() {
  var name = sessionStorage.getItem("js15_name");
  var note = sessionStorage.getItem("js15_note");
  var visits = sessionStorage.getItem("js15_visits");

  document.getElementById("nameResult").textContent =
    name ? "Saved name: " + name : "No name saved yet.";
  document.getElementById("noteResult").textContent =
    note ? "Saved note: " + note : "No note saved yet.";
  document.getElementById("counterResult").textContent =
    "You have viewed this page " + (visits || 0) + " time(s).";
}

// Count visit (once per page load)
var visits = Number(sessionStorage.getItem("js15_visits")) || 0;
sessionStorage.setItem("js15_visits", visits + 1);
showAll();

document.getElementById("saveName").onclick = function () {
  var v = document.getElementById("nameInput").value.trim();
  if (v === "") { alert("Please enter your name."); return; }
  sessionStorage.setItem("js15_name", v);
  document.getElementById("nameInput").value = "";
  showAll();
};

document.getElementById("clearName").onclick = function () {
  sessionStorage.removeItem("js15_name");
  showAll();
};

document.getElementById("saveNote").onclick = function () {
  var v = document.getElementById("noteInput").value.trim();
  if (v === "") { alert("Please write a note."); return; }
  sessionStorage.setItem("js15_note", v);
  document.getElementById("noteInput").value = "";
  showAll();
};

document.getElementById("clearNote").onclick = function () {
  sessionStorage.removeItem("js15_note");
  showAll();
};

document.getElementById("resetCounter").onclick = function () {
  sessionStorage.setItem("js15_visits", 0);
  showAll();
};

document.getElementById("clearAll").onclick = function () {
  sessionStorage.removeItem("js15_name");
  sessionStorage.removeItem("js15_note");
  sessionStorage.removeItem("js15_visits");
  showAll();
  document.getElementById("msg").textContent = "Job Sheet 15 data cleared.";
};
