$(document).ready(function(){
    $("ul li:nth-child(1) span").click(function() {
        $("#addTag").css({"visibility": "visible","margin-bottom": "40px","margin-right": "500px"}); 
        $("#addIng").css({"visibility": "visible", "margin-bottom": "40px", "margin-right": "500px"});
    });

    $("ul li:nth-child(2) span").click(function() {
        $("#addTag").css({"visibility": "visible","margin-bottom": "40px","margin-right": "500px"}); 
        $("#addIng").css({"visibility": "visible", "margin-bottom": "40px", "margin-right": "500px"});
    });

    $("ul li:nth-child(3) span").click(function() {
        $("#addIng").css({"visibility": "visible", "margin-bottom": "40px", "margin-right": "500px"});
        $("#addTag").css({"visibility": "visible","margin-bottom": "40px","margin-right": "500px"}); 
    });
    
});