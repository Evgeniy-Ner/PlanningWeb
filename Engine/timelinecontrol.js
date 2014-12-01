var size = 200;



var scale = 1;

var currentTime = new Date().getTime();
var currentTimeFull = new Date(currentTime).toLocaleTimeString();

var OneHour = 1000 * 60 * 60;

var startTime = currentTime - OneHour * 24;

function ScaleTime(time)
{
    this.time = time;
}

ScaleTime.prototype.local = function()
{
    return new Date(this.time).toLocaleTimeString();
}

var currentTime = new ScaleTime(new Date().getTime());


var startTime = new ScaleTime(currentTime.time - OneHour * 12);
var endTime = new ScaleTime(currentTime.time + OneHour * 12);





$(function () {

    Init();

});


$(window).resize(function () {
    
    Init();

    

});


function Init()
{

    $(".timeline").empty();

    $(".hour").empty();

    $(".minute").empty();


    $("#output").text("");

    $("#timeline_time").text(new Date().toLocaleTimeString());

    
    var containerWidth = $(".container").css("width");

    var count = Math.floor(parseInt(containerWidth) / size);

    $("#output").append(currentTime.local() + " - " + currentTime.time);
    $("#output").append("<br />");
    $("#output").append(startTime.local() + " - " + startTime.time);
    $("#output").append("<br />");
    $("#output").append(endTime.local() + " - " + endTime.time);
    $("#output").append("<br />");
    $("#output").append("width: " + containerWidth);

    $("#output").append("<br />");
    $("#output").append("count: " + count);
    $("#output").append("<br />");
    $("#output").append("size: " + size);
    $("#output").append("<br />");
    $("#output").append("width  size =  " + (parseInt(containerWidth) / size));


    $(".timeline").css("width", containerWidth);

    $(".timeline").text("");

    DrawHoursMarks();
    DrawMinutesMarks();

    if( (size / 60 / 6) > 5)
        DrawSecondsMarks();


    jQuery("<div />", { class: "minutes", text: "1" }).appendTo(".hour");

}

function DrawHoursMarks()
{
    var containerWidth = $(".container").css("width");

    var count = Math.floor(parseInt(containerWidth) / size);

    for (var i = 0; i < count; i++) {

        jQuery('<div/>', {

            class: "hour",

            style: "left: " + i * size + "px",

            width: size + "px"

        }).appendTo(".timeline");

    }

    jQuery('<div/>', {

        class: "hour",

        style: "left: " + count * size + "px",

        width: parseInt(containerWidth) % size + "px"

    }).appendTo(".timeline");

}

function DrawMinutesMarks() {
    
    var minutesSize = size / 60;

    for(var i = 0; i < 60; i++)
    {

        jQuery('<div/>', {

            class: "minute",

            style: "left: " + i * minutesSize + "px",

            width: minutesSize + "px"

        }).appendTo(".hour");
    }

}

function DrawSecondsMarks() {

    var minutesSize = size / 60 / 6;

    for (var i = 0; i < 6; i++) {

        jQuery('<div/>', {

            class: "second",

            style: "left: " + i * minutesSize + "px",

            width: minutesSize + "px"

        }).appendTo(".minute");
    }

}



$("html").keydown(function (event) {

    if (event.which == 109) {
        size -= 50;
        Init();
    }

    if (event.which == 107) {
        size += 50;
        Init();
    }
}
 );