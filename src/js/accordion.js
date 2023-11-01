export default function () {
	const accordions = Array.from(document.querySelectorAll(".accordion__btn"))
	accordions.forEach((acc) => {
		acc.addEventListener("click", (e) => {
			e.preventDefault()
			e.currentTarget.classList.toggle("accordion__btn--active")
			const currentAccordion = e.target.closest(".accordion")
			const currentContent = currentAccordion.querySelector(
				".accordion__content"
			)
			currentContent.classList.toggle("accordion__content--active")
			if (currentContent.classList.contains("accordion__content--active")) {
				currentContent.style.maxHeight = currentContent.scrollHeight + "px" // открываем контент
			} else {
				currentContent.style.maxHeight = 0
			}
		})
	})

	/* пишутся инлайновые стили для контента аккордиона, их надо удалять, чтобы не ломалась верстка  */
	/* также можно реализовать это через css переменную */
	function clearMaxHeight() {
		const accordionsContents = Array.from(
			document.querySelectorAll(".accordion__content")
		)
		accordionsContents.forEach((acc) => {
			if (acc.style.removeProperty) {
				acc.style.removeProperty("max-height")
			} else {
				acc.style.removeAttribute("max-height")
			}
		})
	}

	/* при уходе с мобильного разрешения удаляем инлайновые стили высоты */
	const mobileWidthMediaQuery = window.matchMedia("(max-width: 600px)")

	function trigger(isMobileSize) {
		if (!isMobileSize) {
			clearMaxHeight()
		}
	}

	trigger(mobileWidthMediaQuery.matches)

	mobileWidthMediaQuery.addEventListener("change", function (event) {
		trigger(event.matches)
	})
}
