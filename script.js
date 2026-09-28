const totalJobsheets = 24;

let selectedJobsheet = 0;
let selectedArchitect = "";

const architectData = {

    amalia: {
        name: "AMALIA SAFIA",
        code: "[ HEX ]",
        set: "SET 12",
        folder: "amalia"
    },

    khairul: {
        name: "KHAIRUL SHAMSI",
        code: "[ IRIS ]",
        set: "SET 11",
        folder: "khairul"
    }

};


const amaliaCompleted = Number(
    localStorage.getItem("amaliaCompleted") || 0
);

const khairulCompleted = Number(
    localStorage.getItem("khairulCompleted") || 0
);


document.addEventListener("DOMContentLoaded", function () {

    createArchiveHeader();

    createJobsheets();

    updateProgress(
        "amalia",
        amaliaCompleted
    );

    updateProgress(
        "khairul",
        khairulCompleted
    );

    setupArchitectSelection();

});


function setupArchitectSelection() {

    const cards =
        document.querySelectorAll(".progress-card");

    if (!cards.length) {
        return;
    }


    if (cards[0]) {

        cards[0].setAttribute(
            "role",
            "button"
        );

        cards[0].setAttribute(
            "tabindex",
            "0"
        );

        cards[0].addEventListener(
            "click",
            function () {
                selectArchitect("amalia");
            }
        );

        cards[0].addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    selectArchitect("amalia");

                }

            }
        );

    }


    if (cards[1]) {

        cards[1].setAttribute(
            "role",
            "button"
        );

        cards[1].setAttribute(
            "tabindex",
            "0"
        );

        cards[1].addEventListener(
            "click",
            function () {
                selectArchitect("khairul");
            }
        );

        cards[1].addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    selectArchitect("khairul");

                }

            }
        );

    }

}


function createArchiveHeader() {

    const grid =
        document.getElementById("jobsheetGrid");

    if (!grid) {
        return;
    }


    const header =
        document.createElement("div");

    header.className =
        "archive-header";

    header.id =
        "archiveHeader";

    header.innerHTML = `

        <div class="archive-header-left">

            <span class="archive-header-mark"></span>

            <div>

                <div class="archive-header-label">
                    SELECT ARCHITECT
                </div>

                <h3 class="archive-header-name">
                    NO ARCHITECT SELECTED
                </h3>

            </div>

        </div>

        <div class="archive-header-set">
            CHOOSE AN ARCHITECT ABOVE
        </div>

    `;


    grid.parentNode.insertBefore(
        header,
        grid
    );

}


