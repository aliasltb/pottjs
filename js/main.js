(function (window, $) {

    var data = {},
        filter;

    var sort = function (sortBy) {
        container = $('#container');
        entries = container.find(".entry");
        vorher = entries;

        entries.sort(function(a,b){
            var contentA = parseInt( $(a).data(sortBy));
            var contentB = parseInt( $(b).data(sortBy));
            return (contentA < contentB) ? -1 : 1;
        });

        entries.each(function () {
            container.append(this);
        });
    };

    var buildList = function (entries) {
        $('#container').empty();

        $.each(entries, function (k,t) {
            if(t.data.thumbnail == '' || t.data.thumbnail == 'self' ) return;

            var entry = $("<a />", {
                class: 'entry',
                href: t.data.url,
                target: '_blank'
            }).data('score', t.data.score).data('downs', t.data.downs).data('ups', t.data.ups).data('age', t.data.created);

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
        sort('ups');
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
        $('#filter').submit(function(e) {
            subreddit = $("#subreddit").val();
            category = $("#category").val();
            limit = $("#limit").val();

            getJSON(subreddit, category, limit);
            e.preventDefault();
        });

        $('#sort').click(function(e)  {
            var sortBy = $('input[name=sort]:checked').val();
            sort(sortBy);
        });

        getJSON('memes', 'hot', '15');
    };


    $(document).ready(function() {
        init();
    });


})(window, jQuery);