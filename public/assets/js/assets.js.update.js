const spinner = '&nbsp;&nbsp<i class="fa fa-spinner fa-spin">';
const updateForm = $('#update_student_form');
$(document).ready(function ()
{
    updateForm.submit(function (e) {
        let btn = $(this).find('button[type="submit"]');
        let btnHtml = btn.html();
        btn.attr('disabled',true).append(spinner);
        e.preventDefault();
        $.ajax({
            method  : 'POST',
            url     : '/update',
            data    : updateForm.serialize(),
            success: function(response)   // A function to be called if request succeeds
            {
                try {
                    response = JSON.parse(response);
                    if(response.status === 200) {
                        btn.attr('disabled',false).html(btnHtml);
                        location.href = `/update-success/${response.data.reg_number}`;
                    }else {
                        btn.attr('disabled',false).html(btnHtml);
                        if(response.status === 400){
                            for (i in response.data) {
                                updateForm.find(`input[name=${i}]`).next('.info').children('.def').fadeOut();
                                updateForm.find(`input[name=${i}]`).addClass('err').next('.info').children('.err').fadeIn(800).html(`<i class="fa fa-exclamation-circle"></i> ${response.data[i]}`);

                                updateForm.find('.errorBox .message').html(`<i class="fa fa-exclamation-circle"></i> You have ${Object.keys(response.data).length} input errors.`).fadeIn(800);
                            }

                        }else {
                            updateForm.find('.errorBox .message').html(`<i class="fa fa-exclamation-circle"></i> ${response.data}`).fadeIn(800);
                        }
                    }
                } catch (e) {
                    btn.attr('disabled',false).html(btnHtml);
                    updateForm.find('.errorBox .message').html(`<i class="fa fa-exclamation-circle"></i> Request processing failed. Please retry.`).fadeIn(800);
                }
            }
        });
    });
});
