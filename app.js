// Score Class
class Score {
  constructor(firstName, lastName, country, score, date, id) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.score = Number(score);
    this.date = date;
    this.id = id;
  }
}

// UI Class
class UI {
  static getDate() {
    const date = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${month.slice(0, 3)} ${day}, ${year} ${hour}:${minutes}`;
  }

  static displayScores(data) {
    const scores = data;
    scores.forEach((score) => UI.addScoreToList(score));
  }

  static addScoreToList(score) {
    const list = document.querySelector('[data-hook="list"]');

    const div = document.createElement("div");
    div.classList.add("list__item");

    div.innerHTML += `
    <div class="data">
        <div class="data__item data__item--primary">
            <h3>${score.firstName} ${score.lastName}</h3>
            <p>${score.date}</p>
        </div>
        <!--data__item-->
        <div class="data__item data__item--secondary">
            <h3>${score.country}</h3>
        </div>
        <!--data__item-->
        <div class="data__item data__item--tertiary">
            <h3>${score.score}</h3>
        </div>
        <!--data__item-->
    </div>
    <!--data-->
        <div class="control" id="${score.id}">
        <div class="control__item control__item--delete" data-hook="delete-btn">
                <i class="far fa-trash-alt"></i>
        </div>
        <!--control__item-->
        <div class="control__item control__item--increase" data-hook="increase">+5</div>
        <!--control__item-->
        <div class="control__item control__item--decrease" data-hook="decrease">-5</div>
        <!--control__item-->
        </div>
        <!--control-->
    </div>
  `;

    list.appendChild(div);
  }

  static deleteScore(target, data) {
    if (target.classList.contains("control__item--delete")) {
      target.parentElement.parentElement.remove();
      Store.removeScore(Number(target.parentElement.id), data);
    }
  }

  static changeScore(target, operation, data) {
    if (target.classList.contains(`control__item--${operation}`)) {
      const element = target.parentElement;
      const id = element.id;
      Store.manipulateScore(id, operation, data);
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert--${className}`;
    div.innerText = `${message}`;
    const container = document.querySelector('[data-hook="container"]');
    const list = document.querySelector('[data-hook="list"]');
    container.insertBefore(div, list);
    // Remove after 3s
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector('[data-hook="form"]').reset();
  }

  static render(data) {
    const list = document.querySelector('[data-hook="list"]');
    list.innerHTML = "";
    UI.displayScores(data);
  }
}

// Store Class
class Store {
  static getScores() {
    let scores;
    let sortedScores;
    if (localStorage.getItem("scores") === null) {
      sortedScores = [];
    } else {
      scores = JSON.parse(localStorage.getItem("scores"));
      sortedScores = scores.sort((a, b) => b.score - a.score);
    }
    return sortedScores;
  }

  static addScore(score, data) {
    let scores = data;
    scores.push(score);
    let sortedScores = scores.sort((a, b) => b.score - a.score);
    localStorage.setItem("scores", JSON.stringify(sortedScores));
    UI.render(sortedScores);
  }

  static manipulateScore(id, operation, data) {
    let scores = data;
    let newScores;
    let sortedScores;

    if (operation === "increase") {
      newScores = scores.map((score) => {
        if (score.id == id) {
          score.score += 5;
        }
        return score;
      });
    } else {
      newScores = scores.map((score) => {
        if (score.id == id) {
          score.score -= 5;
        }
        return score;
      });
    }

    sortedScores = newScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("scores", JSON.stringify(sortedScores));
    UI.render(sortedScores);
  }

  static removeScore(id, data) {
    const scores = data;
    scores.forEach((score, index) => {
      if (score.id === id) {
        scores.splice(index, 1);
      }
    });

    localStorage.setItem("scores", JSON.stringify(scores));
  }
}

// Display List
document.addEventListener("DOMContentLoaded", () => {
  const data = [...Store.getScores()];
  console.log(data);
  UI.displayScores(data);
  addEventListeners(data);
});

// Event: Add the Score
function addEventListeners(data) {
  document
    .querySelector('[data-hook="form"]')
    .addEventListener("submit", (e) => {
      e.preventDefault();
      // Get Form values
      const firstName = document.querySelector('[data-hook="first-name"]')
        .value;
      const lastName = document.querySelector('[data-hook="last-name"]').value;
      const country = document.querySelector('[data-hook="country"]').value;
      const points = document.querySelector('[data-hook="score"]').value;
      // Get Date and Time Values
      const date = UI.getDate();
      const id = new Date().getTime();

      // Validate
      if (
        firstName === "" ||
        lastName === "" ||
        country === "" ||
        points === ""
      ) {
        UI.showAlert("Please fill all the fields", "error");
      } else if (isNaN(points)) {
        UI.showAlert("Player Score must be a Number", "error");
      } else {
        // Instantiate a Score
        const score = new Score(firstName, lastName, country, points, date, id);
        UI.addScoreToList(score);

        // Score to store
        Store.addScore(score, data);

        // Show Success Message
        UI.showAlert("Score added", "success");

        // Clear Fields
        UI.clearFields();
      }
    });

  document
    .querySelector('[data-hook="list"]')
    .addEventListener("click", (e) => {
      // Event: Remove The Score
      UI.deleteScore(e.target, data);

      // Event: Add 5 points
      UI.changeScore(e.target, "increase", data);

      // Event: Remove 5 points
      UI.changeScore(e.target, "decrease", data);

      // Show Success Message
      if (e.target.classList.contains("control__item--delete")) {
        UI.showAlert("Score Removed", "error");
      }
    });
}
