document.addEventListener("DOMContentLoaded", () => {
  loadUniversityPage();
});


function loadUniversityPage() {

  const universityId =
    getUniversityFromURL();

  if (!universityId) {
    showUniversityError(
      "No university was selected."
    );
    return;
  }

  const university =
    getUniversityById(universityId);

  if (!university) {
    showUniversityError(
      "We couldn't find that university."
    );
    return;
  }

  renderUniversity(university);
  setupUniversityActions(university);
}


/* =========================
   RENDER
========================= */

function renderUniversity(university) {

  document.title =
    `${university.name} | Postcards`;

  setText(
    "universityName",
    university.name
  );

  setText(
    "universityLocation",
    `${university.city}, ${university.country}`
  );

  setText(
    "universityDescription",
    university.description ||
      "Explore this university through Postcards."
  );

  setText(
    "universityInitials",
    getInitials(university.name)
  );

  setText(
    "tuitionValue",
    formatTuition(university.tuition)
  );

  setText(
    "acceptanceValue",
    university.acceptanceRate
      ? `${university.acceptanceRate}%`
      : "Not available"
  );

  setText(
    "languageValue",
    formatArray(university.language)
  );

  setText(
    "campusValue",
    university.campusSize ||
      "Not available"
  );

  setText(
    "climateValue",
    university.climate ||
      "Not available"
  );

  setText(
    "scholarshipValue",
    university.scholarships
      ? "Available"
      : "Not listed"
  );

  setText(
    "requirementsValue",
    university.requirements ||
      "Check the official university website."
  );

  setText(
    "englishValue",
    university.englishRequirements ||
      "Check the official university website."
  );

  setText(
    "deadlineValue",
    university.deadline ||
      "Check the official university website."
  );

  setText(
    "scholarshipDetails",
    university.scholarshipDetails ||
      (
        university.scholarships
          ? "Scholarship opportunities are available. Review the official university website for details."
          : "No scholarship information listed in this prototype."
      )
  );

  setText(
    "studentLife",
    university.studentLife ||
      "Explore student life through the university's official resources."
  );

  setText(
    "universityReasons",
    university.reasons ||
      "Explore this university's academic programs, location, costs, and student experience."
  );


  /* Majors */

  const majorsContainer =
    document.querySelector(
      "#majorsContainer"
    );

  if (majorsContainer) {

    const majors =
      university.majors || [];

    if (!majors.length) {

      majorsContainer.innerHTML =
        "<p>No academic programs listed.</p>";

    } else {

      majorsContainer.innerHTML =
        majors
          .map(major => `
            <span class="tag">
              ${major}
            </span>
          `)
          .join("");
    }
  }


  /* Official website */

  const website =
    document.querySelector(
      "#officialWebsite"
    );

  if (website) {

    if (university.website) {
      website.href =
        university.website;
    } else {
      website.href = "#";
    }
  }


  /* Current saved state */

  updateSaveButton(university.id);
  updateCompareButton(university.id);
}


/* =========================
   ACTIONS
========================= */

function setupUniversityActions(university) {

  const saveButton =
    document.querySelector(
      "#saveUniversity"
    );

  if (saveButton) {

    saveButton.addEventListener(
      "click",
      () => {

        toggleSaved(university.id);

        updateSaveButton(
          university.id
        );

        updateGlobalCounts();
      }
    );
  }


  const compareButton =
    document.querySelector(
      "#compareUniversity"
    );

  if (compareButton) {

    compareButton.addEventListener(
      "click",
      () => {

        toggleCompare(
          university.id
        );

        updateCompareButton(
          university.id
        );

        updateGlobalCounts();
      }
    );
  }
}


/* =========================
   BUTTON STATES
========================= */

function updateSaveButton(id) {

  const button =
    document.querySelector(
      "#saveUniversity"
    );

  if (!button) return;

  if (isSaved(id)) {

    button.textContent =
      "♥ Saved";

    button.classList.add("active");

  } else {

    button.textContent =
      "♡ Save";

    button.classList.remove("active");
  }
}


function updateCompareButton(id) {

  const button =
    document.querySelector(
      "#compareUniversity"
    );

  if (!button) return;

  if (isInCompare(id)) {

    button.textContent =
      "Added to compare";

    button.classList.add("active");

  } else {

    button.textContent =
      "Compare";

    button.classList.remove("active");
  }
}


/* =========================
   HELPERS
========================= */

function setText(id, value) {

  const element =
    document.getElementById(id);

  if (!element) return;

  element.textContent =
    value ?? "—";
}


function formatArray(value) {

  if (!Array.isArray(value)) {
    return value || "Not available";
  }

  return value.join(", ");
}


function showUniversityError(message) {

  const hero =
    document.querySelector(
      "#universityHero"
    );

  if (!hero) return;

  hero.innerHTML = `
    <div class="empty-state">
      <p class="eyebrow">Postcard unavailable</p>

      <h1>
        ${message}
      </h1>

      <a
        href="discover.html"
        class="primary-button">
        Return to Discover
      </a>
    </div>
  `;
}
