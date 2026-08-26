(() => {
  "use strict";

  const grid = document.querySelector("#episodes-grid");
  const status = document.querySelector("#rss-status");
  const year = document.querySelector("#year");
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector("#main-nav");

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (!grid) return;

  const cleanText = (value = "") => {
    const doc = new DOMParser().parseFromString(value, "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
  };

  const escapeHTML = (value = "") => value.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[char]));

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  };

  const spotifyLink = (item) => {
    const links = [item.link, item.guid, item.enclosure?.url].filter(Boolean);
    return links.find((link) => /spotify\.com/i.test(link)) || item.link || "#";
  };

  const createCard = (item, index) => {
    const title = cleanText(item.title || `Épisode ${index + 1}`);
    const description = cleanText(item.description || item.content || "");
    const excerpt = description.length > 235 ? `${description.slice(0, 235).trim()}…` : description;
    const rest = description.length > 235 ? description.slice(235).trim() : "";
    const image = item.image || item.itunesImage || item.feedImage || "logo.png";
    const date = formatDate(item.pubDate || item.isoDate);
    const duration = item.duration || item.itunesDuration || "";
    const link = spotifyLink(item);

    const article = document.createElement("article");
    article.className = "editorial-card";
    article.innerHTML = `
      <div class="editorial-card__media episode-image">
        <img src="${escapeHTML(image)}" alt="Pochette de ${escapeHTML(title)}" loading="lazy">
        <span class="editorial-card__number">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="editorial-card__body">
        ${date ? `<p class="editorial-card__date">${escapeHTML(date)}</p>` : ""}
        <h3 class="editorial-card__name">${escapeHTML(title)}</h3>
        ${excerpt ? `<p class="editorial-card__description">${escapeHTML(excerpt)}</p>` : ""}
        ${rest ? `
          <details>
            <summary><span class="show-more">Afficher plus</span><span class="show-less">Afficher moins</span></summary>
            <p class="editorial-card__more">${escapeHTML(rest)}</p>
          </details>` : ""}
        ${duration ? `<span class="editorial-card__duration">${escapeHTML(String(duration))}</span>` : ""}
        <footer class="editorial-card__footer">
          <a class="editorial-card__listen" href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer">→ Écouter l’épisode</a>
          <nav class="editorial-card__platforms" aria-label="Écouter ${escapeHTML(title)}">
            <a href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer"><img class="brand-icon" src="https://cdn.simpleicons.org/spotify/1ED760" alt="">Spotify</a>
            <a href="https://podcasts.apple.com/fr/podcast/vingt-et-un/id6790472406" target="_blank" rel="noopener noreferrer"><img class="brand-icon" src="https://cdn.simpleicons.org/applepodcasts/9933CC" alt="">Apple Podcasts</a>
            <a href="https://www.deezer.com/fr/show/1003405302" target="_blank" rel="noopener noreferrer"><img class="brand-icon" src="https://cdn.simpleicons.org/deezer/A238FF" alt="">Deezer</a>
          </nav>
        </footer>
      </div>`;
    return article;
  };

  const showStatus = (message, isError = false) => {
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  };

  const hideStatus = () => {
    if (status) status.hidden = true;
  };

  async function loadRSS() {
    try {
      const response = await fetch("/api/rss", {
        headers: { Accept: "application/json" }
      });

      if (response.status === 404) {
        // En local avec Live Server, l'API Vercel ne tourne pas : on garde les épisodes déjà présents.
        return;
      }

      if (!response.ok) {
        throw new Error(`Erreur RSS (${response.status})`);
      }

      const data = await response.json();
      if (!data || !Array.isArray(data.items) || data.items.length === 0) {
        throw new Error("Aucun épisode reçu depuis le flux RSS.");
      }

      grid.innerHTML = "";
      data.items.slice(0, 12).forEach((item, index) => {
        grid.appendChild(createCard({ ...item, feedImage: data.feed?.image }, index));
      });
      grid.dataset.rssMode = "live";
      hideStatus();
    } catch (error) {
      console.warn("Flux RSS indisponible, affichage des épisodes de secours.", error);
      showStatus("Les épisodes automatiques sont momentanément indisponibles : les épisodes enregistrés sur le site restent affichés.", true);
    }
  }

  loadRSS();
})();
