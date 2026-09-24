const totalJobsheets = 24;


/* =========================
   PROGRESS DATA
   ========================= */

const amaliaCompleted = 0;
const khairulCompleted = 0;


/* =========================
   CALCULATE PERCENTAGE
========================= */

const amaliaPercentage =
    (amaliaCompleted / totalJobsheets) * 100;

const khairulPercentage =
    (khairulCompleted / totalJobsheets) * 100;


/* =========================
   GET HTML ELEMENTS
========================= */

const amaliaCount =
    document.getElementById("amaliaCount");

const khairulCount =
    document.getElementById("khairulCount");

const amaliaPercentageText =
    document.getElementById("amaliaPercentage");

const khairulPercentageText =
    document.getElementById("khairulPercentage");

const amaliaProgress =
    document.getElementById("amaliaProgress");

const khairulProgress =
    document.getElementById("khairulProgress");


/* =========================
   NUMBER ANIMATION
========================= */

function animateNumber(element, target) {

    let current = 0;

    const animation =
        setInterval(() => {

            if (current >= target) {

                clearInterval(animation);

                return;
            }

            current++;

            element.textContent = current;

        }, 80);
}


/* =========================
   START NUMBER ANIMATION
========================= */

animateNumber(
    amaliaCount,
    amaliaCompleted
);

animateNumber(
    khairulCount,
    khairulCompleted
);


/* =========================
   UPDATE PERCENTAGE
========================= */

amaliaPercentageText.textContent =
    Math.round(amaliaPercentage) + "% COMPLETE";

khairulPercentageText.textContent =
    Math.round(khairulPercentage) + "% COMPLETE";


/* =========================
   PROGRESS BAR ANIMATION
========================= */

setTimeout(() => {

    amaliaProgress.style.width =
        amaliaPercentage + "%";

    khairulProgress.style.width =
        khairulPercentage + "%";

}, 400);



/* =========================
   JOBSHEET NAVIGATION
========================= */

function openJobsheet(event, number) {

    event.preventDefault();


    const formattedNumber =
        String(number).padStart(2, "0");


    const path =
        `jobsheets/jobsheet${formattedNumber}.html`;


    window.location.href = path;
}