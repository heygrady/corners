///////////////////////////////////////////////////////
// Corners
///////////////////////////////////////////////////////
;(function($, undefined) {
    // set up strings
    var corners = ["top-left", "top-right", "bottom-right", "bottom-left"],
        sides = ["top", "right", "bottom", "left"],
        className = "ui-corners",
        cornerClassName = className + "-corner",
        sideClassName = className + "-side",
        spans = "",
        spanStart  = '<span class="';
    
    // creat the span string
    $.each(corners, function() {
        spans += spanStart + cornerClassName + ' ' + cornerClassName + '-' + this + '"/>';
    });
    $.each(sides, function() {
        spans += spanStart + sideClassName + ' ' + sideClassName + '-' + this + '"/>';
    });

    // add corners/sides to an element
    // wrap the contents with a content div
    function addCorners(el) {
        $(el).wrapInner('<div class="' + cornerClassName + '-content" />').append(spans).addClass(className);
    }

    // create a jQuery plugin for adding in the corners
    $.fn.corners = function() {
        this.not('.' + className).each(function() {
            addCorners(this);
        });
    };
})(jQuery);