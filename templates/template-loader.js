document.getElementById("footer").innerHTML = fetch("templates/footer-template.html").then(res => res.text()).then(data => {
    document.getElementById("footer").innerHTML = data;
  });
console.log("GLoriaa")