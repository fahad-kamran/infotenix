// global js file

console.log("%cInfotenix", "color: blue; font-size: 20px");

// easing function
Math.easeOutQuad = function (t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
};

// counter function
function animateCounter(el, start, end, duration, formatFn) {
    let startTime = null;

    function update(ts) {
        if (!startTime) startTime = ts;
        let progress = ts - startTime;
        let value = Math.easeOutQuad(progress, start, end - start, duration);

        el.innerText = formatFn(value);

        if (progress < duration) {
            requestAnimationFrame(update);
        } else {
            el.innerText = formatFn(end); // final value
        }
    }
    requestAnimationFrame(update);
}

// scroll-triggered animation using Intersection Observer
function startCountersOnView() {
    const section = document.getElementById("stats-section");
    if (!section) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate counters
                animateCounter(
                    document.getElementById("counter-certified"),
                    0,
                    100,
                    3000,
                    (val) => Math.floor(val).toLocaleString()
                );
                animateCounter(
                    document.getElementById("counter-users"),
                    0,
                    15000,
                    3000,
                    (val) => Math.floor(val).toLocaleString()
                );
                animateCounter(
                    document.getElementById("counter-percent"),
                    0,
                    99.5,
                    3000,
                    (val) => val.toFixed(1)
                );

                obs.unobserve(section); // only animate once
            }
        });
    }, { threshold: 0.3 }); // 30% of section visible

    observer.observe(section);
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", startCountersOnView);

AOS.init();

function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

// load header & footer
loadComponent("header", "./components/header.html");
loadComponent("footer", "./components/footer.html");