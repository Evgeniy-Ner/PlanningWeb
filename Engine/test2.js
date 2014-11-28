$(function () {

    $('body').css("background-color", "white");
    $(".timeline_time").text(new Date().toLocaleTimeString());

    var timer = $.timer(1000, function () {
        
        $(".timeline_time").text(new Date().toLocaleTimeString() );
    });



    $("#datepicker").datetimepicker({
        lang: 'ru',
        i18n: {
            ru: {
                months: [
                 'Январь', 'Февраль', 'Март', 'Апрель',
                 'Май', 'Июнь', 'Июль', 'Август',
                 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
                ],
                dayOfWeek: [
                 "Вс", "Пн", "Вт", "Ср",
                 "Чт", "Пт", "Сб",
                ]
            }
        },
        timepicker: false,
        inline: true,
        format: 'd.m.Y'
    });


    $("#tabs").tabs();

    $("#tabs").css("font-size", "8pt");
    $("#tabs").css("min-width", "1000px");
    $(".timeline").css("width", parseInt($("#tabs").css("width")) - 15);
    

    $(window).resize(function () {
        $(".timeline").css("width", parseInt($("#tabs").css("width")) - 15);
    });

    


});
