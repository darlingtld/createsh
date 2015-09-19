/**
 * Created by apple on 15/9/19.
 */
$(function () {
    $('img').on('click', function () {
        var src = $(this).attr('src');
        goToZoom(src);
    })
    function goToZoom(picurl, picurlZoom) {
        var pic = picurlZoom == null ? picurl : picurlZoom;
        location.href = 'picture_zoom.html?pic=' + pic
    }
})