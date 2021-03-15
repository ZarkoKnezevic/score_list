// const container = document.querySelector(".container");
// const firstName = container.querySelector('[data-hook="first-name"]');
// const lastName = container.querySelector('[data-hook="last-name"]');
// const country = container.querySelector('[data-hook="country"]');
// const score = container.querySelector('[data-hook="score"]');
// const submitBtn = container.querySelector('[data-hook="submit-btn"]');

// Score Class
class Score {
  constructor(firstName, lastName, date, country, score) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.date = date;
    this.country = country;
    this.score = score;
  }
}

// UI Class
class UI {
  static displayBooks() {
    const storedScores = [
      {
        firstName: "Martha",
        lastName: "Yohanes",
        date: "Jan 30, 2020 01.09",
        country: "Finland",
        score: 85,
      },
      {
        firstName: "John",
        lastName: "Smith",
        date: "Jan 30, 2020 01.09",
        country: "USA",
        score: 84,
      },
      {
        firstName: "David",
        lastName: "Smith",
        date: "Jan 30, 2020 01.09",
        country: "United Kingdom",
        score: 80,
      },
      {
        firstName: "Asabeneh",
        lastName: "Yatayeh",
        date: "Jan 30, 2020 01.09",
        country: "Finland",
        score: 75,
      },
      {
        firstName: "Mathias",
        lastName: "Elias",
        date: "Jan 30, 2020 01.09",
        country: "Sweden",
        score: 70,
      },
    ];

    const scores = storedScores;

    scores.forEach(score => UI.addScoreToList(score));
  }

  static addScoreToList(score) {

  }
}

// Store Class

// Display List

// Event: Add the Score

// Event: Remove The Score

// Event: Add 5 points

// Event: Remove 5 points
