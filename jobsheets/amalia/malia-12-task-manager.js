/* Job Sheet 12 - jQuery Task Manager
   Student: Nur Amalia Safia
   Topics covered: selectors, events, event delegation, DOM manipulation,
   effects (fade / slide), CSS classes, each(), data attributes, localStorage. */

$(document).ready(function () {

  var STORAGE_KEY = "malia12TaskManagerTasks";
  var THEME_KEY = "malia12TaskManagerTheme";
  var currentFilter = "all";

  /* ---------- Helper functions ---------- */

  // Show a short message that fades in and out
  function showMessage(text) {
    $("#message").text(text).stop(true, true).fadeIn(200).delay(1800).fadeOut(400);
  }

  // Build one <li> task element (text() keeps user input safe)
  function buildTask(text, priority, done) {
    var $li = $("<li></li>")
      .addClass("task priority-" + priority)
      .attr("data-priority", priority);

    if (done) {
      $li.addClass("done");
    }

    $li.append($("<span></span>").addClass("badge").text(priority));
    $li.append($("<span></span>").addClass("task-text").text(text));
    $li.append(
      $("<button></button>")
        .addClass("delete-btn")
        .attr({ type: "button", title: "Delete task" })
        .html("&times;")
    );

    return $li;
  }

  // Update the "tasks left" counter and the empty-list note
  function updateCounter() {
    var left = $("#taskList .task:not(.done)").length;
    $("#counter").text(left + (left === 1 ? " task left" : " tasks left"));
    $("#emptyNote").toggle($("#taskList .task").length === 0);
  }

  // Show or hide tasks depending on the search box and the active filter
  function applyView() {
    var query = $.trim($("#searchInput").val()).toLowerCase();

    $("#taskList .task").each(function () {
      var $task = $(this);
      var isDone = $task.hasClass("done");
      var matchesText = $task.find(".task-text").text().toLowerCase().indexOf(query) !== -1;
      var matchesFilter =
        currentFilter === "all" ||
        (currentFilter === "done" && isDone) ||
        (currentFilter === "active" && !isDone);

      $task.toggle(matchesText && matchesFilter);
    });
  }

  // Save every task to the browser (localStorage)
  function saveTasks() {
    var tasks = [];

    $("#taskList .task").each(function () {
      tasks.push({
        text: $(this).find(".task-text").text(),
        priority: $(this).attr("data-priority"),
        done: $(this).hasClass("done")
      });
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      /* storage not available - the app still works without saving */
    }
  }

  // Load saved tasks (or a few sample tasks on the very first visit)
  function loadTasks() {
    var saved = null;

    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      saved = null;
    }

    if (saved === null) {
      saved = [
        { text: "Finish Job Sheet 12", priority: "high", done: false },
        { text: "Practise jQuery selectors", priority: "medium", done: false },
        { text: "Review jQuery effects", priority: "low", done: true }
      ];
    }

    $.each(saved, function (index, task) {
      $("#taskList").append(buildTask(task.text, task.priority, task.done));
    });
  }

  /* ---------- Add a task ---------- */

  function addTask() {
    var text = $.trim($("#taskInput").val());
    var priority = $("#prioritySelect").val();

    if (text === "") {
      showMessage("Please type a task first.");
      $("#taskInput").focus();
      return;
    }

    var duplicate = false;
    $("#taskList .task-text").each(function () {
      if ($(this).text().toLowerCase() === text.toLowerCase()) {
        duplicate = true;
      }
    });

    if (duplicate) {
      showMessage("That task is already on your list.");
      return;
    }

    var $task = buildTask(text, priority, false);
    $("#taskList").prepend($task);

    applyView();
    if ($task.is(":visible")) {
      $task.hide().slideDown(250);
    }

    $("#taskInput").val("").focus();
    updateCounter();
    saveTasks();
    showMessage("Task added.");
  }

  $("#addBtn").click(addTask);

  $("#taskInput").on("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  /* ---------- Complete / delete (event delegation) ---------- */

  $("#taskList").on("click", ".task-text", function () {
    $(this).closest(".task").toggleClass("done");
    updateCounter();
    applyView();
    saveTasks();
  });

  $("#taskList").on("click", ".delete-btn", function () {
    $(this).closest(".task").slideUp(200, function () {
      $(this).remove();
      updateCounter();
      saveTasks();
    });
  });

  // Hover effect using jQuery events
  $("#taskList")
    .on("mouseenter", ".task", function () { $(this).addClass("hovered"); })
    .on("mouseleave", ".task", function () { $(this).removeClass("hovered"); });

  /* ---------- Filter buttons and search ---------- */

  $(".filter").click(function () {
    $(".filter").removeClass("active");
    $(this).addClass("active");
    currentFilter = $(this).data("filter");
    applyView();
  });

  $("#searchInput").on("input keyup", applyView);

  /* ---------- Clear completed ---------- */

  $("#clearBtn").click(function () {
    var $done = $("#taskList .task.done");

    if ($done.length === 0) {
      showMessage("There are no completed tasks to clear.");
      return;
    }

    $done.slideUp(200, function () {
      $(this).remove();
      updateCounter();
      saveTasks();
    });
  });

  /* ---------- Dark / light theme ---------- */

  function setTheme(dark) {
    $("body").toggleClass("dark", dark);
    $("#themeBtn").text(dark ? "Light Mode" : "Dark Mode");
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch (error) { /* ignore */ }
  }

  $("#themeBtn").click(function () {
    setTheme(!$("body").hasClass("dark"));
  });

  /* ---------- Start the app ---------- */

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (error) { /* ignore */ }
  if (savedTheme === "dark") {
    setTheme(true);
  }

  loadTasks();
  updateCounter();
  applyView();
});
