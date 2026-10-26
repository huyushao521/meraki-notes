// 侧边栏抽屉
(function () {
  var btn = document.querySelector('.menu-btn');
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.getElementById('overlay');
  if (!btn || !sidebar) return;

  function close() {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
  }

  btn.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show', open);
  });

  if (overlay) overlay.addEventListener('click', close);

  sidebar.addEventListener('click', function (e) {
    if (e.target.closest('a')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

// 阅读进度条
(function () {
  var bar = document.getElementById('progress');
  if (!bar) return;
  function update() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    bar.style.width = pct.toFixed(2) + '%';
  }
  document.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// 侧边栏当前章节高亮
(function () {
  var path = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.sidebar a[href]');
  Array.prototype.forEach.call(links, function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    var target = href.split('/').pop().split('#')[0];
    if (target && target === path) a.classList.add('active');
  });
})();
