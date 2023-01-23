$(function(){
    $.ajaxSetup({cache:false});
    $("header").load("menu/header.html");
    $("footer").load("menu/footer.html");
});