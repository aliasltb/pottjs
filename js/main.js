(function (window, $) {
    var data,
        form;

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