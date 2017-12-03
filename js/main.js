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
        var container = document.querySelector('#container');
        var oldEntries = container.querySelectorAll('.entry');

        oldEntries.forEach(function(entry) {
            container.removeChild(entry);
        });

        entries.forEach(function (t) {
            if(t.data.thumbnail == '' || t.data.thumbnail == 'self' ) return;

            var entry = document.createElement('a');
            entry.classList.add('entry');
            entry.href = t.data.url;
            entry.target = "_blank";
            entry.setAttribute('data-score', t.data.score);
            entry.setAttribute('data-ups', t.data.ups);
            entry.setAttribute('data-created', t.data.created);

            var figure = document.createElement('figure');
            figure.href = t.data.url;
            figure.target = "_blank";

            var thumbnail = document.createElement('img');
            thumbnail.src = t.data.thumbnail;
            figure.appendChild(thumbnail);

            var title = document.createElement('figcaption');
            title.innerHTML = t.data.title;
            figure.appendChild(title);

            entry.appendChild(figure);
            container.appendChild(entry);
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