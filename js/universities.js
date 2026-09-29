const universities = [
  {
    id: "nyu",
    name: "New York University",
    shortName: "NYU",
    city: "New York",
    state: "NY",
    type: "Private",
    tuition: 65000,
    acceptanceRate: 13,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Data Science",
      "Media"
    ],
    tags: ["New York", "Technology", "Business"]
  },

  {
    id: "pace",
    name: "Pace University",
    shortName: "Pace",
    city: "New York",
    state: "NY",
    type: "Private",
    tuition: 52000,
    acceptanceRate: 83,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Information Technology"
    ],
    tags: ["New York", "Technology", "Business"]
  },

  {
    id: "fordham",
    name: "Fordham University",
    shortName: "Fordham",
    city: "New York",
    state: "NY",
    type: "Private",
    tuition: 62000,
    acceptanceRate: 54,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Communications"
    ],
    tags: ["New York", "Business"]
  },

  {
    id: "barnard",
    name: "Barnard College",
    shortName: "Barnard",
    city: "New York",
    state: "NY",
    type: "Private",
    tuition: 68000,
    acceptanceRate: 9,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Economics",
      "Media",
      "Data Science"
    ],
    tags: ["New York", "Women", "Technology"]
  },

  {
    id: "columbia",
    name: "Columbia University",
    shortName: "Columbia",
    city: "New York",
    state: "NY",
    type: "Private",
    tuition: 70000,
    acceptanceRate: 4,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Data Science",
      "Business",
      "Engineering"
    ],
    tags: ["New York", "Technology"]
  },

  {
    id: "new-school",
    name: "The New School",
    shortName: "The New School",
    city: "New York",
    state: "NY",
    type: "Private",
    tuition: 56000,
    acceptanceRate: 57,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Media",
      "Design",
      "Marketing"
    ],
    tags: ["New York", "Creative", "Media"]
  },

  {
    id: "st-johns",
    name: "St. John's University",
    shortName: "St. John's",
    city: "New York",
    state: "NY",
    type: "Private",
    tuition: 48000,
    acceptanceRate: 85,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Media"
    ],
    tags: ["New York", "Business"]
  },

  {
    id: "hofstra",
    name: "Hofstra University",
    shortName: "Hofstra",
    city: "Hempstead",
    state: "NY",
    type: "Private",
    tuition: 55000,
    acceptanceRate: 62,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Data Science"
    ],
    tags: ["New York", "Technology"]
  },

  {
    id: "rit",
    name: "Rochester Institute of Technology",
    shortName: "RIT",
    city: "Rochester",
    state: "NY",
    type: "Private",
    tuition: 58000,
    acceptanceRate: 71,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Artificial Intelligence",
      "Game Design",
      "Data Science"
    ],
    tags: ["Technology", "New York"]
  },

  {
    id: "syracuse",
    name: "Syracuse University",
    shortName: "Syracuse",
    city: "Syracuse",
    state: "NY",
    type: "Private",
    tuition: 62000,
    acceptanceRate: 46,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Media",
      "Data Science"
    ],
    tags: ["New York", "Media"]
  },

  {
    id: "bu",
    name: "Boston University",
    shortName: "BU",
    city: "Boston",
    state: "MA",
    type: "Private",
    tuition: 64000,
    acceptanceRate: 11,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Media"
    ],
    tags: ["Boston", "Technology", "Business"]
  },

  {
    id: "northeastern",
    name: "Northeastern University",
    shortName: "Northeastern",
    city: "Boston",
    state: "MA",
    type: "Private",
    tuition: 63000,
    acceptanceRate: 6,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Artificial Intelligence",
      "Business",
      "Data Science"
    ],
    tags: ["Boston", "Technology"]
  },

  {
    id: "umass",
    name: "University of Massachusetts Amherst",
    shortName: "UMass Amherst",
    city: "Amherst",
    state: "MA",
    type: "Public",
    tuition: 40000,
    acceptanceRate: 66,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Data Science",
      "Business",
      "Informatics"
    ],
    tags: ["Massachusetts", "Technology"]
  },

  {
    id: "georgia-tech",
    name: "Georgia Institute of Technology",
    shortName: "Georgia Tech",
    city: "Atlanta",
    state: "GA",
    type: "Public",
    tuition: 33000,
    acceptanceRate: 17,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Artificial Intelligence",
      "Business",
      "Data Science"
    ],
    tags: ["Technology", "Atlanta"]
  },

  {
    id: "american",
    name: "American University",
    shortName: "AU",
    city: "Washington",
    state: "DC",
    type: "Private",
    tuition: 56000,
    acceptanceRate: 47,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Communications"
    ],
    tags: ["Washington DC", "Business"]
  },

  {
    id: "gwu",
    name: "George Washington University",
    shortName: "GW",
    city: "Washington",
    state: "DC",
    type: "Private",
    tuition: 64000,
    acceptanceRate: 42,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Data Science",
      "Media"
    ],
    tags: ["Washington DC", "Technology"]
  },

  {
    id: "drexel",
    name: "Drexel University",
    shortName: "Drexel",
    city: "Philadelphia",
    state: "PA",
    type: "Private",
    tuition: 59000,
    acceptanceRate: 80,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Marketing",
      "Data Science"
    ],
    tags: ["Philadelphia", "Technology"]
  },

  {
    id: "temple",
    name: "Temple University",
    shortName: "Temple",
    city: "Philadelphia",
    state: "PA",
    type: "Public",
    tuition: 31000,
    acceptanceRate: 80,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Business",
      "Media",
      "Marketing"
    ],
    tags: ["Philadelphia", "Business"]
  },

  {
    id: "usc",
    name: "University of Southern California",
    shortName: "USC",
    city: "Los Angeles",
    state: "CA",
    type: "Private",
    tuition: 68000,
    acceptanceRate: 10,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Artificial Intelligence",
      "Business",
      "Media"
    ],
    tags: ["California", "Technology", "Media"]
  },

  {
    id: "ucsd",
    name: "University of California, San Diego",
    shortName: "UC San Diego",
    city: "San Diego",
    state: "CA",
    type: "Public",
    tuition: 52000,
    acceptanceRate: 24,
    internationalStudents: true,
    scholarships: true,
    majors: [
      "Computer Science",
      "Data Science",
      "Artificial Intelligence",
      "Business"
    ],
    tags: ["California", "Technology"]
  }
];
