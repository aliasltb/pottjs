(function (window, $) {

    var data = {};
    var form;

    var buildList = function (entries) {
        $.each(entries, function (k,t) {
            if(t.data.thumbnail == '' || t.data.thumbnail == 'self' ) return;

            var entry = $("<a />", {
                class: 'entry',
                href: t.data.url,
                target: '_blank'
            }).data('score', t.data.score).data('score', t.data.score).data('ups', t.data.ups).data('created', t.data.created);

            var figure = $("<figure />");
            $("<img />", {
                    src: t.data.thumbnail
            }).appendTo(figure);
            $("<figcaption />").html(t.data.title).appendTo(figure);

            entry.append(figure);
            $('#container').append(entry);
        });

    };

    var handleOnLoad = function (res) {
        var entries = res.data.children;

        buildList(entries);
    };

    var getJSON = function(sub, cat, limit) {
        var url = 'https://www.reddit.com/r/'+sub+'/'+cat+'.json';

        $.ajax({
            url: url,
            data: {
                'g': 'GLOBAL',
                'limit': limit
            },
            success: handleOnLoad,
            dataType: 'json'
        });
    };

    var init = function() {
        form = document.querySelector('#filter');
        form.addEventListener('submit', function(e)  {
            var formData = new FormData(form);
            var subreddit = formData.get('subreddit');
            var category = formData.get('category');
            var limit = formData.get('limit');

            getJSON(subreddit, category, limit);
            e.preventDefault();
        });

        getJSON('memes', 'hot', '15');
    };


    $(document).ready(function() {
        init();
    });


})(window, jQuery);