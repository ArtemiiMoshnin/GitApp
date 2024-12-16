export class View {
  constructor() {
    this.app = document.getElementById("app");

    this.title = this.createElement("h1", "title");
    this.title.textContent = "API GitHub";

    this.searchLine = this.createElement("div", "search-line");
    this.searchInput = this.createElement("input", "search-input");

    this.repoList = this.createElement("ul", "ul-class");

    this.searchLine.append(this.searchInput);
    this.searchLine.append(this.repoList);

    this.app.append(this.title);
    this.app.append(this.searchLine);

    this.mainWrapper = document.querySelector(".main-wrapper");
    if (!this.mainWrapper) {
      this.mainWrapper = this.createElement("div", "main-wrapper");
      this.app.append(this.mainWrapper);
    }

    this.repoList.addEventListener("click", (event) => {
      const clickedLi = event.target.closest("li");
      this.elementWrapper = this.createElement("div", "element-wrapper");
      this.elementDelete = this.createElement("button", "button-delete");
      this.elementName = this.createElement("p", "name-class");
      this.repoName = `Name: ${clickedLi.textContent}`;
      this.elementStars = this.createElement("p", "stars-class");
      this.starsNumber = `Stars: ${clickedLi.dataset.stars}`;
      this.elementOwner = this.createElement("p", "stars-class");
      this.ownerLogin = `Owner: ${clickedLi.dataset.login}`;

      this.elementName.append(this.repoName);
      this.elementStars.append(this.starsNumber);
      this.elementOwner.append(this.ownerLogin);

      this.elementWrapper.append(
        this.elementDelete,
        this.elementName,
        this.elementStars,
        this.elementOwner
      );

      this.mainWrapper.append(this.elementWrapper);

      this.searchInput.value = "";
      this.repoList.style.display = "none";

      this.mainWrapper.addEventListener("click", (deleteEvent) => {
        if (deleteEvent.target.closest("button")) {
          const elementWrapper = deleteEvent.target.closest(".element-wrapper");
          if (elementWrapper) {
            elementWrapper.remove();
          }
        }
      });
    });
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }

  showSuggestions(repData) {
    repData.forEach((repoElement) => {
      const repLi = this.createElement("li");
      repLi.textContent = repoElement.name;

      repLi.dataset.stars = repoElement.stargazers_count;
      repLi.dataset.login = repoElement.owner.login;
      this.repoList.append(repLi);
    });

    this.repoList.style.display = "block";
  }
}
