const button = document.querySelector("button");

const onButtonClick = () => {
  alert("Button was clicked!");
};

button.addEventListener("click", onButtonClick);

setTimeout(() => {
  button.removeEventListener("click", onButtonClick);
}, 2000);

const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul");

list.addEventListener("click", (e) => {
  e.target.closest("li").classList.toggle("highlight");
});
