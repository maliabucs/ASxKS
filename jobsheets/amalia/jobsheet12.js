$(document).ready(function () {

  // 1. Hide / Show / Toggle
  $("#btnHide").click(function () { $("#box1").hide(); });
  $("#btnShow").click(function () { $("#box1").show(); });
  $("#btnToggle").click(function () { $("#box1").toggle(); });

  // 2. Fade and Slide
  $("#btnFadeOut").click(function () { $("#box2").fadeOut(1000); });
  $("#btnFadeIn").click(function () { $("#box2").fadeIn(1000); });
  $("#btnSlide").click(function () { $("#box2").slideToggle(); });

  // 3. Text and CSS class
  $("#btnText").click(function () {
    $("#para").text("The paragraph text has been changed by jQuery!");
  });
  $("#btnClass").click(function () { $("#para").toggleClass("highlight"); });

  // 4. Add / remove list item
  $("#btnAdd").click(function () {
    var value = $("#itemInput").val().trim();
    if (value === "") {
      alert("Please type something first.");
      return;
    }
    $("#myList").append("<li>" + $("<div>").text(value).html() + "</li>");
    $("#itemInput").val("");
  });
  $("#btnRemove").click(function () { $("#myList li:last").remove(); });

  // 5. Animate
  $("#btnAnimate").click(function () {
    $("#animbox").animate({ left: "250px", opacity: 0.5 }, 1000);
  });
  $("#btnReset").click(function () {
    $("#animbox").animate({ left: "0px", opacity: 1 }, 500);
  });

  // 6. Mouse events
  $("#hoverBox").mouseenter(function () {
    $(this).css("background-color", "#9fc5e8");
    $("#msg").text("Mouse entered the box");
  });
  $("#hoverBox").mouseleave(function () {
    $(this).css("background-color", "#ffd966");
    $("#msg").text("Mouse left the box");
  });
  $("#hoverBox").dblclick(function () {
    $("#msg").text("You double-clicked the box!");
  });

});
