/* =========================================================
   POSTCARDS — DISCOVER PAGE
   ========================================================= */

const state = {
  search: "",
  location: "",
  major: "",
  tuition: "",
  type: "",
  international: ""
};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  setupSearch();
  setupFilters();
  setupQuickChips();

  renderRecommended();
  renderResults();

  updateResultsCount();
});


/* =========================================================
   FILTER SETUP
   ========================================================= */

function populateFilters() {
  const locationSelect =
    document.querySelector("#locationFilter");

  const majorSelect =
    document.querySelector("#majorFilter");

  if (!locationSelect || !majorSelect) return;

  const locations = [
    ...new Set(
      universities.map(
        university => university.state
      )
    )
  ].sort();

  const majors = [
    ...new Set(
      universities.flatMap(
        university => university.majors
      )
    )
  ].sort();

  locations.forEach(location => {
    const option = document.createElement("option");

    option.value = location;
    option.textContent = location;

    locationSelect.appendChild(option);
  });

  majors.forEach(major => {
    const option = document.createElement("option");

    option.value = major;
    option.textContent = major;

    majorSelect.appendChild(option);
  });
}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSearch() {
  const input =
    document.querySelector("#universitySearch");

  if (!input) return;

  input.addEventListener("input", event => {
    state.search =
      event.target.value.trim().toLowerCase();

    renderResults();
    updateResultsCount();
  });
}


/* =========================================================
   FILTERS
   ========================================================= */

function setupFilters() {
  const location =
    document.querySelector("#locationFilter");

  const major =
    document.querySelector("#majorFilter");

  const tuition =
    document.querySelector("#tuitionFilter");

  const type =
    document.querySelector("#typeFilter");

  const international =
    document.querySelector("#internationalFilter");

  location?.addEventListener("change", event => {
    state.location = event.target.value;
    renderResults();
    updateResultsCount();
  });

  major?.addEventListener("change", event => {
    state.major = event.target.value;
    renderResults();
    updateResultsCount();
  });

  tuition?.addEventListener("change", event => {
    state.tuition = event.target.value;
    renderResults();
    updateResultsCount();
  });

  type?.addEventListener("change", event => {
    state.type = event.target.value;
    renderResults();
    updateResultsCount();
  });

  international?.addEventListener("change", event => {
    state.international = event.target.value;
    renderResults();
    updateResultsCount();
  });

  document
    .querySelector("#resetFilters")
    ?.addEventListener("click", resetFilters);
}

function resetFilters() {
  state.search = "";
  state.location = "";
  state.major = "";
  state.tuition = "";
  state.type = "";
  state.international = "";

  const search =
    document.querySelector("#universitySearch");

  if (search) search.value = "";

  document
    .querySelectorAll(".filter-select")
    .forEach(select => {
      select.value = "";
    });

  document
    .querySelectorAll(".quick-chip")
    .forEach(chip => {
      chip.classList.remove("active");
    });

  renderResults();
  updateResultsCount();
}


/* =========================================================
   QUICK CHIPS
   ========================================================= */

function setupQuickChips() {
  document
    .querySelectorAll(".quick-chip")
    .forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.dataset.query;

        document
          .querySelectorAll(".quick-chip")
          .forEach(item => {
            item.classList.remove("active");
          });

        chip.classList.add("active");

        state.search = query.toLowerCase();

        const search =
          document.querySelector("#universitySearch");

        if (search) {
          search.value = query;
        }

        renderResults();
        updateResultsCount();
      });
    });
}


/* =========================================================
   SEARCH + FILTER LOGIC
   ========================================================= */

function getFilteredUniversities() {
  return universities.filter(university => {

    /* SEARCH */

    if (state.search) {
      const searchableText = [
        university.name,
        university.shortName,
        university.city,
        university.state,
        university.type,
        ...university.majors,
        ...university.tags
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(state.search)) {
        return false;
      }
    }


    /* LOCATION */

    if (
      state.location &&
      university.state !== state.location
    ) {
      return false;
    }


    /* MAJOR */

    if (
      state.major &&
      !university.majors.includes(state.major)
    ) {
      return false;
    }


    /* TUITION */

    if (state.tuition) {
      const tuition = university.tuition;

      if (
        state.tuition === "under-40000" &&
        tuition >= 40000
      ) {
        return false;
      }

      if (
        state.tuition === "40000-55000" &&
        (tuition < 40000 || tuition > 55000)
      ) {
        return false;
      }

      if (
        state.tuition === "55000-65000" &&
        (tuition < 55000 || tuition > 65000)
      ) {
        return false;
      }

      if (
        state.tuition === "over-65000" &&
        tuition <= 65000
      ) {
        return false;
      }
    }


    /* SCHOOL TYPE */

    if (
      state.type &&
      university.type !== state.type
    ) {
      return false;
    }


    /* INTERNATIONAL STUDENTS */

    if (
      state.international === "yes" &&
      !university.internationalStudents
    ) {
      return false;
    }

    return true;
  });
}


