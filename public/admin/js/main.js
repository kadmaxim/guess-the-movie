jQuery(document).ready(function ($) {
    $('.btn-danger').click(function () {
        var parent = $(this).parents('tr');
        var filmID = parent.attr('data-id');
        swal({
            title : 'Are you sure?',
            text : "You won't be able to revert this!",
            type : 'warning',
            showCancelButton : true,
            confirmButtonColor : '#3085d6',
            cancelButtonColor : '#d33',
            confirmButtonText : 'Yes, delete it!'
        }).then(function () {
            $.ajax({
                url : '/api/film/' + filmID,
                type : 'DELETE',
                success : function (result) {
                    parent.remove();
                    swal(
                        'Deleted!',
                        'Film has been deleted.',
                        'success'
                    )
                }
            });
        }, console.log);
    });

    $('.btn-info').click(function () {
        var parent = $(this).parents('tr');
        var title = parent.find('.film-title');
        var img = parent.find('.film-img');

        var titleVal = title.find('textarea').val();
        var imgVal = img.find('textarea').val();
        var filmID = parent.attr('data-id');

        if (!parent.hasClass('edit-active')) return;

        $.post('/api/film/' + filmID, { title : titleVal, img : imgVal }, function () {
            parent.removeClass('edit-active');
            swal(
                'Updated!',
                'Film has been updated.',
                'success'
            );
            title.html(titleVal);
            img.html('<img src="' + imgVal + '">');
        });

    });

    $('.films-list tr').dblclick(function () {

        if ($(this).hasClass('edit-active')) return;

        var title = $(this).find('.film-title');
        var img = $(this).find('.film-img');
        $(this).addClass('edit-active');

        title.html('<textarea class="form-control" rows="3">' + title.text() + '</textarea>');
        img.html('<textarea class="form-control" rows="3">' + img.find('img').attr('src') + '</textarea>');
    });
});
