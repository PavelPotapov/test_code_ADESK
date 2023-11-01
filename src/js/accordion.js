class AccordionHelper {
	constructor(node) {
		this.accordion = node
		this.isTriggered = false

		this.selectors = {
			btn: ".accordion-btn",
			content: ".accordion-content",
		}

		this.classes = {
			btnHide: "accordion-btn--hide",
			btnActive: "accordion-btn--active",
			contentActive: "accordion-content--active",
		}
		this.init()
		this.matchMedia()
		this.handleСlick()
	}

	//получает data-js-accordion для определения параметров отображения
	//по сути можно развивать функциональность, в этом атрибуте будут храниться стартовые параметры аккордеона
	//сейчас там находится информация о ширине, с которой аккордеон начинает свою работу
	init() {
		try {
			this.parameters = JSON.parse(this.accordion.dataset.jsAccordion)
		} catch {
			this.parameters = { width: 600 }
		}

		if (this.parameters.hasOwnProperty("width")) {
			this.width = this.parameters.width
		}

		this.btn = this.accordion.querySelector(this.selectors.btn) //кнопка аккордеона
		this.content = this.accordion.querySelector(this.selectors.content) //контент
	}

	//при изменении viewport надо удалить inline стили максимальной высоты, записанные туда ранее, чтобы не ломалась верстка
	clearMaxHeight() {
		if (this.content) {
			if (this.content.style?.removeProperty) {
				this.content.style.removeProperty("max-height")
			} else {
				this.content.style.removeAttribute("max-height")
			}
		}
	}

	hide() {
		this.btn.classList.remove(this.classes.btnHide)
		this.content.classList.remove(this.classes.contentActive)
	}

	show() {
		this.btn.classList.add(this.classes.btnHide)
		this.btn.classList.remove(this.classes.btnActive)
		this.content.classList.add(this.classes.contentActive)
	}

	//срабатывающий триггер. когда сузим до нужной ширины или наоборот расширим больше, чем нужно, срабатывает эта функция
	trigger(isTriggerSize) {
		if (this.btn && this.content) {
			if (isTriggerSize) {
				this.hide()
				this.isTriggered = true
			} else {
				this.clearMaxHeight()
				this.show()
				this.isTriggered = false
			}
		}
	}

	//функция запроса mathcmedia параметров и подписка на прослушивание этого события
	matchMedia() {
		if (this.width) {
			this.widthMediaQuery = window.matchMedia(`(max-width: ${this.width}px)`)
			this.trigger(this.widthMediaQuery.matches)
			this.widthMediaQuery.addEventListener("change", (event) => {
				this.trigger(event.matches)
			})
		}
	}

	handleСlick() {
		this.accordion.addEventListener("click", (e) => {
			if (this.isTriggered && this.content && this.btn) {
				e.preventDefault()
				this.btn.classList.toggle(this.classes.btnActive)
				this.content.classList.toggle(this.classes.contentActive)
				if (this.content.classList.contains(this.classes.contentActive)) {
					this.content.style.maxHeight = this.content.scrollHeight + "px"
				} else {
					this.content.style.maxHeight = 0
				}
			}
		})
	}
}

export function initAccordions() {
	const accordions = document.querySelectorAll(".accordion")
	accordions.forEach((accordion) => {
		new AccordionHelper(accordion)
	})
}
