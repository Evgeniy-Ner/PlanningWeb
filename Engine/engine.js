$(function () {



    $.getJSON("GetObject.aspx?object=CalendarDays", function (data) {

        //alert("Получен ответ :)");

        var items = [];
        var divs = [];

        var color = 'green';

        var green = 'green';
        var blue = 'blue';

        $.each(data, function (key, val) {


            for(var i =0; i< 12; i++)
            {
                jQuery('<div/>', {
                
                    class: "div_hour_cell",
                }).appendTo('#hourses_span');
            }
            


        });

        jQuery('<br/>', {

        }).appendTo('#hourses_span');

        $.each(data, function (key, val) {



            jQuery('<div/>', {

                class: "WorkShift",
                text: val.descr
            }).appendTo('#planning');


        });


        /*
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("body");

        */



    });



});
