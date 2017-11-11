const spinner = '&nbsp;&nbsp<i class="fa fa-spinner fa-spin">';
const addForm = $('#add_student_form');
$(document).ready(function ()
{
    addForm.submit(function (e) {
        let btn = $(e.target).find('button[type="submit"]');
        let btnHtml = btn.html();
        e.preventDefault();
        btn.attr('disabled',true).append(spinner);
        $.ajax({
            method  : 'POST',
            url     : '/add',
            data    : addForm.serialize(),
            success: function(response)   // A function to be called if request succeeds
            {
                try {
                    response = JSON.parse(response);
                    if(response.status === 200) {
                        location.href = `/add-success/${response.data.reg_number}`;
                    }else {
                        btn.attr('disabled',false).html(btnHtml);
                        if(response.status === 400){
                            for (i in response.data) {
                                addForm.find(`input[name=${i}]`).next('.info').children('.def').fadeOut();
                                addForm.find(`input[name=${i}]`).addClass('err').next('.info').children('.err').fadeIn(800).html(`<i class="fa fa-exclamation-circle"></i> ${response.data[i]}`);

                                addForm.find('.errorBox .message').html(`<i class="fa fa-exclamation-circle"></i> You have ${Object.keys(response.data).length} input errors.`).fadeIn(800);
                            }

                        }else {
                            addForm.find('.errorBox .message').html(`<i class="fa fa-exclamation-circle"></i> ${response.data}`).fadeIn(800);
                        }
                    }
                } catch (e) {
                    btn.attr('disabled',false).html(btnHtml);
                    addForm.find('.errorBox .message').html(`<i class="fa fa-exclamation-circle"></i> Request processing failed. Please retry.`).fadeIn(800);
                }
            }
        });
    });
});
