// global js file

console.log("%cInfotenix", "color: blue; font-size: 20px");

new PureCounter();
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