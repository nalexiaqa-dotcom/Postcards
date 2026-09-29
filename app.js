/* =========================================================
   POSTCARDS — SHARED APP FUNCTIONS
   ========================================================= */

const POSTCARDS_KEYS = {
  saved: "postcards_saved",
  compare: "postcards_compare",
  profile: "postcards_profile"
};


/* ---------- LOCAL STORAGE ---------- */

function getSavedIds() {
  return JSON.parse(
    localStorage.getItem(POSTCARDS_KEYS.saved) || "[]"
  );
}

function setSavedIds(ids) {
  localStorage.setItem(
    POSTCARDS_KEYS.saved,
    JSON.stringify(ids)
  );
}

function getCompareIds() {
  return JSON.parse(
    localStorage.getItem(POSTCARDS_KEYS.compare) || "[]"
  );
}

function setCompareIds(ids) {
  localStorage.setItem(
    POSTCARDS_KEYS.compare,
    JSON.stringify(ids)
  );
}

function getProfile() {
  return JSON.parse(
    localStorage.getItem(POSTCARDS_KEYS.profile) || "{}"
  );
}


/* ---------- SAVED UNIVERSITIES ---------- */

function isSaved(universityId) {
  return getSavedIds().includes(universityId);
}

function toggleSaved(universityId) {
  const saved = getSavedIds();

  if (saved.includes(universityId)) {
    setSavedIds(
      saved.filter(id => id !== universityId)
    );

    showToast("Removed from saved");
    return false;
  }

  saved.push(universityId);
  setSavedIds(saved);

  showToast("Saved to your collection");
  return true;
}


/* ---------- COMPARE ---------- */

function isInCompare(universityId) {
  return getCompareIds().includes(universityId);
}

function toggleCompare(universityId) {
  const compare = getCompareIds();

  if (compare.includes(universityId)) {
    setCompareIds(
      compare.filter(id => id !== universityId)
    );

    showToast("Removed from comparison");
    return false;
  }

  if (compare.length >= 4) {
    showToast("You can compare up to 4 universities");
    return false;
  }

  compare.push(universityId);
  setCompareIds(compare);

  showToast("Added to comparison");
  return true;
}


/* ---------- PROFILE ---------- */

function saveProfile(profile) {
  localStorage.setItem(
    POSTCARDS_KEYS.profile,
    JSON.stringify(profile)
  );
}


/* ---------- UNIVERSITY HELPERS ---------- */

function getUniversityById(id) {
  return universities.find(
    university => university.id === id
  );
}

function formatTuition(amount) {
  return `$${amount.toLocaleString()}`;
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
}


/* ---------- TOAST ---------- */

let toastTimeout;

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}


/* ---------- NAV PROFILE ---------- */

function updateNavProfile() {
  const profileButton =
    document.querySelector(".nav-profile");

  if (!profileButton) return;

  const profile = getProfile();

  if (profile.name) {
    profileButton.textContent =
      getInitials(profile.name);
  } else {
    profileButton.textContent = "P";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  updateNavProfile
);
