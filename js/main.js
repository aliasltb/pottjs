(function (window, $) {

    var data = {};
    var form;



    function foo2()
    {
        return
        {
            bar: "hello"
        };
    }

    var over18 = function(element) {
       // return !element.data.over_18;
        return true;
    };

    var nosticky = function(element) {
        return !element.data.stickied;
    };

    // function success(data) {
    //     console.table(data.data.children);
    // }
    //
    // // "sticky" entfernen
    //
    // $.ajax({
    //     url: 'https://www.reddit.com/r/javascript/hot.json',
    //     data: { 'limit': 5 },
    //     success: success,
    //     dataType: 'json'
    // });

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
        var entries = res.data.children.filter(nosticky).filter(over18);

        buildList(entries);
    };

    var getJSON = function(sub, cat, limit) {
        var url = 'https://www.reddit.com/r/'+sub+'/'+cat+'.json';
        var httpRequest = new XMLHttpRequest();

        $.ajax({
            url: url,
            data: {
                'g': 'GLOBAL',
                'limit': limit
            },
            success: handleOnLoad,
            dataType: 'json'
        });
        // httpRequest.onload = handleOnLoad;
        // httpRequest.responseType = 'json';
        // httpRequest.open('GET', url, true);
        // httpRequest.send({ limit: limit });
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


/**
 /r/javascript
 /r/node/
 /r/aww/



 Erweiterung: NSFW ausschließen
 Nach Score sortieren


 Im Firefox wird die Liste nicht gelöscht, wenn man NSFW-Subreddits aufruft, im Chrome schon
*/
