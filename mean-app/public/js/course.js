$(function () {


});



function showModel() {
    $("#myModal").modal('show');
}

function show(x) {
    if (x === 2) {
        $(".course-sections").css("display", " inline-block");
        $(".course-overview").css("display", "none");
        $("#overview").removeClass("active").addClass("");
        $("#chapter").addClass("active");
    }
    else if (x === 1) {
        $(".course-sections").css("display", "none");
        $(".course-overview").css("display", "inline-block");
        $("#overview").removeClass("").addClass("active");
        $("#chapter").removeClass("active").addClass("");
    }

}