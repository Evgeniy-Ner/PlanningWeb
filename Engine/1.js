
function ScaleTime(time) {
    this.time = time;
}

ScaleTime.prototype.local = function () {
    return new Date(this.time).toLocaleTimeString();
}

ScaleTime.prototype.date = function () {
    return new Date(this.time).toLocaleDateString();
}



var OneMilliseconds = 60;
var OneCentiseconds = 10 * 60;
var OneSecond = 1000 * 60;
var OneMinute = OneSecond * 60;
var OneHour = OneMinute * 60;
var OneDay = OneHour * 24;

var scale = OneHour;

var period = 0;

var startTime;
var endTime;

var currentTime = new ScaleTime(new Date().getTime());

var mainWidth;
var startMilliSeconds;
var endMilliSeconds;

var startTime;
var endTime;

var DayPixels;
var CountDays;

var HourPixels;
var CountHours;

var MinutePixels;
var CountMinutes;
var CountSeconds;

var CountCentisecond;



$(function () {

    Init();

});


function Init() {

    $("#main").empty();

    $("#trace_scale").empty();

    $(".day").empty();
    $(".hour").empty();

    $("#output").empty();

    

    $("#main").css("width", "1200px");

    mainWidth = parseInt($(".main").css("width"));
    
    period = parseInt(scale * parseInt($(".main").css("width")) / 10);

    startMilliSeconds = parseInt(currentTime.time) - period / 2;
    endMilliSeconds = parseInt(currentTime.time) + period / 2;

    startTime = new ScaleTime(startMilliSeconds);
    endTime = new ScaleTime(endMilliSeconds);

    CountDays = (endTime.time - startTime.time) / OneDay;

    CountHours = (endTime.time - startTime.time) / OneHour;

    CountMinutes = (endTime.time - startTime.time) / OneMinute;

    CountSeconds = (endTime.time - startTime.time) / OneSecond;

    CountCentisecond = (endTime.time - startTime.time) / OneCentiseconds;

    CountMillisecond = (endTime.time - startTime.time) / OneMilliseconds;
    
    Draw("day", "main", 2560, CountDays);

    Draw("hour", "day", 24, CountHours);

    Draw("minute", "hour", 60, CountMinutes);

    Draw("second", "minute", 60, CountSeconds);

    Draw("centisecond", "second", 100, CountCentisecond);

    Draw("millisecond", "centisecond", 10, CountMillisecond);

    TraceParams();


   
}


function TraceParams()
{
    var where = "#output";

    //$(where).empty();

    $(where).append("<p> mainWidth: " + mainWidth + "</p>");
    $(where).append("<p> period: " + period + "</p>");
    $(where).append("<p> currentTime: " + currentTime.time + "</p>");

    $(where).append("<p> startMilliSeconds: " + startMilliSeconds + "</p>");
    
    $(where).append("<p> startTime: " + startTime.date() + " "+ startTime.local() +  "</p>");
    $(where).append("<p> endTime: " + endTime.date() + " " + endTime.local() + "</p>");

    $(where).append("<p> CountDays: " + CountDays + "</p>");

    $(where).append("<p> DayPixels: " + DayPixels + "</p>");

    $(where).append("<p> CountHours: " + CountHours + "</p>");

    $(where).append("<p> HourPixels: " + HourPixels + "</p>");

    $(where).append("<p> CountMinutes: " + CountMinutes + "</p>");

    $(where).append("<p> MinutePixels: " + MinutePixels + "</p>");

    $(where).append("<p> scale: " + new Date(scale).getDate() + "days, " + new Date(scale).toLocaleTimeString() + "</p>");
}



$("html").keydown(function (event) {

    if (event.which == 109) {
        scale = scale + scale / 20;
        Init();
    }

    if (event.which == 107) {
        scale = scale - scale / 20;
        Init();
    }
}
 );




function Draw(what_insert, where_insert, fullCount, placed)
{
    var pixels = mainWidth / placed;

    var multipulir = Math.floor(10 / pixels + 1);

    if (multipulir <= 10) {

        $('#output').append("<p> multipulir: " + multipulir + "</p>");
        $('#output').append("<p> width: " + pixels * 1 * multipulir + "</p>");

        $("#output").append("" + what_insert + ": ");


        var nCount = (placed > fullCount) ? fullCount : placed;

        for (var i = 0; i < nCount / multipulir; i++) {
            jQuery('<div/>', {

                class: what_insert,

                style: "left:" + pixels * i * multipulir + "px; background-color: rgb(" + ((Math.random() * 256) + 1) + "," + ((Math.random() * 256) + 1) + "," + ((Math.random() * 256) + 1) + ")",

                width: pixels * multipulir + "px",

                text: ((i) * multipulir),

                id: (i) * multipulir + what_insert

            }).appendTo("." + where_insert);

            $("#output").append(i * multipulir + " ");
        }

        $("." + what_insert).mouseover(function () {
            
            var color = "white";
            switch($(this).attr("class"))
            {
                case "day":
                    color = "lightblue";
                    break;
                case "hour":
                    color = "yellow";
                    break;

                case "minute":
                    color = "lightgreen";
                    break;

                case "second":
                    color = "lightgray";
                    break;

                case "centisecond":
                    color = "magenta";
                    break;
                case "millisecond":
                    color = "chartreuse";
                    break;
            }

            $(this).css("background-color", color);


                
            
        });

        $("." + what_insert).mouseleave(function () {

            $(this).css("background-color", "");

            $("#header").text($(this).attr("class"));
            
        });
    }
}