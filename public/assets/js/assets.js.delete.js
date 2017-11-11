const spinner = '<i class="fa fa-spinner fa-spin">';
$

$(document).ready(() =>{
    $('body').on('click','[data-delete]',(e)=>{
        var targ        = $(e.currentTarget);
        var targHTML     = targ.html();
        var reg_number  = targ.data('delete');

        //disable button
        targ.html(spinner).attr('disabled',true);

        //send delete request
        $.ajax({
            method : 'GET',
            url    : `/delete/${reg_number}`,
            success : (response) => {
                try {
                    response = JSON.parse(response);
                    if (response.status === 200) {
                        location.reload(true);
                    }else {
                        targ.html(targHTML).attr('disabled',false);
                        console.log(response.data);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        });
    });
});
