$(document).ready(function(){
  $("button").click(function(){
    $.ajax({
      url: "status.txt",
      success: function(result){
        $("#div1").html(result);
        $("button").text("Loaded Successfully");
      }
    });
  });
});
