const POSTCARDS_KEYS = {
  saved: "postcards_saved",
  compare: "postcards_compare",
  profile: "postcards_profile",
  planner: "postcards_planner"
};

/* =========================
   STORAGE HELPERS
========================= */

function readStorage(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error("Postcards storage error:", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


/* =========================
   SAVED UNIVERSITIES
========================= */

function getSavedIds() {
  return readStorage(POSTCARDS_KEYS.saved, []);
}

function setSavedIds(ids) {
  writeStorage(POSTCARDS_KEYS.saved, ids);
}

function isSaved(universityId) {
  return getSavedIds().includes(universityId);
}

function toggleSaved(universityId) {
  const saved = getSavedIds();

  if (saved.includes(universityId)) {
    setSavedIds(saved.filter(id => id !== universityId));
    showToast("Removed from saved");
    return false;
  }

  saved.push(universityId);
  setSavedIds(saved);

  showToast("Saved to your collection");
  return true;
}


/* =========================
   COMPARE
========================= */

function getCompareIds() {
  return readStorage(POSTCARDS_KEYS.compare, []);
}

function setCompareIds(ids) {
  writeStorage(POSTCARDS_KEYS.compare, ids);
}

function isInCompare(universityId) {
  return getCompareIds().includes(universityId);
}

function toggleCompare(universityId) {
  const compare = getCompareIds();

  if (compare.includes(universityId)) {
    setCompareIds(compare.filter(id => id !== universityId));
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


/* =========================
   UNIVERSITY DATA
========================= */

function getUniversityById(id) {
  if (!Array.isArray(universities)) {
    return null;
  }

  return universities.find(university => university.id === id) || null;
}

function getUniversitiesByIds(ids) {
  return ids
    .map(id => getUniversityById(id))
    .filter(Boolean);
}


/* =========================
   PROFILE
========================= */

function getProfile() {
  return readStorage(POSTCARDS_KEYS.profile, {});
}

function saveProfile(profile) {
  writeStorage(POSTCARDS_KEYS.profile, profile);
}


/* =========================
   PLANNER
========================= */

function getPlannerTasks() {
  return readStorage(POSTCARDS_KEYS.planner, []);
}

function setPlannerTasks(tasks) {
  writeStorage(POSTCARDS_KEYS.planner, tasks);
}

function addPlannerTask(task) {
  const tasks = getPlannerTasks();

  const newTask = {
    id: Date.now().toString(),
    title: task.title || "New task",
    category: task.category || "General",
    university: task.university || "",
    date: task.date || "",
    completed: false
  };

  tasks.push(newTask);
  setPlannerTasks(tasks);

  return newTask;
}

function updatePlannerTask(taskId, updates) {
  const tasks = getPlannerTasks();

  const updated = tasks.map(task => {
    if (task.id !== taskId) return task;

    return {
      ...task,
      ...updates
    };
  });

  setPlannerTasks(updated);
  return updated;
}

function deletePlannerTask(taskId) {
  const tasks = getPlannerTasks();

  setPlannerTasks(
    tasks.filter(task => task.id !== taskId)
  );
}


/* =========================
   FORMATTING
========================= */

function formatTuition(amount) {
  if (typeof amount !== "number") {
    return "Not available";
  }

  return `$${amount.toLocaleString()}`;
}

function formatAcceptanceRate(rate) {
  if (rate === null || rate === undefined || rate === "") {
    return "Not available";
  }

  return `${rate}%`;
}

function getInitials(name) {
  if (!name) return "P";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
}


/* =========================
   URL HELPERS
========================= */

function getUniversityFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function openUniversity(universityId) {
  window.location.href =
    `university.html?id=${encodeURIComponent(universityId)}`;
}


/* =========================
   NAVIGATION
========================= */

function setupNavigation() {
  const universityLinks =
    document.querySelectorAll("[data-university-link]");

  universityLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const id = link.dataset.universityLink;

      if (id) {
        openUniversity(id);
      }
    });
  });
}


/* =========================
   TOAST
========================= */

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


/* =========================
   NAV PROFILE
========================= */

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


/* =========================
   GLOBAL COUNTS
========================= */

function updateGlobalCounts() {
  const savedCount = getSavedIds().length;
  const compareCount = getCompareIds().length;

  document
    .querySelectorAll("[data-saved-count]")
    .forEach(element => {
      element.textContent = savedCount;
    });

  document
    .querySelectorAll("[data-compare-count]")
    .forEach(element => {
      element.textContent = compareCount;
    });
}


/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  updateNavProfile();
  updateGlobalCounts();
  setupNavigation();
});