/* =========================================================
   RECOMMENDATIONS
   ========================================================= */

function renderRecommended() {
  const container =
    document.querySelector("#recommendedGrid");

  if (!container) return;

  const profile = getProfile();

  let recommendations = [...universities];

  /*
    If onboarding/profile information exists,
    use it to give relevant recommendations.
  */

  if (profile.major || profile.location) {
    recommendations.sort((a, b) => {
      return recommendationScore(b, profile)
        - recommendationScore(a, profile);
    });
  }

  recommendations =
    recommendations.slice(0, 3);

  container.innerHTML =
    recommendations
      .map(createUniversityCard)
      .join("");

  attachCardListeners(container);
}

function recommendationScore(university, profile) {
  let score = 0;

  if (
    profile.major &&
    university.majors.includes(profile.major)
  ) {
    score += 4;
  }

  if (
    profile.location &&
    (
      university.state === profile.location ||
      university.city === profile.location
    )
  ) {
    score += 4;
  }

  if (
    profile.schoolType &&
    university.type === profile.schoolType
  ) {
    score += 2;
  }

  if (
    profile.internationalStudents &&
    university.internationalStudents
  ) {
    score += 2;
  }

  return score;
}


/* =========================================================
   RESULTS
   ========================================================= */

function renderResults() {
  const container =
    document.querySelector("#universityGrid");

  if (!container) return;

  const results =
    getFilteredUniversities();

  if (!results.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No universities found</h3>
        <p>
          Try changing your search or removing one
          of your filters.
        </p>

        <button
          class="btn btn-secondary"
          id="emptyReset"
        >
          Clear filters
        </button>
      </div>
    `;

    document
      .querySelector("#emptyReset")
      ?.addEventListener("click", resetFilters);

    return;
  }

  container.innerHTML =
    results
      .map(createUniversityCard)
      .join("");

  attachCardListeners(container);
}


/* =========================================================
   UNIVERSITY CARD
   ========================================================= */

function createUniversityCard(university) {
  const saved =
    isSaved(university.id);

  const compared =
    isInCompare(university.id);

  const initials =
    getInitials(university.name);

  return `
    <article
      class="university-card"
      data-id="${university.id}"
    >

      <div class="card-top">

        <div class="university-mark">
          ${initials}
        </div>

        <button
          class="save-button ${saved ? "saved" : ""}"
          data-action="save"
          aria-label="${saved ? "Remove from saved" : "Save university"}"
        >
          ${saved ? "★" : "☆"}
        </button>

      </div>


      <h3>${university.name}</h3>

      <p class="university-location">
        ${university.city}, ${university.state}
        · ${university.type}
      </p>


      <div class="tag-row">

        ${university.tags
          .slice(0, 3)
          .map(tag => `
            <span class="tag">
              ${tag}
            </span>
          `)
          .join("")}

      </div>


      <div class="card-info">

        <div class="info-item">
          <span class="info-label">
            Tuition
          </span>

          <span class="info-value">
            ${formatTuition(university.tuition)}
          </span>
        </div>


        <div class="info-item">
          <span class="info-label">
            International
          </span>

          <span class="info-value">
            ${university.internationalStudents ? "Yes" : "No"}
          </span>
        </div>

      </div>


      <div class="card-actions">

        <a
          class="btn btn-primary btn-small"
          href="university.html?id=${university.id}"
        >
          View details
        </a>

        <button
          class="btn btn-secondary btn-small compare-button ${compared ? "active" : ""}"
          data-action="compare"
        >
          ${compared ? "Comparing" : "Compare"}
        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   CARD INTERACTIONS
   ========================================================= */

function attachCardListeners(container) {
  container
    .querySelectorAll("[data-action='save']")
    .forEach(button => {

      button.addEventListener("click", () => {

        const card =
          button.closest(".university-card");

        const id =
          card.dataset.id;

        const saved =
          toggleSaved(id);

        button.classList.toggle(
          "saved",
          saved
        );

        button.textContent =
          saved ? "★" : "☆";
      });
    });


  container
    .querySelectorAll("[data-action='compare']")
    .forEach(button => {

      button.addEventListener("click", () => {

        const card =
          button.closest(".university-card");

        const id =
          card.dataset.id;

        const comparing =
          toggleCompare(id);

        button.classList.toggle(
          "active",
          comparing
        );

        button.textContent =
          comparing
            ? "Comparing"
            : "Compare";
      });
    });
}


/* =========================================================
   RESULT COUNT
   ========================================================= */

function updateResultsCount() {
  const count =
    document.querySelector("#resultsCount");

  if (!count) return;

  const number =
    getFilteredUniversities().length;

  count.textContent =
    `${number} ${number === 1 ? "university" : "universities"}`;
}
