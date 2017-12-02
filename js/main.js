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
        return !element.data.over_18;
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
            var eintrag = document.createElement('div');
            eintrag.classList.add('entry');
            var title = document.createElement('h2');
            title.innerHTML = t.data.title;

            eintrag.appendChild(title);
            container.appendChild(eintrag);
        })

    };

    var handleOnLoad = function (res) {
        var entries = res.data.children.filter(over18);

        buildList(entries);
    };

    var getJSON = function(sub, end, limit) {
        var url = 'https://www.reddit.com/r/'+sub+'/'+end+'.json';
        var httpRequest = new XMLHttpRequest();

        $.ajax({
            url: url,
            data: { 'limit': limit },
            success: handleOnLoad,
            dataType: 'json'
        });
        // httpRequest.onload = handleOnLoad;
        // httpRequest.responseType = 'json';
        // httpRequest.open('GET', url, true);
        // httpRequest.send({ limit: limit });
    };

    var init = function() {
        form = document.querySelector('#form');
        form.addEventListener('submit', function(e)  {
            var formData = new FormData(form);
            var sub = formData.get('subreddit');
            var endpoint = formData.get('endpoint');
            var limit = formData.get('limit');

            getJSON(sub, endpoint, limit);
            e.preventDefault();
        });

        getJSON('aww', 'hot', '5');
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
