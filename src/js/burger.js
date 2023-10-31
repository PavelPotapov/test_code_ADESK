export default function () {
	const burger = document.querySelector(".burger")
	const laptopMenu = document.querySelector(".laptop-menu")
	const laptopMenuOverlay = document.querySelector(".laptop-menu__overlay")
	const html = document.querySelector("html")
	if (burger) {
		burger.addEventListener("click", (e) => {
			burger.classList.toggle("active")
			html.classList.toggle("disabled-scroll")
			if (laptopMenu) {
				laptopMenu.classList.toggle("active")
			}
			if (laptopMenuOverlay) {
				laptopMenuOverlay.classList.toggle("active")
			}
		})
	}
}
