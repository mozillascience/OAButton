$(document).ready(function() {

    // Highlight some node. This ought to be moved to some common JS
    $.fn.animateHighlight = function(highlightColor, duration) {
        var highlightBg = highlightColor || "#FFFF9C";
        var animateMs = duration || 1500;
        var originalBg = this.css("backgroundColor");
        this.stop().css("background-color",
        highlightBg).animate({backgroundColor:
            originalBg}, animateMs);
    };

    // Bind submission form
    $('#form-bookmarklet').ajaxForm({ 
        target:     '#divToUpdate',
        dataType:   'json',
        url:        '/api/signin/',
        error:      function(ctx) {
            var errors = JSON.parse(ctx.responseText).errors;

            if ('email' in errors) {
                $('#id_email').animateHighlight("#dd0000", 1000);
            }

            if ('name' in errors) {
                $('#id_name').animateHighlight("#dd0000", 1000);
            }

            if ('confirm_public' in errors) {
                $('label.confirm-label').animateHighlight("#dd0000", 1000);
            }
        },
        success:    function(responseJSON, statusText, xhr, formElem) {

            var bookmarklet = $('#bookmarklet .content');
            var dialog = $('#bookmarklet-modal');

            // Set URL from service response
            $('.btn-primary', bookmarklet).attr('href', 
                "javascript:document.getElementsByTagName('body')[0]" +
                ".appendChild(document.createElement('script'))" +
                ".setAttribute('src','"+responseJSON['url']+"');"
            );

            // Show the new bookmarklet and instructions, roll up form
            $('#bookmarklet').show();
            $('#form-bookmarklet').slideUp();
            dialog.modal();

        } // -success
    }); // -ajaxForm

    // Scrollspy effects
    $('body').on('activate.bs.scrollspy', function (e) {
      console.log(e);
    });

    $('#map .underlay').fadeIn();

    var midpoint = $('.thumbnails').width() / 2;
    $('.thumbnails li').each(function() {
        if ($(this).position().left >= midpoint) {
            $(this).addClass("right");
        }
    });

    $('.thumbnails a.thumb').bind('touchstart', function(e){
        $(this).parent().addClass('hover');
        e.stopPropagation();
    }).bind('touchend', function(e){
        $(this).parent().parent().find('.hover').removeClass('hover');
        e.stopPropagation();
    });

}); 
