$('input').on('input', function () {
    var v = $(this).val();
    $('div').css('font-size', v + 'px')
    $('span').html(v);
});
