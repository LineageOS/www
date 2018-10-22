var rotation = 0;
var scrollLoc = $(document).scrollTop();

$(window).on("scroll", function() {
    var newLoc = $(document).scrollTop();
    var diff = (scrollLoc - newLoc) / 3;
    rotation += diff, scrollLoc = newLoc;
    var rotationStr = "rotate(" + rotation + "deg)";

    $("#rotate-on-scroll").css({
        "-webkit-transform": rotationStr,
        "-moz-transform": rotationStr,
        "transform": rotationStr
    });
});