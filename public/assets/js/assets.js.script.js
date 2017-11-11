$(document).ready(function ()
{
    $(function() //Toddle element using id
    {
        $('body').on('click','[data-toggle]',function (e) {
            let targ = $(this).data('toggle');
            $(targ).toggle();
        });
    });

    $(function () //toggle label.hide element
    {
        $('form').find('input').on('focus blur',function (e) {
            $(this).prev('label.hide').toggle();
        });

    });

    $(function () //clear input error on input focus
    {
        $('form').find('input').on('focus', function (e) {
            $(this).removeClass('err');
            $(this).next('.info').children('.err').fadeOut().html('');
            $(this).next('.info').children('.def').fadeIn(800);
            $(this).parents('form').find('.errorBox').children('.message').fadeOut(1000).html('');
        });

    })
});
