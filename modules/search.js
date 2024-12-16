const USER_PER_PAGE = 5;

function debounce(callback, delayTime) {
  let timeOut;
  return function (...args) {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(function () {
      callback(...args);
    }, delayTime);
  };
}

export class Search {
  constructor(view) {
    this.view = view; 
    this.view.searchInput.onkeyup = debounce(async (e) => {
      this.clearSearch();
      let repoData = e.target.value; 
      if (repoData) {
        let fetchResult = await fetch(
          `https://api.github.com/search/repositories?q=${repoData}&per_page=${USER_PER_PAGE}`
        );
        if (fetchResult.ok) {
          fetchResult = await fetchResult.json();
          const filteredRepos = fetchResult.items.filter((repo) => {
            return repo.name.startsWith(repoData);
          });
          this.view.showSuggestions(filteredRepos); 
        }
      }
    }, 500);
  }

  clearSearch() {
    this.view.repoList.innerHTML = ""; 
    this.view.repoList.style.display = "none"; 
  }
}
