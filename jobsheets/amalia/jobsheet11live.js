$(document).ready(function () {

  // 1. Selectors
  $("#selClass").click(function () { $(".demo").css("background-color", "#ffe599"); });
  $("#selId").click(function () { $("#special").css("background-color", "#b6d7a8"); });
  $("#selTag").click(function () { $("p").css("color", "#1f4e79"); });
  $("#selClear").click(function () { $("p").css({ "background-color": "", "color": "" }); });

  // 2. Counter
  var count = 0;
  function showCount() { $("#count").text(count); }
  $("#plus").click(function () { count++; showCount(); });
  $("#minus").click(function () { count--; showCount(); });
  $("#zero").click(function () { count = 0; showCount(); });

  // 3. Accordion
  $(".accordion h3").click(function () {
    $(this).next(".panel").slideToggle();
    $(this).siblings(".panel").slideUp();
  });

  // 4. Form validation
  $("#submitBtn").click(function () {
    var name = $("#fname").val().trim();
    var email = $("#femail").val().trim();
    var ok = true;

    $("#errName, #errEmail, #formMsg").text("");

    if (name === "") {
      $("#errName").text("Name is required.");
      ok = false;
    }
    if (email === "") {
      $("#errEmail").text("Email is required.");
      ok = false;
    } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      $("#errEmail").text("Email format is not valid.");
      ok = false;
    }
    if (ok) {
      $("#formMsg").addClass("success").text("Thank you, " + name + "! Form submitted.");
    }
  });

  // 5. Table: hover highlight and delete row
  $("#tbl tr").hover(
    function () { $(this).addClass("hl"); },
    function () { $(this).removeClass("hl"); }
  );
  $("#tbl").on("click", ".del", function () {
    $(this).closest("tr").fadeOut(400, function () { $(this).remove(); });
  });

  // 6. Character count
  $("#typeBox").keyup(function () {
    $("#charMsg").text("Characters: " + $(this).val().length);
  });

});
