/* =========================================================
   ASxKS
   DIGITAL WORKBOOK
========================================================= */


/* =========================================================
   JOBSHEET DATA
========================================================= */

const totalJobsheets = 24;


const architectData = {

    amalia: {

        name: "AMALIA SAFIA",

        code: "[ HEX ] / SET 12",

        set: 12,

        folder: "amalia",

        description:
            "ENGINEERING & SYSTEMS"

    },


    khairul: {

        name: "KHAIRUL SHAMSI",

        code: "[ IRIS ] / SET 11",

        set: 11,

        folder: "khairul",

        description:
            "DESIGN & EXPERIENCE"

    }

};


/* =========================================================
   SYSTEM INITIALIZATION
========================================================= */

window.addEventListener(
    "load",
    function () {

        const loader =
            document.getElementById(
                "systemLoader"
            );


        setTimeout(
            function () {

                if (loader) {

                    loader.classList.add(
                        "loaded"
                    );

                }

            },
            2400
        );


        updateProgress(
            "amalia"
        );

        updateProgress(
            "khairul"
        );

    }
);


/* =========================================================
   ARCHITECT SELECTION
========================================================= */

function selectArchitect(student) {

    const architect =
        architectData[student];


    if (!architect) {
        return;
    }


    const selection =
        document.getElementById(
            "architectSelection"
        );


    const archive =
        document.getElementById(
            "selectedArchive"
        );


    const name =
        document.getElementById(
            "selectedArchitectName"
        );


    const code =
        document.getElementById(
            "selectedArchitectCode"
        );


    if (!selection || !archive) {
        return;
    }


    selection.style.display =
        "none";


    archive.classList.add(
        "active"
    );


    if (name) {

        name.textContent =
            architect.name;

    }


    if (code) {

        code.textContent =
            architect.code;

    }


    createJobsheetCards(
        student
    );


    archive.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   BACK TO ARCHITECT SELECTION
========================================================= */

function backToArchitects() {

    const selection =
        document.getElementById(
            "architectSelection"
        );


    const archive =
        document.getElementById(
            "selectedArchive"
        );


    if (selection) {

        selection.style.display =
            "grid";

    }


    if (archive) {

        archive.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   CREATE 24 JOBSHEET CARDS
========================================================= */

function createJobsheetCards(student) {

    const architect =
        architectData[student];


    const grid =
        document.getElementById(
            "jobsheetGrid"
        );


    if (!architect || !grid) {
        return;
    }


    grid.innerHTML = "";


    for (
        let i = 1;
        i <= totalJobsheets;
        i++
    ) {


        const number =
            String(i).padStart(
                2,
                "0"
            );


        const folderPath =
            `jobsheets/${architect.folder}`;


        const pdfPath =
            `${folderPath}/jobsheet${i}pdf.pdf`;


        const livePath =
            `${folderPath}/jobsheet${i}live.html`;


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "archive-jobsheet-card";


        card.style.animationDelay =
            `${i * 0.035}s`;


        card.innerHTML = `

            <div class="jobsheet-card-top">

                <span class="jobsheet-card-number">
                    JOBSHEET #${number}
                </span>

                <span class="jobsheet-set-badge">
                    SET ${architect.set}
                </span>

            </div>


            <h3 class="jobsheet-card-title">
                JOBSHEET ${number}
            </h3>


            <div class="jobsheet-card-divider"></div>


            <p class="jobsheet-card-description">
                Practical work for Jobsheet ${i}.
                Add the specific title and description
                for this practical task when available.
            </p>


            <div class="jobsheet-card-actions">

                <a
                    class="jobsheet-action pdf"
                    href="${pdfPath}"
                    target="_blank"
                    rel="noopener noreferrer">

                    VIEW PDF

                </a>


                <a
                    class="jobsheet-action live"
                    href="${livePath}"
                    target="_blank"
                    rel="noopener noreferrer">

                    VIEW LIVE

                </a>

            </div>

        `;


        grid.appendChild(
            card
        );

    }

}


/* =========================================================
   PROGRESS
========================================================= */

function getCompletedJobsheets(
    student
) {

    const storageKey =
        student === "amalia"
            ? "amaliaCompleted"
            : "khairulCompleted";


    const stored =
        localStorage.getItem(
            storageKey
        );


    if (!stored) {
        return [];
    }


    try {

        const parsed =
            JSON.parse(stored);


        if (Array.isArray(parsed)) {

            return parsed;

        }


        return [];

    } catch (error) {

        return [];

    }

}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress(
    student
) {

    const completed =
        getCompletedJobsheets(
            student
        );


    const count =
        Math.min(
            completed.length,
            totalJobsheets
        );


    const percentage =
        Math.round(
            (count / totalJobsheets) * 100
        );


    const countElement =
        document.getElementById(
            `${student}Count`
        );


    const progressElement =
        document.getElementById(
            `${student}Progress`
        );


    const percentageElement =
        document.getElementById(
            `${student}Percentage`
        );


    if (countElement) {

        countElement.textContent =
            count;

    }


    if (progressElement) {

        progressElement.style.width =
            `${percentage}%`;

    }


    if (percentageElement) {

        percentageElement.textContent =
            `${percentage}%`;

    }

}


/* =========================================================
   MARK JOBSHEET COMPLETE
========================================================= */

function markJobsheetComplete(
    student,
    jobsheetNumber
) {

    const storageKey =
        student === "amalia"
            ? "amaliaCompleted"
            : "khairulCompleted";


    const completed =
        getCompletedJobsheets(
            student
        );


    if (
        !completed.includes(
            jobsheetNumber
        )
    ) {

        completed.push(
            jobsheetNumber
        );

    }


    localStorage.setItem(
        storageKey,
        JSON.stringify(
            completed
        )
    );


    updateProgress(
        student
    );

}


/* =========================================================
   CURSOR GLOW
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const cursorGlow =
            document.createElement(
                "div"
            );


        cursorGlow.className =
            "cursor-glow";


        document.body.appendChild(
            cursorGlow
        );


        document.addEventListener(
            "mousemove",
            function (event) {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );


        /* =============================================
           PAGE SCAN
        ============================================== */

        const scanLine =
            document.createElement(
                "div"
            );


        scanLine.className =
            "editorial-scan";


        document.body.appendChild(
            scanLine
        );


        /* =============================================
           PARTICLES
        ============================================== */

        for (
            let i = 0;
            i < 35;
            i++
        ) {

            const particle =
                document.createElement(
                    "div"
                );


            particle.className =
                "editorial-particle";


            particle.style.left =
                `${Math.random() * 100}vw`;


            particle.style.top =
                `${Math.random() * 100}vh`;


            particle.style.setProperty(
                "--duration",
                `${6 + Math.random() * 10}s`
            );


            particle.style.setProperty(
                "--move-x",
                `${-40 + Math.random() * 80}px`
            );


            particle.style.setProperty(
                "--move-y",
                `${-50 + Math.random() * 100}px`
            );


            document.body.appendChild(
                particle
            );

        }


        /* =============================================
           MOUSE PARALLAX
        ============================================== */

        const hero =
            document.querySelector(
                ".hero"
            );


        if (hero) {

            document.addEventListener(
                "mousemove",
                function (event) {

                    const x =
                        (
                            event.clientX /
                            window.innerWidth
                        ) - 0.5;


                    const y =
                        (
                            event.clientY /
                            window.innerHeight
                        ) - 0.5;


                    hero.style.transform =
                        `
                        translate(
                            ${x * 4}px,
                            ${y * 3}px
                        )
                        `;

                }
            );

        }


        /* =============================================
           SOUND
        ============================================== */

        const soundToggle =
            document.getElementById(
                "soundToggle"
            );


        const ambientSound =
            document.getElementById(
                "ambientSound"
            );


        if (
            soundToggle &&
            ambientSound
        ) {

            soundToggle.addEventListener(
                "click",
                function () {


                    if (
                        ambientSound.paused
                    ) {

                        ambientSound.volume =
                            0.18;


                        const playPromise =
                            ambientSound.play();


                        if (
                            playPromise !== undefined
                        ) {

                            playPromise
                                .then(
                                    function () {

                                        soundToggle
                                            .classList
                                            .add(
                                                "active"
                                            );


                                        soundToggle
                                            .querySelector(
                                                ".sound-label"
                                            )
                                            .textContent =
                                            "SOUND ON";

                                    }
                                )
                                .catch(
                                    function () {

                                        soundToggle
                                            .querySelector(
                                                ".sound-label"
                                            )
                                            .textContent =
                                            "SOUND OFF";

                                    }
                                );

                        }


                    } else {


                        ambientSound.pause();


                        soundToggle
                            .classList
                            .remove(
                                "active"
                            );


                        soundToggle
                            .querySelector(
                                ".sound-label"
                            )
                            .textContent =
                            "SOUND OFF";

                    }

                }
            );

        }


        /* =============================================
           SCROLL REVEAL
        ============================================== */

        const revealElements =
            document.querySelectorAll(
                ".technology-section, " +
                ".about-section, " +
                ".technology-card, " +
                ".architect-option"
            );


        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "editorial-reveal"
                );

            }
        );


        if (
            "IntersectionObserver"
            in window
        ) {


            const revealObserver =
                new IntersectionObserver(
                    function (entries) {


                        entries.forEach(
                            function (entry) {


                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "visible"
                                        );


                                    revealObserver
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );


                    },
                    {
                        threshold: 0.12
                    }
                );


            revealElements.forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


    }
);