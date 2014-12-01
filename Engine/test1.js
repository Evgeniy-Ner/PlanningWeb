
var workshop = 1;

var k = 2.0;

var startX = 150;

var constTime = 1415854800000 - ((1000 * 60) * 60);

var containerShow = '.container2';
var containerHide = '.container';

$(function () {

    Init();

});


// Вешаем евент:

$("html").mousemove(function (event) {


    $("#vertical").css("left", event.pageX + "px");


    $("#output").text(new Date(constTime + (event.pageX - startX) * 1000 * 60 / k).toLocaleString());

});

$("html").keydown(function (event) {

    if (event.which == 109) {
        k -= 0.1;
        Init();
    }

    if (event.which == 107) {
        k += 0.1;
        Init();
    }
}
 );


function Init()
{

    
    

    $(containerHide).empty();
    $("#info").empty();

    $("#output").empty();

    //$("#header_info").empty();

    $("#header_info").text(".");

    

    var today = new Date();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    var str = "/Date(1415914732000)/";


    $.getJSON("GetObject.ashx?object=PlanOperations&workshop=" + workshop + "&fromDate=" + $("#date_from").val() + "&toDate=" + $("#date_to").val(), function (data) {

        var y = 10;
         

        var ky = 70;

        var obj = new Map();

        var id = 0;

        $.each(data, function (key, val) {

            

            if (val.DateBgnPlan != null) {

                id++;

                var timeX = ((val.DateBgnPlan.match(/\d+/) - constTime) / 1000 / 60) * k;

                var timeW = ((val.DateEndPlan.match(/\d+/) - val.DateBgnPlan.match(/\d+/)) / 1000 / 60) * k;


                // if (!obj.hasOwnProperty(val.Machine)) {
                if (!(val.Machine in obj)) {
                    obj[val.Machine] = Object.keys(obj).length;
                }

                jQuery('<div/>', {

                    class: "operation",

                    style: "left:" + (timeX + startX) + "px; top:" + obj[val.Machine] * ky + "px;",

                    text: "",

                    width: timeW + "px",

                    id: id + "_rect"

                }).appendTo(containerHide);

                $(".operation").draggable({ revert: true });

                $(".operation").mouseover(function () {
                    
                    $(".info").css("background-color", "white");
                    //$(".info:hover").css("background-color", "yellow");

                    $("#" + parseInt($(this).attr("id")) + "_info").css("background-color", "red");
                    
                });

                $(".info").mouseover(function () {

                    $(".info").css("background-color", "white");
                    $(this).css("background-color", "yellow");

                    $(".operation").css("background-color", "red");
                    $("#" + parseInt($(this).attr("id")) + "_rect").css("background-color", "blue");

                });



                jQuery('<div/>', {

                    id: id + "_info",

                    text: val.Machine + " " + val.OrderNumber + " " + new Date(val.DateBgnPlan.match(/\d+/) * 1).toLocaleString(),

                    class: "info"

                }).appendTo('#info1');


            }



        });


        $.each(Object.keys(obj), function (key, val) {

            

            jQuery('<div/>', {

                class: "machine",

                style: "left:" + 0 + "px; top:" + key * ky + "px;",

                text: val





            }).appendTo(containerHide);

        });

        for (var i = 0; i < 240; i++) {

            var t = new Date(constTime + (i * 60 * k) * 1000 * 60 / k).getHours();

            jQuery('<div/>', {

                class: "hour",

                style: "left:" + (i * 60 * k + startX) + "px; top:-40px;",

                text: t





            }).appendTo(containerHide);

            
        }

        $("#header_info").append(new Date(constTime * 1).toLocaleString());

        

        
        $(containerHide).show();
        $(containerShow).hide();

        var temp = containerHide;

        containerHide = containerShow;

        containerShow = temp;







    });



    

}

function ChangeWorkShop(val)
{
    

    $("button").css("background-color", "rgb(221, 221, 221)");

    $(val).css("background-color", "yellow");



    workshop = val.value - 1;

    Init();

}


function Obnova()
{

    constTime = (new Date($("#date_from").val())).getTime();

    Init();
}


/*
var someInt = 0;

var timer = $.timer(1000, function () {

    someInt++;

    if(someInt%2 == 0)
        $(".operation").css("background-color", "mediumvioletred");
    else
        $(".operation").css("background-color", "red");



});*/