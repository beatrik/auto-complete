$(document).ready(function() {
    $('.tabs-container .links a').click(function(e) {
        $(this).parent("li").addClass("active").siblings().removeClass("active");

        $('.tabs-container .tab').removeClass("active");

        var currentTab =  $(this).attr('href');
        $('.tabs-container .tab' + currentTab).addClass("active");

        e.preventDefault(); //remove the #tabx from the URL
    })
})