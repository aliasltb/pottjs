(function (window, $) {

    var data = {},
        filter,
        entries = {};

    var sort = function (sortBy) {
        container = document.querySelector('#container');
        entries = container.querySelectorAll(".entry");

        entries.sort(function(a,b){
            var contentA = parseInt( $(a).data(sortBy));
            var contentB = parseInt( $(b).data(sortBy));
            return (contentA < contentB) ? -1 : 1;
        });

        entries.forEach(function () {
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
            if(t.data.over_18) return;
            if(t.data.stickied) return;

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

            container.appendChild(entry).appendChild(figure);
        });

    };

    var handleOnLoad = function (res) {
        entries = res.target.response.data.children;

        buildList(entries);
        //sort('ups'); // Funktioniert irgendwie nicht
    };

    var getJSON = function(sub, cat, limit) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onload = handleOnLoad;
        httpRequest.responseType = 'json';
        httpRequest.open('GET', 'https://www.reddit.com/r/'+sub+'/'+cat+'.json', true);
        httpRequest.send({ 'g': 'GLOBAL', limit: limit });
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