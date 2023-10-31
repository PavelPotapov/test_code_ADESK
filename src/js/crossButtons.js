export default function () {
	const demoBtn = document.querySelector(`[data-id="demo-btn"]`)
	const loginBtn = document.querySelector(`[data-id="login"]`)
	const regBtn = document.querySelector(`[data-id="reg"]`)
	const laptopMenu = document.querySelector(`[data-id="laptop-menu"]`)
	const headerMenu = document.querySelector(`[data-id="login-section"]`)
	const colorDemoBtn = "#051534"

	const tabletWidthMediaQuery = window.matchMedia("(max-width: 900px)")
	const mobileWidthMediaQuery = window.matchMedia("(max-width: 600px)")

	replaceDemoButton(tabletWidthMediaQuery.matches)
	replaceLogAndRegButton(mobileWidthMediaQuery.matches)

	tabletWidthMediaQuery.addEventListener("change", function (event) {
		replaceDemoButton(event.matches)
	})

	mobileWidthMediaQuery.addEventListener("change", function (event) {
		replaceLogAndRegButton(event.matches)
	})

	/* переносим кнопку регистрации в боковое laptopMenu*/
	function replaceLogAndRegButton(isMobileSize) {
		if (isMobileSize) {
			loginBtn.remove()
			regBtn.remove()
			laptopMenu.appendChild(loginBtn)
			laptopMenu.appendChild(regBtn)
		} else {
			loginBtn.remove()
			regBtn.remove()
			headerMenu.appendChild(loginBtn)
			headerMenu.appendChild(regBtn)
		}
	}

	/* переносим кнопку записи на демо в боковое laptopMenu*/
	function replaceDemoButton(isMobileSize) {
		if (isMobileSize) {
			demoBtn.remove()
			demoBtn.style.color = "white"
			laptopMenu.appendChild(demoBtn)
		} else {
			demoBtn.remove()
			demoBtn.style.color = colorDemoBtn
			headerMenu.prepend(demoBtn)
		}
	}
}