function selectArchitect(student) {

    if (!architectData[student]) {
        return;
    }


    selectedArchitect =
        student;


    const data =
        architectData[student];


    const cards =
        document.querySelectorAll(".progress-card");


    cards.forEach(function (card) {

        card.classList.remove(
            "selected"
        );

    });


    if (student === "amalia" && cards[0]) {

        cards[0].classList.add(
            "selected"
        );

    }


    if (student === "khairul" && cards[1]) {

        cards[1].classList.add(
            "selected"
        );

    }


    const header =
        document.getElementById(
            "archiveHeader"
        );


    if (header) {

        header.innerHTML = `

            <div class="archive-header-left">

                <span class="archive-header-mark"></span>

                <div>

                    <div class="archive-header-label">
                        SELECTED ARCHITECT
                    </div>

                    <h3 class="archive-header-name">
                        ${data.code} ${data.name}
                    </h3>

                </div>

            </div>

            <div class="archive-header-set">
                ${data.set}
            </div>

        `;

    }


    createJobsheets(student);


    const grid =
        document.getElementById(
            "jobsheetGrid"
        );


    if (grid) {

        setTimeout(function () {

            grid.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }

}


function createJobsheets(student = "") {

    const container =
        document.getElementById(
            "jobsheetGrid"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!student) {

        container.classList.remove(
            "archive-active"
        );


        const placeholder =
            document.createElement("div");

        placeholder.className =
            "archive-placeholder";

        placeholder.innerHTML =
            "SELECT AN ARCHITECT TO ACCESS THE 24 JOBSHEETS";


        container.appendChild(
            placeholder
        );

        return;

    }


    const architect =
        architectData[student];


    if (!architect) {
        return;
    }


    container.classList.add(
        "archive-active"
    );


    for (
        let i = 1;
        i <= totalJobsheets;
        i++
    ) {

        const number =
            String(i).padStart(2, "0");


        const pdfPath =
            `jobsheets/${architect.folder}/jobsheet${i}pdf.pdf`;


        const livePath =
            `jobsheets/${architect.folder}/jobsheet${i}live.html`;


        const card =
            document.createElement("article");


        card.className =
            "archive-jobsheet-card";


        card.innerHTML = `

            <div class="archive-jobsheet-top">

                <span class="archive-jobsheet-number">
                    LAB COURSEWORK
                </span>

                <span class="archive-jobsheet-set">
                    ${architect.set}
                </span>

            </div>


            <h3>
                JOBSHEET ${number}
            </h3>


            <p class="archive-jobsheet-description">
                Practical work for Jobsheet ${i}.
            </p>


            <div class="archive-jobsheet-actions">

                <a
                    class="archive-jobsheet-action pdf"
                    href="${pdfPath}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    VIEW PDF
                </a>


                <a
                    class="archive-jobsheet-action live"
                    href="${livePath}"
                    target="_blank"
                    rel="noopener norefferer"
                >
                    VIEW LIVE
                </a>

            </div>

        `;


        container.appendChild(
            card
        );

    }


    const backButton =
        document.createElement("button");


    backButton.type =
        "button";


    backButton.className =
        "archive-back";


    backButton.innerHTML =
        "← CHANGE ARCHITECT";


    backButton.onclick =
        function () {

            changeArchitect();

        };


    container.parentNode.appendChild(
        backButton
    );

}


function changeArchitect() {

    selectedArchitect = "";


    const cards =
        document.querySelectorAll(
            ".progress-card"
        );


    cards.forEach(function (card) {

        card.classList.remove(
            "selected"
        );

    });


    const header =
        document.getElementById(
            "archiveHeader"
        );


    if (header) {

        header.innerHTML = `

            <div class="archive-header-left">

                <span class="archive-header-mark"></span>

                <div>

                    <div class="archive-header-label">
                        SELECT ARCHITECT
                    </div>

                    <h3 class="archive-header-name">
                        NO ARCHITECT SELECTED
                    </h3>

                </div>

            </div>

            <div class="archive-header-set">
                CHOOSE AN ARCHITECT ABOVE
            </div>

        `;

    }


    const container =
        document.getElementById(
            "jobsheetGrid"
        );


    if (container) {

        createJobsheets();

    }


    const oldBackButton =
        document.querySelector(
            ".archive-back"
        );


    if (oldBackButton) {

        oldBackButton.remove();

    }


    const progress =
        document.querySelector(
            ".progress-container"
        );


    if (progress) {

        progress.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


function openJobsheet(event, number) {

    if (event) {
        event.preventDefault();
    }


    selectedJobsheet =
        number;


    const modal =
        document.getElementById(
            "studentModal"
        );


    const selectedNumber =
        document.getElementById(
            "selectedJobsheet"
        );


    if (selectedNumber) {

        selectedNumber.textContent =
            String(number).padStart(2, "0");

    }


    if (modal) {

        modal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }

}


function closeStudentModal() {

    const modal =
        document.getElementById(
            "studentModal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


function openStudentJobsheet(student) {

    if (!selectedJobsheet) {
        return;
    }


    const architect =
        architectData[student];


    if (!architect) {
        return;
    }


    const livePath =
        `jobsheets/${architect.folder}/jobsheet${selectedJobsheet}live.html`;


    window.location.href =
        livePath;

}


function updateProgress(
    student,
    completed
) {

    completed =
        Math.max(
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
            document.getElementById(
                "amaliaCount"
            );


        const percentageText =
            document.getElementById(
                "amaliaPercentage"
            );


        const progress =
            document.getElementById(
                "amaliaProgress"
            );


        if (count) {

            count.textContent =
                completed;

        }


        if (percentageText) {

            percentageText.textContent =
                `${percentage}%`;

        }


        if (progress) {

            setTimeout(
                function () {

                    progress.style.width =
                        `${percentage}%`;

                },
                200
            );

        }

    }


    if (student === "khairul") {

        const count =
            document.getElementById(
                "khairulCount"
            );


        const percentageText =
            document.getElementById(
                "khairulPercentage"
            );


        const progress =
            document.getElementById(
                "khairulProgress"
            );


        if (count) {

            count.textContent =
                completed;

        }


        if (percentageText) {

            percentageText.textContent =
                `${percentage}%`;

        }


        if (progress) {

            setTimeout(
                function () {

                    progress.style.width =
                        `${percentage}%`;

                },
                200
            );

        }

    }

}


function markJobsheetComplete(
    student,
    jobsheetNumber
) {

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


    updateProgress(
        student,
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