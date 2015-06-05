$.fn.selectMultiple = function(options) {
    options = $.extend({
        getTplOption: function() {
            return $('.templates .js-tpl-select-multiple');
        },
        getTplComponent: function() {
            return $('.templates .js-tpl-escopo-select-multiple');
        }
    }, options);
    $(this).after(options.getTplComponent().clone(true));
    $(this).prepend($(this).next());
    $.each($(this).find('option'), function() {
        $(this).parents('.js-tpl-escopo-select-multiple').append(options.getTplOption().clone(true).atribuir({'val': $(this).val(), 'desc': $(this).text()}));

    });
};
$(document).ready(function() {
    $('select[multiple]').selectMultiple();
});