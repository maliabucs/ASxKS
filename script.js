/* =========================================================
   ASxKS
   DIGITAL WORKBOOK
========================================================= */


/* =========================================================
   JOBSHEET DATA
========================================================= */

const totalJobsheets = 14;


const architectData = {

    amalia: {

        name: "AMALIA SAFIA",

        code: "[ HEX ] / SET 12",

        set: 12,

        folder: "amalia",

        // title shown on each card (1 to 14); empty = show the number
        titles: [
            "MY FAVOURITE PET",
            "HOME ENTERTAINMENT SYSTEM",
            "HEALTHCARE CLINIC",
            "THE GREAT WAVE OF KANAGAWA",
            "GALLERY MEMBERSHIP",
            "DATA ANALYTICS CENTRE",
            "AMAZING WATERFALLS",
            "MEDICAL APPOINTMENT",
            "SHOPPING CART",
            "JQUERY AJAX EXERCISE",
            "JQUERY",
            "JQUERY TASK MANAGER",
            "WEB STORAGE (LOCAL STORAGE)",
            "WEB STORAGE (SESSION STORAGE)"
        ],

        // jobsheet numbers finished and published (e.g. [1, 2, 3])
        completed: [],

        description:
            "ENGINEERING & SYSTEMS"

    },


    khairul: {

        name: "KHAIRUL SHAMSI",

        code: "[ IRIS ] / SET 11",

        set: 11,

        folder: "khairul",

        // title shown on each card (1 to 14); empty = show the number
        titles: [],

        // jobsheet numbers finished and published (e.g. [1, 2, 3])
        completed: [],

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


    onArchitectOpened(
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

    onArchitectClosed();


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
   CREATE JOBSHEET CARDS
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


    const completedList =
        getCompletedJobsheets(
            student
        );


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


        const isDone =
            completedList.includes(i);


        card.className =
            isDone
                ? "archive-jobsheet-card is-done"
                : "archive-jobsheet-card";


        card.dataset.number = i;


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
                ${architect.titles[i - 1] || number}
            </h3>

            <span class="jobsheet-status">${isDone ? "COMPLETED" : "PENDING"}</span>


            <div class="jobsheet-card-divider"></div>

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

                <button
                    type="button"
                    class="jobsheet-action jobsheet-mark"
                    data-number="${i}">
                    ${isDone ? "UNDO" : "MARK DONE"}
                </button>

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

let currentArchitect = null;

const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


function getStorageKey(student) {

    return student === "amalia"
        ? "amaliaCompleted"
        : "khairulCompleted";

}


function normalizeCompleted(list) {

    const numbers =
        list
            .map(Number)
            .filter(
                function (n) {

                    return (
                        Number.isInteger(n) &&
                        n >= 1 &&
                        n <= totalJobsheets
                    );

                }
            );


    return Array
        .from(new Set(numbers))
        .sort(
            function (a, b) {
                return a - b;
            }
        );

}


function getCompletedJobsheets(
    student
) {

    let stored = null;


    try {

        stored =
            localStorage.getItem(
                getStorageKey(student)
            );

    } catch (error) {

        stored = null;

    }


    if (stored) {

        try {

            const parsed =
                JSON.parse(stored);


            if (Array.isArray(parsed)) {

                return normalizeCompleted(
                    parsed
                );

            }

        } catch (error) {

            /* fall through to published list */

        }

    }


    const architect =
        architectData[student];


    if (
        architect &&
        Array.isArray(architect.completed)
    ) {

        return normalizeCompleted(
            architect.completed
        );

    }


    return [];

}


function saveCompletedJobsheets(
    student,
    list
) {

    try {

        localStorage.setItem(
            getStorageKey(student),
            JSON.stringify(
                normalizeCompleted(list)
            )
        );

    } catch (error) {

        /* storage unavailable: progress stays in memory only */

    }

}


/* =========================================================
   NUMBER ANIMATION
========================================================= */

function tween(
    element,
    from,
    to,
    suffix
) {

    cancelAnimationFrame(
        element._raf
    );


    if (
        prefersReducedMotion ||
        from === to
    ) {

        element.textContent =
            `${to}${suffix}`;

        return;

    }


    const startTime =
        performance.now();

    const duration = 900;


    function step(now) {

        const t =
            Math.min(
                (now - startTime) / duration,
                1
            );

        const eased =
            1 - Math.pow(1 - t, 3);


        element.textContent =
            `${Math.round(from + (to - from) * eased)}${suffix}`;


        if (t < 1) {

            element._raf =
                requestAnimationFrame(step);

        }

    }


    element._raf =
        requestAnimationFrame(step);

}


function setAnimatedValue(
    element,
    to,
    suffix = ""
) {

    if (!element) {
        return;
    }


    const from =
        Number(element.dataset.value || 0);


    element.dataset.value = to;

    element.dataset.suffix = suffix;


    tween(
        element,
        from,
        to,
        suffix
    );

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


    setAnimatedValue(
        countElement,
        count
    );


    if (progressElement) {

        progressElement.style.width =
            `${percentage}%`;


        const track =
            progressElement.parentElement;


        if (track) {

            track.setAttribute(
                "aria-valuenow",
                percentage
            );

            track.classList.toggle(
                "is-complete",
                percentage === 100
            );

        }

    }


    setAnimatedValue(
        percentageElement,
        percentage,
        "%"
    );


    if (currentArchitect === student) {

        updateSelectedPanel(false);

    }


    updateOverall();

}


function updateOverall() {

    const done =
        getCompletedJobsheets("amalia").length +
        getCompletedJobsheets("khairul").length;


    const total =
        totalJobsheets * 2;


    const percentage =
        Math.round(
            (done / total) * 100
        );


    const fill =
        document.getElementById(
            "overallProgress"
        );


    const totalElement =
        document.getElementById(
            "overallTotal"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    setAnimatedValue(
        document.getElementById(
            "overallCount"
        ),
        done
    );


    setAnimatedValue(
        document.getElementById(
            "overallPercentage"
        ),
        percentage,
        "%"
    );


    if (fill) {

        fill.style.width =
            `${percentage}%`;


        if (fill.parentElement) {

            fill.parentElement.setAttribute(
                "aria-valuenow",
                percentage
            );

            fill.parentElement.classList.toggle(
                "is-complete",
                percentage === 100
            );

        }

    }

}


function updateSelectedPanel(
    replay
) {

    if (!currentArchitect) {
        return;
    }


    const completed =
        getCompletedJobsheets(
            currentArchitect
        );


    const count =
        completed.length;


    const percentage =
        Math.round(
            (count / totalJobsheets) * 100
        );


    const meter =
        document.getElementById(
            "segmentMeter"
        );


    setAnimatedValue(
        document.getElementById(
            "selectedPercent"
        ),
        percentage,
        "%"
    );


    setAnimatedValue(
        document.getElementById(
            "selectedCount"
        ),
        count
    );


    if (!meter) {
        return;
    }


    if (
        replay ||
        meter.children.length !== totalJobsheets
    ) {

        meter.innerHTML = "";

        meter.style.setProperty(
            "--total",
            totalJobsheets
        );


        for (
            let i = 1;
            i <= totalJobsheets;
            i++
        ) {

            const segment =
                document.createElement(
                    "button"
                );

            segment.type = "button";

            segment.className = "segment";

            segment.dataset.number = i;

            segment.setAttribute(
                "aria-label",
                `Go to jobsheet ${String(i).padStart(2, "0")}`
            );

            segment.title =
                `JOBSHEET #${String(i).padStart(2, "0")}`;

            meter.appendChild(
                segment
            );

        }


        /* force layout so segments animate from "off" */
        meter.offsetWidth;

    }


    meter
        .querySelectorAll(".segment")
        .forEach(
            function (segment, index) {

                const done =
                    completed.includes(
                        index + 1
                    );


                segment.style.transitionDelay =
                    done && replay
                        ? `${index * 55}ms`
                        : "0ms";


                segment.classList.toggle(
                    "on",
                    done
                );

            }
        );


    const panel =
        document.getElementById(
            "archiveProgressPanel"
        );


    if (panel) {

        panel.classList.toggle(
            "is-complete",
            count === totalJobsheets
        );

    }

}


/* =========================================================
   MARK / UNMARK JOBSHEET
========================================================= */

function markJobsheetComplete(
    student,
    jobsheetNumber
) {

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


    saveCompletedJobsheets(
        student,
        completed
    );


    updateProgress(
        student
    );

}


function unmarkJobsheetComplete(
    student,
    jobsheetNumber
) {

    const completed =
        getCompletedJobsheets(
            student
        ).filter(
            function (n) {
                return n !== jobsheetNumber;
            }
        );


    saveCompletedJobsheets(
        student,
        completed
    );


    updateProgress(
        student
    );

}


function toggleJobsheetComplete(
    student,
    jobsheetNumber
) {

    const isDone =
        getCompletedJobsheets(
            student
        ).includes(
            jobsheetNumber
        );


    if (isDone) {

        unmarkJobsheetComplete(
            student,
            jobsheetNumber
        );

    } else {

        markJobsheetComplete(
            student,
            jobsheetNumber
        );

    }


    return !isDone;

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


/* =========================================================
   NEW FEATURES
   completion hooks, filters, edit mode, toasts, scroll effects
========================================================= */

let activeFilter = "all";

let activeQuery = "";


function toast(message) {

    const stack =
        document.getElementById(
            "toastStack"
        );


    if (!stack) {
        return;
    }


    const item =
        document.createElement(
            "div"
        );


    item.className = "toast";

    item.textContent = message;


    stack.appendChild(item);


    while (stack.children.length > 3) {

        stack.removeChild(
            stack.firstChild
        );

    }


    setTimeout(
        function () {

            item.classList.add(
                "out"
            );

            setTimeout(
                function () {

                    item.remove();

                },
                380
            );

        },
        2600
    );

}


function onArchitectOpened(
    student
) {

    currentArchitect = student;

    activeFilter = "all";

    activeQuery = "";


    const overall =
        document.getElementById(
            "archiveOverall"
        );


    if (overall) {

        overall.hidden = true;

    }


    const search =
        document.getElementById(
            "jobsheetSearch"
        );


    if (search) {

        search.value = "";

    }


    document
        .querySelectorAll(".filter-chip[data-filter]")
        .forEach(
            function (chip) {

                chip.classList.toggle(
                    "active",
                    chip.dataset.filter === "all"
                );

            }
        );


    const percent =
        document.getElementById(
            "selectedPercent"
        );

    const count =
        document.getElementById(
            "selectedCount"
        );


    if (percent) {

        percent.dataset.value = 0;

        percent.textContent = "0%";

    }


    if (count) {

        count.dataset.value = 0;

        count.textContent = "0";

    }


    updateSelectedPanel(true);

    applyArchiveFilters();

}


function onArchitectClosed() {

    currentArchitect = null;


    const overall =
        document.getElementById(
            "archiveOverall"
        );


    if (overall) {

        overall.hidden = false;

    }

}


function applyArchiveFilters() {

    if (!currentArchitect) {
        return;
    }


    const cards =
        document.querySelectorAll(
            "#jobsheetGrid .archive-jobsheet-card"
        );


    let shown = 0;


    cards.forEach(
        function (card) {

            const number =
                Number(card.dataset.number);

            const done =
                card.classList.contains(
                    "is-done"
                );


            const matchesFilter =
                activeFilter === "all" ||
                (activeFilter === "done" && done) ||
                (activeFilter === "pending" && !done);


            const matchesQuery =
                !activeQuery ||
                String(number).includes(
                    activeQuery
                );


            const visible =
                matchesFilter &&
                matchesQuery;


            card.classList.toggle(
                "is-hidden",
                !visible
            );


            if (visible) {
                shown++;
            }

        }
    );


    const counter =
        document.getElementById(
            "archiveResultCount"
        );


    if (counter) {

        counter.textContent =
            `SHOWING ${shown} / ${totalJobsheets}`;

    }


    const empty =
        document.getElementById(
            "archiveEmpty"
        );


    if (empty) {

        empty.hidden =
            shown !== 0;

    }

}


function setCardState(
    card,
    done
) {

    if (!card) {
        return;
    }


    card.classList.toggle(
        "is-done",
        done
    );


    const status =
        card.querySelector(
            ".jobsheet-status"
        );


    const button =
        card.querySelector(
            ".jobsheet-mark"
        );


    if (status) {

        status.textContent =
            done
                ? "COMPLETED"
                : "PENDING";

    }


    if (button) {

        button.textContent =
            done
                ? "UNDO"
                : "MARK DONE";

    }


    if (done) {

        card.classList.add(
            "just-done"
        );

        setTimeout(
            function () {

                card.classList.remove(
                    "just-done"
                );

            },
            900
        );

    }

}


function focusJobsheet(number) {

    let card =
        document.querySelector(
            `#jobsheetGrid .archive-jobsheet-card[data-number="${number}"]`
        );


    if (!card) {
        return;
    }


    if (card.classList.contains("is-hidden")) {

        activeFilter = "all";

        activeQuery = "";


        const search =
            document.getElementById(
                "jobsheetSearch"
            );

        if (search) {
            search.value = "";
        }


        document
            .querySelectorAll(".filter-chip[data-filter]")
            .forEach(
                function (chip) {

                    chip.classList.toggle(
                        "active",
                        chip.dataset.filter === "all"
                    );

                }
            );


        applyArchiveFilters();

    }


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    card.classList.add("flash");

    setTimeout(
        function () {

            card.classList.remove(
                "flash"
            );

        },
        1400
    );

}


function toggleEditMode(force) {

    const on =
        typeof force === "boolean"
            ? force
            : !document.body.classList.contains(
                "edit-mode"
            );


    document.body.classList.toggle(
        "edit-mode",
        on
    );


    toast(
        on
            ? "EDIT MODE ON"
            : "EDIT MODE OFF"
    );

}


/* =========================================================
   HERO COUNT-UP (after loader)
========================================================= */

window.addEventListener(
    "load",
    function () {

        const heroTotal =
            document.getElementById(
                "heroTotal"
            );


        if (heroTotal) {

            heroTotal.textContent = "0";

            setTimeout(
                function () {

                    tween(
                        heroTotal,
                        0,
                        totalJobsheets,
                        ""
                    );

                },
                2500
            );

        }

    }
);


/* =========================================================
   FEATURE WIRING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* total count labels follow totalJobsheets */

        document
            .querySelectorAll(".total-count")
            .forEach(
                function (element) {

                    element.textContent =
                        totalJobsheets;

                }
            );


        /* =============================================
           LOADER PERCENT
        ============================================== */

        const loaderPercent =
            document.getElementById(
                "loaderPercent"
            );


        if (loaderPercent) {

            if (prefersReducedMotion) {

                loaderPercent.textContent =
                    "100%";

            } else {

                const t0 =
                    performance.now();


                (function tick(now) {

                    const t =
                        Math.min(
                            (now - t0) / 2200,
                            1
                        );

                    const eased =
                        1 - Math.pow(1 - t, 3);


                    loaderPercent.textContent =
                        `${String(Math.round(eased * 100)).padStart(3, "0")}%`;


                    if (t < 1) {

                        requestAnimationFrame(
                            tick
                        );

                    }

                })(t0);

            }

        }


        /* =============================================
           SCROLL PROGRESS + BACK TO TOP
        ============================================== */

        const scrollBar =
            document.getElementById(
                "scrollProgress"
            );

        const backToTop =
            document.getElementById(
                "backToTop"
            );

        let ticking = false;


        function onScroll() {

            const max =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                max > 0
                    ? Math.min(window.scrollY / max, 1)
                    : 0;


            if (scrollBar) {

                scrollBar.style.transform =
                    `scaleX(${progress})`;

            }


            if (backToTop) {

                backToTop.classList.toggle(
                    "visible",
                    window.scrollY > 600
                );

            }


            ticking = false;

        }


        window.addEventListener(
            "scroll",
            function () {

                if (!ticking) {

                    ticking = true;

                    requestAnimationFrame(
                        onScroll
                    );

                }

            },
            { passive: true }
        );


        onScroll();


        if (backToTop) {

            backToTop.addEventListener(
                "click",
                function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }


        /* =============================================
           ACTIVE NAV LINK
        ============================================== */

        const navLinks =
            document.querySelectorAll(
                "nav a[href^='#']"
            );


        const sections =
            ["dashboard", "jobsheets", "about"]
                .map(
                    function (id) {
                        return document.getElementById(id);
                    }
                )
                .filter(Boolean);


        if (
            "IntersectionObserver" in window &&
            sections.length
        ) {

            const navObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (!entry.isIntersecting) {
                                    return;
                                }

                                navLinks.forEach(
                                    function (link) {

                                        link.classList.toggle(
                                            "active",
                                            link.getAttribute("href") ===
                                            `#${entry.target.id}`
                                        );

                                    }
                                );

                            }
                        );

                    },
                    {
                        rootMargin: "-45% 0px -50% 0px"
                    }
                );


            sections.forEach(
                function (section) {

                    navObserver.observe(
                        section
                    );

                }
            );

        }


        /* =============================================
           PROGRESS INTRO (fills + count-up when seen)
        ============================================== */

        const gates =
            document.querySelectorAll(
                ".progress-gate"
            );


        function playGate(gate) {

            gate.classList.add(
                "in-view"
            );


            gate
                .querySelectorAll("[data-count-up]")
                .forEach(
                    function (element) {

                        tween(
                            element,
                            0,
                            Number(element.dataset.value || 0),
                            element.dataset.suffix || ""
                        );

                    }
                );

        }


        if ("IntersectionObserver" in window) {

            const gateObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (entry.isIntersecting) {

                                    playGate(
                                        entry.target
                                    );

                                    gateObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.35
                    }
                );


            gates.forEach(
                function (gate) {

                    gateObserver.observe(
                        gate
                    );

                }
            );

        } else {

            gates.forEach(
                function (gate) {

                    gate.classList.add(
                        "in-view"
                    );

                }
            );

        }


        /* =============================================
           CARD SPOTLIGHT + TILT
        ============================================== */

        const cardSelector =
            ".archive-jobsheet-card, " +
            ".architect-option, " +
            ".technology-card";


        if (
            window.matchMedia &&
            window.matchMedia("(hover: hover)").matches
        ) {

            document.addEventListener(
                "pointermove",
                function (event) {

                    const card =
                        event.target.closest &&
                        event.target.closest(
                            cardSelector
                        );


                    if (!card) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;


                    card.style.setProperty(
                        "--mx",
                        `${x}px`
                    );

                    card.style.setProperty(
                        "--my",
                        `${y}px`
                    );


                    if (
                        !prefersReducedMotion &&
                        card.classList.contains(
                            "archive-jobsheet-card"
                        )
                    ) {

                        card.style.setProperty(
                            "--ry",
                            `${((x / rect.width) - 0.5) * 8}deg`
                        );

                        card.style.setProperty(
                            "--rx",
                            `${-((y / rect.height) - 0.5) * 8}deg`
                        );

                    }

                }
            );


            document.addEventListener(
                "pointerout",
                function (event) {

                    const card =
                        event.target.closest &&
                        event.target.closest(
                            ".archive-jobsheet-card"
                        );


                    if (
                        card &&
                        !card.contains(
                            event.relatedTarget
                        )
                    ) {

                        card.style.setProperty(
                            "--rx",
                            "0deg"
                        );

                        card.style.setProperty(
                            "--ry",
                            "0deg"
                        );

                    }

                }
            );

        }


        /* =============================================
           FILTERS + SEARCH
        ============================================== */

        document
            .querySelectorAll(".filter-chip[data-filter]")
            .forEach(
                function (chip) {

                    chip.addEventListener(
                        "click",
                        function () {

                            activeFilter =
                                chip.dataset.filter;


                            document
                                .querySelectorAll(
                                    ".filter-chip[data-filter]"
                                )
                                .forEach(
                                    function (other) {

                                        other.classList.toggle(
                                            "active",
                                            other === chip
                                        );

                                    }
                                );


                            applyArchiveFilters();

                        }
                    );

                }
            );


        const searchInput =
            document.getElementById(
                "jobsheetSearch"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    activeQuery =
                        searchInput.value
                            .replace(/[^0-9]/g, "")
                            .replace(/^0+/, "");


                    applyArchiveFilters();

                }
            );

        }


        /* =============================================
           MARK DONE (edit mode) + SEGMENT JUMP
        ============================================== */

        const grid =
            document.getElementById(
                "jobsheetGrid"
            );


        if (grid) {

            grid.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            ".jobsheet-mark"
                        );


                    if (
                        !button ||
                        !currentArchitect
                    ) {
                        return;
                    }


                    const number =
                        Number(button.dataset.number);


                    const nowDone =
                        toggleJobsheetComplete(
                            currentArchitect,
                            number
                        );


                    setCardState(
                        button.closest(
                            ".archive-jobsheet-card"
                        ),
                        nowDone
                    );


                    applyArchiveFilters();


                    const total =
                        getCompletedJobsheets(
                            currentArchitect
                        ).length;


                    if (
                        nowDone &&
                        total === totalJobsheets
                    ) {

                        toast(
                            "ALL JOBSHEETS COMPLETE / 100%"
                        );

                    } else {

                        toast(
                            nowDone
                                ? `JOBSHEET #${String(number).padStart(2, "0")} MARKED DONE`
                                : `JOBSHEET #${String(number).padStart(2, "0")} REOPENED`
                        );

                    }

                }
            );

        }


        const meter =
            document.getElementById(
                "segmentMeter"
            );


        if (meter) {

            meter.addEventListener(
                "click",
                function (event) {

                    const segment =
                        event.target.closest(
                            ".segment"
                        );


                    if (segment) {

                        focusJobsheet(
                            Number(segment.dataset.number)
                        );

                    }

                }
            );

        }


        /* =============================================
           EDIT TOOLS
        ============================================== */

        const copyButton =
            document.getElementById(
                "copyDoneList"
            );

        const resetButton =
            document.getElementById(
                "resetProgress"
            );


        if (copyButton) {

            copyButton.addEventListener(
                "click",
                function () {

                    if (!currentArchitect) {
                        return;
                    }


                    const text =
                        `completed: [${getCompletedJobsheets(currentArchitect).join(", ")}]`;


                    if (
                        navigator.clipboard &&
                        navigator.clipboard.writeText
                    ) {

                        navigator.clipboard
                            .writeText(text)
                            .then(
                                function () {

                                    toast(
                                        `COPIED / PASTE INTO architectData.${currentArchitect}`
                                    );

                                },
                                function () {

                                    toast(text);

                                }
                            );

                    } else {

                        toast(text);

                    }

                }
            );

        }


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function () {

                    if (!currentArchitect) {
                        return;
                    }


                    const student =
                        currentArchitect;


                    try {

                        localStorage.removeItem(
                            getStorageKey(student)
                        );

                    } catch (error) {

                        /* nothing to clear */

                    }


                    createJobsheetCards(
                        student
                    );

                    updateProgress(
                        student
                    );

                    updateSelectedPanel(true);

                    applyArchiveFilters();


                    toast(
                        "LOCAL MARKS CLEARED"
                    );

                }
            );

        }


        /* =============================================
           KEYBOARD
        ============================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                const typing =
                    event.target &&
                    /^(INPUT|TEXTAREA)$/.test(
                        event.target.tagName
                    );


                if (
                    event.key === "Escape" &&
                    currentArchitect
                ) {

                    if (typing) {

                        event.target.blur();

                        return;

                    }


                    backToArchitects();

                    return;

                }


                if (typing) {
                    return;
                }


                if (
                    event.key === "E" &&
                    event.shiftKey
                ) {

                    toggleEditMode();

                }


                if (
                    event.key === "/" &&
                    currentArchitect &&
                    searchInput
                ) {

                    event.preventDefault();

                    searchInput.focus();

                }

            }
        );


        if (
            new URLSearchParams(
                window.location.search
            ).has("edit")
        ) {

            toggleEditMode(true);

        }


    }
);