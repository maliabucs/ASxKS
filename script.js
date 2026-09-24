const totalJobsheets = 24;

let selectedJobsheet = 0;

const amaliaCompleted = Number(
    localStorage.getItem("amaliaCompleted") || 0
);

const khairulCompleted = Number(
    localStorage.getItem("khairulCompleted") || 0
);


document.addEventListener("DOMContentLoaded", function () {

    createJobsheets();

    updateProgress(
        "amalia",
        amaliaCompleted
    );

    updateProgress(
        "khairul",
        khairulCompleted
    );

});


function createJobsheets() {

    const container = document.getElementById("jobsheetGrid");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    for (let i = 1; i <= totalJobsheets; i++) {

        const card = document.createElement("button");

        card.className = "jobsheet-card";

        card.type = "button";

        card.onclick = function (event) {
            openJobsheet(event, i);
        };

        const number = String(i).padStart(2, "0");

        card.innerHTML = `
            <span class="jobsheet-number">
                JOBSHEET ${number}
            </span>

            <h3>
                 ${number}
            </h3>

            <p>
                SELECT STUDENT
            </p>

            <span class="jobsheet-arrow">
                →
            </span>
        `;

        container.appendChild(card);
    }

}


function openJobsheet(event, number) {

    if (event) {
        event.preventDefault();
    }

    selectedJobsheet = number;

    const modal = document.getElementById("studentModal");

    const selectedNumber =
        document.getElementById("selectedJobsheet");

    if (selectedNumber) {
        selectedNumber.textContent =
            String(number).padStart(2, "0");
    }

    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

}


function closeStudentModal() {

    const modal =
        document.getElementById("studentModal");

    if (modal) {
        modal.classList.remove("active");
    }

    document.body.style.overflow = "";

}


function openStudentJobsheet(student) {

    if (!selectedJobsheet) {
        return;
    }

    const number =
        String(selectedJobsheet).padStart(2, "0");

    let fileName =
        `jobsheet${selectedJobsheet}.html`;

    let url =
        `jobsheets/${fileName}?student=${student}&jobsheet=${number}`;

    window.location.href = url;

}


function updateProgress(student, completed) {

    completed = Math.max(
        0,
        Math.min(
            totalJobsheets,
            completed
        )
    );

    const percentage =
        Math.round(
            (completed / totalJobsheets) * 100
        );


    if (student === "amalia") {

        const count =
            document.getElementById("amaliaCount");

        const percentageText =
            document.getElementById("amaliaPercentage");

        const progress =
            document.getElementById("amaliaProgress");


        if (count) {
            count.textContent = completed;
        }

        if (percentageText) {
            percentageText.textContent =
                `${percentage}%`;
        }

        if (progress) {
            setTimeout(function () {
                progress.style.width =
                    `${percentage}%`;
            }, 200);
        }

    }


    if (student === "khairul") {

        const count =
            document.getElementById("khairulCount");

        const percentageText =
            document.getElementById("khairulPercentage");

        const progress =
            document.getElementById("khairulProgress");


        if (count) {
            count.textContent = completed;
        }

        if (percentageText) {
            percentageText.textContent =
                `${percentage}%`;
        }

        if (progress) {
            setTimeout(function () {
                progress.style.width =
                    `${percentage}%`;
            }, 200);
        }

    }

}


function markJobsheetComplete(student, jobsheetNumber) {

    if (
        jobsheetNumber < 1 ||
        jobsheetNumber > totalJobsheets
    ) {
        return;
    }


    let completed =
        Number(
            localStorage.getItem(
                `${student}Completed`
            ) || 0
        );


    completed++;

    completed =
        Math.min(
            totalJobsheets,
            completed
        );


    localStorage.setItem(
        `${student}Completed`,
        completed
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeStudentModal();
        }

    }
);

// =========================================================
// ANIMASI COUNTER UNTUK NOMBOR STATISTIK
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Gantikan '.number-stat' dengan class/ID elemen nombor 24 anda
  const statElement = document.querySelector(".number-stat"); 

  if (statElement) {
    let startVal = 0;
    const endVal = parseInt(statElement.textContent) || 24;
    const duration = 2000; // 2 saat
    const stepTime = Math.abs(Math.floor(duration / endVal));

    statElement.textContent = "0";

    const timer = setInterval(() => {
      startVal += 1;
      statElement.textContent = startVal;
      if (startVal === endVal) {
        clearInterval(timer);
      }
    }, stepTime);
  }
});