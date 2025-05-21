const sliderInput = document.querySelector('.slider__input')
const sliderImage = document.querySelector('.slider__image')

sliderImage.src = `https://picsum.photos/400/300?random=${Math.random()}`

const inputHandler = e => {
	sliderImage.style.width = `${e.target.value * 4}px`
}

sliderImage.style.width = `${sliderInput.value * 4}px`

const debouncedInputHandler = _.debounce(inputHandler, 300)

sliderInput.addEventListener('input', debouncedInputHandler)

const secondLessonContainer = document.querySelector('.secondLessonContainer')
const followerDiv = document.querySelector('.followerDiv')

const moveFolower = e => {
	const outerRect = secondLessonContainer.getBoundingClientRect()
	const mouseX = e.clientX - outerRect.left
	const mouseY = e.clientY - outerRect.top

	const followerWidth = followerDiv.offsetWidth
	const followerHeight = followerDiv.offsetHeight

	const x = Math.min(
		Math.max(0, mouseX - followerWidth / 2),
		secondLessonContainer.clientWidth - followerWidth
	)

	const y = Math.min(
		Math.max(0, mouseY - followerHeight / 2),
		secondLessonContainer.clientHeight - followerHeight
	)

	followerDiv.style.top = `${y}px`
	followerDiv.style.left = `${x}px`
}

const debouncedMoveFolower = _.debounce(moveFolower, 10)

secondLessonContainer.addEventListener('mousemove', debouncedMoveFolower)
