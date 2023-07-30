document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const bookmarkContainer = document.getElementById('bookmarkContainer');
  const addBookmark = document.getElementById('addBookmark');

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const keyword = searchInput.value.trim();

    if (keyword === '') {
      return;
    }

    const searchUrl = 'https://www.baidu.com/s?wd=' + encodeURIComponent(keyword);
    window.open(searchUrl);
  });

  addBookmark.addEventListener('click', function() {
    const siteName = prompt('请输入网站名称');
    const siteUrl = prompt('请输入网站链接');

    if (!siteName || !siteUrl) {
      return;
    }

    const bookmark = document.createElement('a');
    bookmark.className = 'bookmark';
    bookmark.href = siteUrl;
    bookmark.target = '_blank';

    const bookmarkIcon = document.createElement('span');
    bookmarkIcon.className = 'bookmark-icon';
    bookmarkIcon.textContent = siteName.charAt(0).toUpperCase();

    const bookmarkLabel = document.createElement('span');
    bookmarkLabel.className = 'bookmark-label';
    bookmarkLabel.textContent = siteName;

    bookmark.appendChild(bookmarkIcon);
    bookmark.appendChild(bookmarkLabel);
    bookmarkContainer.insertBefore(bookmark, addBookmark);

    saveBookmarks();
  });

  function saveBookmarks() {
    const bookmarks = Array.from(bookmarkContainer.getElementsByClassName('bookmark'));
    const bookmarkData = bookmarks.map(function(bookmark) {
      return {
        name: bookmark.querySelector('.bookmark-label').textContent,
        url: bookmark.href
      };
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkData));
  }

  function loadBookmarks() {
    const bookmarkData = JSON.parse(localStorage.getItem('bookmarks'));

    if (bookmarkData) {
      bookmarkData.forEach(function(data) {
        const bookmark = document.createElement('a');
        bookmark.className = 'bookmark';
        bookmark.href = data.url;
        bookmark.target = '_blank';

        const bookmarkIcon = document.createElement('span');
        bookmarkIcon.className = 'bookmark-icon';
        bookmarkIcon.textContent = data.name.charAt(0).toUpperCase();

        const bookmarkLabel = document.createElement('span');
        bookmarkLabel.className = 'bookmark-label';
        bookmarkLabel.textContent = data.name;

        bookmark.appendChild(bookmarkIcon);
        bookmark.appendChild(bookmarkLabel);
        bookmarkContainer.insertBefore(bookmark, addBookmark);
      });
    }
  }

  loadBookmarks();
});
