const discoverState = {
  search: "",
  country: "",
  major: "",
  language: "",
  tuition: "",
  scholarships: "",
  campusSize: "",
  climate: ""
};


/* =========================
   INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeDiscover();
});


function initializeDiscover() {
  if (typeof universities === "undefined") {
    console.error("universities.js was not loaded.");
    return;
  }

  populateFilters();
  setupSearch();
  setupFilters();
  setupQuickSearches();
  renderRecommendations();
  renderUniversities();
}


/* =========================
   FILTER OPTIONS
========================= */

function populateFilters() {
  populateSelect(
    "countryFilter",
    getUniqueValues(universities, "country")
  );

  populateMajorFilter();
  populateSelect(
    "languageFilter",
    getUniqueValuesFromArrays(universities, "language")
  );

  populateSelect(
    "campusFilter",
    getUniqueValues(universities, "campusSize")
  );

  populateSelect(
    "climateFilter",
    getUniqueValues(universities, "climate")
  );
}


function populateMajorFilter() {
  const select = document.querySelector("#majorFilter");

  if (!select) return;

  const majors = [
    ...new Set(
      universities.flatMap(university =>
        Array.isArray(university.majors)
          ? university.majors
          : []
      )
    )
  ].sort();

  select.innerHTML =
    `<option value="">All majors</option>`;

  majors.forEach(major => {
    const option = document.createElement("option");

    option.value = major;
    option.textContent = major;

    select.appendChild(option);
  });
}


function populateSelect(id, values) {
  const select = document.querySelector(`#${id}`);

  if (!select) return;

  const firstOption = select.querySelector("option");

  select.innerHTML =
    firstOption
      ? firstOption.outerHTML
      : `<option value="">All</option>`;

  values
    .filter(Boolean)
    .sort()
    .forEach(value => {
      const option = document.createElement("option");

      option.value = value;
      option.textContent = value;

      select.appendChild(option);
    });
}


function getUniqueValues(data, property) {
  return [
    ...new Set(
      data
        .map(item => item[property])
        .filter(Boolean)
    )
  ];
}


function getUniqueValuesFromArrays(data, property) {
  return [
    ...new Set(
      data.flatMap(item =>
        Array.isArray(item[property])
          ? item[property]
          : []
      )
    )
  ];
}


/* =========================
   SEARCH
========================= */

function setupSearch() {
  const searchInput =
    document.querySelector("#universitySearch");

  if (!searchInput) return;

  searchInput.addEventListener("input", event => {
    discoverState.search =
      event.target.value.trim().toLowerCase();

    renderUniversities();
  });
}


/* =========================
   FILTERS
========================= */

function setupFilters() {
  const filters = {
    countryFilter: "country",
    majorFilter: "major",
    languageFilter: "language",
    tuitionFilter: "tuition",
    scholarshipFilter: "scholarships",
    campusFilter: "campusSize",
    climateFilter: "climate"
  };

  Object.entries(filters).forEach(
    ([elementId, stateKey]) => {
      const element =
        document.querySelector(`#${elementId}`);

      if (!element) return;

      element.addEventListener("change", event => {
        discoverState[stateKey] =
          event.target.value;

        renderUniversities();
      });
    }
  );

  const resetButton =
    document.querySelector("#resetFilters");

  if (resetButton) {
    resetButton.addEventListener("click", resetFilters);
  }
}


function resetFilters() {
  discoverState.search = "";
  discoverState.country = "";
  discoverState.major = "";
  discoverState.language = "";
  discoverState.tuition = "";
  discoverState.scholarships = "";
  discoverState.campusSize = "";
  discoverState.climate = "";

  const search =
    document.querySelector("#universitySearch");

  if (search) {
    search.value = "";
  }

  const filterIds = [
    "countryFilter",
    "majorFilter",
    "languageFilter",
    "tuitionFilter",
    "scholarshipFilter",
    "campusFilter",
    "climateFilter"
  ];

  filterIds.forEach(id => {
    const element = document.querySelector(`#${id}`);

    if (element) {
      element.value = "";
    }
  });

  renderUniversities();
}


/* =========================
   QUICK SEARCHES
========================= */

function setupQuickSearches() {
  const chips =
    document.querySelectorAll("[data-search]");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const query =
        chip.dataset.search || "";

      applyQuickSearch(query);
    });
  });
}


function applyQuickSearch(query) {
  const normalized =
    query.trim().toLowerCase();

  if (normalized === "under $40k") {
    discoverState.search = "";
    discoverState.tuition = "under-40000";

    const search =
      document.querySelector("#universitySearch");

    if (search) search.value = "";

    const tuition =
      document.querySelector("#tuitionFilter");

    if (tuition) tuition.value = "under-40000";

  } else if (normalized === "with scholarships") {
    discoverState.search = "";
    discoverState.scholarships = "yes";

    const search =
      document.querySelector("#universitySearch");

    if (search) search.value = "";

    const scholarship =
      document.querySelector("#scholarshipFilter");

    if (scholarship) scholarship.value = "yes";

  } else {
    discoverState.search = normalized;

    const search =
      document.querySelector("#universitySearch");

    if (search) {
      search.value = query;
    }
  }

  renderUniversities();
}


/* =========================
   FILTER LOGIC
========================= */

