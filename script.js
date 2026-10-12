const repositoryList = document.querySelector("#repository-list");
const listStatus = document.querySelector("#list-status");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository";

    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;

    const description = document.createElement("p");
    description.textContent = repository.description;

    const starredAt = document.createElement("time");
    starredAt.dateTime = repository.starred_at;
    starredAt.textContent = `Starred ${new Date(`${repository.starred_at}T00:00:00`).toLocaleDateString()}`;

    item.append(link, description, starredAt);
    repositoryList.append(item);
  }

  listStatus.textContent = repositories.length
    ? `${repositories.length} starred ${repositories.length === 1 ? "repository" : "repositories"}`
    : "No starred repositories yet.";
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new TypeError("Expected events.json to contain a list of repositories");
    }

    renderRepositories(repositories);
  } catch (error) {
    console.error("Unable to load starred repositories:", error);
    listStatus.textContent = "Could not load starred repositories. Please try again later.";
  }
}

loadRepositories();
