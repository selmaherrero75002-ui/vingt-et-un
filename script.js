const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
const button = document.querySelector(".read-more-btn");

if(button){

button.addEventListener("click",function(){

const more = document.querySelector(".more-text");

if(more.style.display==="inline"){

more.style.display="none";

button.textContent="Afficher plus";

}else{

more.style.display="inline";

button.textContent="Afficher moins";

}

});

}