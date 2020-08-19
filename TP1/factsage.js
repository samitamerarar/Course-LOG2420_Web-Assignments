//default page to load
$(document).ready(function() {
  $('#General').click();
});

//Info -> General page
$("#General").click(function(){
  $("#site-loader").load("ressources/websites/fs_general.php");
});

//Calculate -> Reaction page
$("#Reaction").click(function(){
  $("#site-loader").load("ressources/websites/fs_reaction.php");
});
