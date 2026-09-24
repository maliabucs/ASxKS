const totalJobsheets = 24;

/* =========================
   PROGRESS DATA
   ========================= */
const amaliaCompleted = 0;
const khairulCompleted = 0;

/* =========================
   CALCULATE PERCENTAGE
   ========================= */
const amaliaPercentage = (amaliaCompleted / totalJobsheets) * 100;
const khairulPercentage = (khairulCompleted / totalJobsheets) * 100;

/* =========================
   GET HTML ELEMENTS
   ========================= */
const amaliaCount = document.getElementById("amaliaCount");
const khairulCount = document.getElementById("khairulCount");
const amaliaPercentageText = document.getElementById("amaliaPercentage");
const khairulPercentageText = document.getElementById("khairulPercentage");
const amaliaProgress = document.getElementById("amaliaProgress");
const khairulProgress = document.getElementById("khairulProgress");

/* =========================
   NUMBER ANIMATION
   ========================= */
function animateNumber(element, target) {
    if (!element) return; // Menyediakan perlindungan jika elemen tiada dalam HTML

    if (target === 0) {
        element.textContent = 0;
        return;
    }

    let current = 0;
    const animation = setInterval(() => {
        if (current >= target) {
            clearInterval(animation);
            return;
        }
        current++;
        element.textContent = current;
    }, 80);
}

/* =========================
   START NUMBER ANIMATION & UPDATE TEXT
   ========================= */
animateNumber(amaliaCount, amaliaCompleted);
animateNumber(khairulCount, khairulCompleted);

if (amaliaPercentageText) {
    amaliaPercentageText.textContent = Math.round(amaliaPercentage) + "% COMPLETE";
}

if (khairulPercentageText) {
    khairulPercentageText.textContent = Math.round(khairulPercentage) + "% COMPLETE";
}

/* =========================
   PROGRESS BAR ANIMATION
   ========================= */
setTimeout(() => {
    if (amaliaProgress) amaliaProgress.style.width = amaliaPercentage + "%";
    if (khairulProgress) khairulProgress.style.width = khairulPercentage + "%";
}, 400);

/* =========================
   JOBSHEET NAVIGATION
   ========================= */
function openJobsheet(event, number) {
    event.preventDefault();

    // Dibetulkan: Gunakan nombor terus tanpa '0' di depan 
    // supaya padan dengan nama fail 'jobsheet1.html' hingga 'jobsheet24.html'
    const path = `jobsheets/jobsheet${number}.html`;

    window.location.href = path;
}