function getFilteredUniversities() {
  return universities.filter(university => {

    /* Search */

    if (discoverState.search) {
      const searchableText = [
        university.name,
        university.shortName,
        university.city,
        university.country,
        university.description,
        ...(university.majors || []),
        ...(university.tags || [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (
        !searchableText.includes(
          discoverState.search
        )
      ) {
        return false;
      }
    }


    /* Country */

    if (
      discoverState.country &&
      university.country !== discoverState.country
    ) {
      return false;
    }


    /* Major */

    if (
      discoverState.major &&
      !(university.majors || []).includes(
        discoverState.major
      )
    ) {
      return false;
    }


    /* Language */

    if (
      discoverState.language &&
      !(university.language || []).includes(
        discoverState.language
      )
    ) {
      return false;
    }


    /* Tuition */

    if (discoverState.tuition) {
      const tuition =
        Number(university.tuition);

      switch (discoverState.tuition) {

        case "under-20000":
          if (tuition >= 20000) return false;
          break;

        case "under-40000":
          if (tuition >= 40000) return false;
          break;

        case "40000-60000":
          if (
            tuition < 40000 ||
            tuition > 60000
          ) {
            return false;
          }
          break;

        case "over-60000":
          if (tuition <= 60000) return false;
          break;
      }
    }


    /* Scholarships */

    if (
      discoverState.scholarships === "yes" &&
      !university.scholarships
    ) {
      return false;
    }


    /* Campus */

    if (
      discoverState.campusSize &&
      university.campusSize !==
        discoverState.campusSize
    ) {
      return false;
    }


    /* Climate */

    if (
      discoverState.climate &&
      university.climate !==
        discoverState.climate
    ) {
      return false;
    }


    return true;
  });
}


/* =========================
   RESULTS
========================= */

function renderUniversities() {
  const grid =
    document.querySelector("#universityGrid");

  const count =
    document.querySelector("#resultCount");

  const empty =
    document.querySelector("#emptyState");

  if (!grid) return;

  const results =
    getFilteredUniversities();

  if (count) {
    count.textContent =
      `${results.length} ${
        results.length === 1
          ? "university"
          : "universities"
      }`;
  }

  if (!results.length) {
    grid.innerHTML = "";

    if (empty) {
      empty.hidden = false;
    }

    return;
  }

  if (empty) {
    empty.hidden = true;
  }

  grid.innerHTML =
    results
      .map(createUniversityCard)
      .join("");

  attachCardEvents();
}


/* =========================
   RECOMMENDATIONS
========================= */

function renderRecommendations() {
  const container =
    document.querySelector(
      "#recommendationGrid"
    );

  if (!container) return;

  const recommendations =
    universities.slice(0, 4);

  container.innerHTML =
    recommendations
      .map(createUniversityCard)
      .join("");

  attachCardEvents();
}


/* =========================
   UNIVERSITY CARD
========================= */

function createUniversityCard(university) {
  const saved =
    isSaved(university.id);

  const compared =
    isInCompare(university.id);

  const majorPreview =
    (university.majors || [])
      .slice(0, 2)
      .join(" · ");

  return `
    <article
      class="university-card"
      data-university-id="${university.id}"
    >

      <div class="university-card-top">

        <div class="postcard-stamp">
          ${getInitials(university.name)}
        </div>

        <button
          class="icon-button save-button ${
            saved ? "active" : ""
          }"
          data-save="${university.id}"
          aria-label="${
            saved
              ? "Remove from saved"
              : "Save university"
          }"
        >
          ${saved ? "♥" : "♡"}
        </button>

      </div>


      <div
        class="university-card-body"
        data-open="${university.id}"
      >

        <p class="eyebrow">
          ${university.city}, ${university.country}
        </p>

        <h3>
          ${university.name}
        </h3>

        <p class="university-description">
          ${
            university.description ||
            "Explore this university on Postcards."
          }
        </p>

        <div class="university-meta">

          <span>
            ${formatTuition(university.tuition)}
          </span>

          <span>
            ${
              university.acceptanceRate
                ? `${university.acceptanceRate}% acceptance`
                : "Acceptance data unavailable"
            }
          </span>

        </div>

        <p class="major-preview">
          ${majorPreview}
        </p>

      </div>


      <div class="university-card-footer">

        <button
          class="text-button compare-button ${
            compared ? "active" : ""
          }"
          data-compare="${university.id}"
        >
          ${
            compared
              ? "Added to compare"
              : "Compare"
          }
        </button>

        <button
          class="text-button view-button"
          data-open="${university.id}"
        >
          View postcard →
        </button>

      </div>

    </article>
  `;
}


/* =========================
   CARD EVENTS
========================= */

function attachCardEvents() {

  document
    .querySelectorAll("[data-save]")
    .forEach(button => {

      button.addEventListener("click", event => {
        event.stopPropagation();

        const id =
          button.dataset.save;

        const saved =
          toggleSaved(id);

        button.classList.toggle(
          "active",
          saved
        );

        button.textContent =
          saved ? "♥" : "♡";

        updateGlobalCounts();
      });
    });


  document
    .querySelectorAll("[data-compare]")
    .forEach(button => {

      button.addEventListener("click", event => {
        event.stopPropagation();

        const id =
          button.dataset.compare;

        const compared =
          toggleCompare(id);

        button.classList.toggle(
          "active",
          compared
        );

        button.textContent =
          compared
            ? "Added to compare"
            : "Compare";

        updateGlobalCounts();
      });
    });


  document
    .querySelectorAll("[data-open]")
    .forEach(element => {

      element.addEventListener("click", () => {

        const id =
          element.dataset.open;

        if (id) {
          openUniversity(id);
        }
      });
    });
}
