(function (window, $) {

  "use strict";

  var data = {};
  var filter;
  var entries = {};

  var sortData = function (sortBy) {
    var container = document.querySelector('#container');
    var entries = container.querySelectorAll(".entry");

    var entries = Object.keys(entries).map(function(key) {
      return [Number(key), entries[key]];
    });

    entries.sort(function (a, b) {
      var contentA = parseInt(a[1].getAttribute('data-'+sortBy));
      var contentB = parseInt(b[1].getAttribute('data-'+sortBy));
      return (contentA < contentB) ? -1 : 1;
    });

    container.innerHTML = '';
    entries.forEach(function (currentValue, index, array) {
      container.append(currentValue[1]);
    });
  };

  var buildList = function (entries) {
    var container = document.querySelector('#container');
    var oldEntries = container.querySelectorAll('.entry');

    oldEntries.forEach(function (entry) {
      container.removeChild(entry);
    });

    entries.forEach(function (t) {
      if (t.data.thumbnail == '' || t.data.thumbnail == 'self') return;
      if(t.data.over_18) return;
      if(t.data.stickied) return;

      var entry = document.createElement('a');
      entry.classList.add('entry');
      entry.href = t.data.url;
      entry.target = "_blank";
      entry.setAttribute('data-score', t.data.score);
      entry.setAttribute('data-ups', t.data.ups);
      entry.setAttribute('data-age', t.data.created);

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
  };

  var getJSON = function (sub, cat, limit) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = handleOnLoad;
    httpRequest.responseType = 'json';
    httpRequest.open('GET', 'https://www.reddit.com/r/' + sub + '/' + cat + '.json?limit=' + limit, true);
    httpRequest.send();
  };

  var init = function () {
    var filter = document.querySelector('#filter');
    filter.addEventListener('submit', function (e) {
      var formData = new FormData(filter);
      var subreddit = formData.get('subreddit');
      var category = formData.get('category');
      var limit = parseInt(formData.get('limit'));

      getJSON(subreddit, category, limit);
      e.preventDefault();
    });

    var sort = document.querySelector('#sort');
    sort.addEventListener('click', function (e) {
      var checkedItem = this.querySelector('input[name="sort"]:checked');
      if(checkedItem) {
        sortData(this.querySelector('input[name="sort"]:checked').value);
      }
    });

    getJSON('memes', 'hot', 15);
  };

  document.addEventListener("DOMContentLoaded", function(event) { init(); });

})(window);