$(function () {

    

    $.getJSON("GetObject.ashx?object=Operations", function (data) {

        var y = 10;

        var k = 5;
        var ky = 70;

        var obj = new Map();

        $.each(data, function (key, val) {

            

            var x = val.TimeStart*k;

            var width = val.TimeEnd * k - val.TimeStart;

            y = y + 15;

            
if (!obj.hasOwnProperty(val.MachineName)) {
    obj[val.MachineName] = Object.keys(obj).length;
}




            jQuery('<div/>', {

                class: "operation",

                style: "left:" + x + "px; top:" + obj[val.MachineName] * ky + "px;",

                text: val.MachineName + " - " + obj[val.MachineName],

                width: width+"px"




            }).appendTo('.container');

        });

    });

});

/*$(function () {


    jQuery('<div/>', {

        class: "operation",

    }).appendTo('.container');


    jQuery('<div/>', {

        class: "operation",

        style: "left:50px; top:13px;"


    }).appendTo('.container');


    $.getJSON("GetObject.ashx?object=CalendarDays", function (data) {


        $.getJSON("GetObject.aspx?object=CalendarDays", function (data) {

            var inc = 0;
            var k = 30;
            var width = 1 * 12 * k;

            

            $.each(data, function (key, val) {

                var left = inc * 12 * k;

                var text = val.descr;

                var id = "id_" + key;

                $("<div/>", {
                    "class": "workshift",
                    style: "left: " + left + "px;width:" + width + "px;",
                    text: val.descr,
                    id: id

                }).appendTo(".container");

                for (var i = 0; i < 12; i++)
                {
                    $("<div/>", {
                        position:left,
                        width: '30px',
                        class: "hour",
                        text: val.descr,
                        id: id

                    }).appendTo("#" + id);
                }

                inc++;
                


            });

        });
      


    });



});
*/