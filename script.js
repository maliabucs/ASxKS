/* =====================================================
   WEBSITE PROGRESS SETTINGS
===================================================== */


/*
    TOTAL NUMBER OF JOBSHEETS

    Both students have a maximum of 24.
*/

const totalJobsheets = 24;


/*
    CURRENT PROGRESS

    CHANGE THESE NUMBERS LATER.

    Example:

    Amalia completed 8:
    const amaliaCompleted = 8;

    Khairul completed 6:
    const khairulCompleted = 6;

*/

const amaliaCompleted = 0;

const khairulCompleted = 0;



/* =====================================================
   CALCULATE PERCENTAGE
===================================================== */

const amaliaPercentage =
    (amaliaCompleted / totalJobsheets) * 100;

const khairulPercentage =
    (khairulCompleted / totalJobsheets) * 100;



/* =====================================================
   GET HTML ELEMENTS
===================================================== */

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



/* =====================================================
   NUMBER ANIMATION
===================================================== */

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



/* =====================================================
   START NUMBER ANIMATION
===================================================== */

animateNumber(
    amaliaCount,
    amaliaCompleted
);

animateNumber(
    khairulCount,
    khairulCompleted
);



/* =====================================================
   UPDATE PERCENTAGE TEXT
===================================================== */

amaliaPercentageText.textContent =
    Math.round(amaliaPercentage) +
    "% COMPLETE";


khairulPercentageText.textContent =
    Math.round(khairulPercentage) +
    "% COMPLETE";



/* =====================================================
   UPDATE PROGRESS BARS
===================================================== */

setTimeout(() => {

    amaliaProgress.style.width =
        amaliaPercentage + "%";


    khairulProgress.style.width =
        khairulPercentage + "%";

}, 400);



/* =====================================================
   JOBSHEET LINK
===================================================== */

function openJobsheet(event, number) {

    event.preventDefault();


    /*
        The HTML jobsheets will later be placed
        inside the "jobsheets" folder.

        Example:

        jobsheets/jobsheet01.html
        jobsheets/jobsheet02.html
        jobsheets/jobsheet03.html

    */


    const formattedNumber =
        String(number).padStart(2, "0");


    const path =
        `jobsheets/jobsheet${formattedNumber}.html`;


    window.location.href = path;

}