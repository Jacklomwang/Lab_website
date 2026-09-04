/* Central script — mobile nav toggle */
(function(){
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

/* Data-driven lists — rows rendered from JSON, capped by a container's data-limit */
(function(){
  function el(tag, className, text){
    var e = document.createElement(tag);
    if(className) e.className = className;
    if(text != null) e.textContent = text;
    return e;
  }

  function renderRows(container, items, buildRow){
    var rule = container.querySelector('.rule');
    var limit = parseInt(container.dataset.limit, 10);
    if(!isNaN(limit)) items = items.slice(0, limit);
    items.forEach(function(item){ container.insertBefore(buildRow(item), rule); });
  }

  function loadList(containerId, jsonPath, pluck, buildRow){
    var container = document.getElementById(containerId);
    if(!container) return;
    fetch(jsonPath)
      .then(function(res){ return res.json(); })
      .then(function(data){ renderRows(container, pluck(data), buildRow); })
      .catch(function(err){ console.error('Failed to load ' + jsonPath + ':', err); });
  }

  loadList('news-list', 'data/news.json', function(d){ return d; }, function(item){
    var row = el('div', 'reveal news-row');
    row.append(
      el('div', 'news-date', item.date),
      el('div', 'news-tag', item.tag),
      el('p', 'news-text', item.text)
    );
    return row;
  });

  loadList('pub-list', 'data/publications.json', function(d){ return d; }, function(item){
    var row = el('div', 'reveal pub-row');
    var cite = el('div', 'pub-cite');
    cite.append(
      document.createTextNode(item.authors + ' '),
      el('span', 'pub-title', '“' + item.title + '”'),
      document.createTextNode(' '),
      el('span', 'pub-venue', item.venue)
    );
    row.append(el('div', 'pub-year', item.year), cite);
    return row;
  });

  loadList('member-list', 'data/people.json', function(d){ return d.members; }, function(item){
    var row = el('div', 'reveal member-row');

    var photo = el('div', 'img-slot member-photo');
    photo.dataset.label = 'Photo';
    var img = document.createElement('img');
    img.src = item.photo;
    img.alt = 'Photo';
    img.onerror = function(){ img.style.display = 'none'; };
    photo.append(img);

    var body = el('div', 'member-body');
    body.append(
      el('h3', 'member-name', item.name),
      el('div', 'member-role', item.role),
      el('p', 'member-interest', item.interest)
    );

    row.append(photo, body);
    return row;
  });

  loadList('alumni-list', 'data/people.json', function(d){ return d.alumni; }, function(item){
    var row = el('div', 'alumni-row');
    row.append(el('span', '', item.name), el('span', 'faint-note', item.note));
    return row;
  });
})();
