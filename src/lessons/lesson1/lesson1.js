import { FIRST_LESSON_IMAGES } from '../../constants/lesson1-images.js'

const imageGalary = document.querySelector('#imageGalary')
const slideWidth = 1240 + 30
const lightbox = document.querySelector('#lightbox')
const lightboxContent = document.querySelector('.lightbox__content')
const btnClose = document.querySelector('.lightbox__button')
const IS_OPEN = 'is-open'
const arrowLeft = document.querySelector('.arrow-left')
const arrowRight = document.querySelector('.arrow-right')
let lightboxImages
let currentPosition = 0

imageGalary.innerHTML = FIRST_LESSON_IMAGES.map(element => {
	return `
	<li class="gallery__item">
		<div class="gallery__link">
			<img
				class="gallery__image"
				src="${element.preview}"
				data-source="${element.original}"
				alt="${element.description}"
			/>
		</div>
	</li>
	`
}).join('')

const moveSlide = () => {
	if (currentPosition < 0) {
		currentPosition = lightboxImages.length - 1
	} else if (currentPosition > lightboxImages.length - 1) {
		currentPosition = 0
	}
	lightboxImages.forEach(image => {
		image.style.transform = `translateX(-${currentPosition * slideWidth}px)`
	})
}

imageGalary.addEventListener('click', e => {
	if (e.target.nodeName !== 'IMG') return

	lightbox.classList.add(IS_OPEN)
	lightboxContent.innerHTML = FIRST_LESSON_IMAGES.map(image => {
		return `<img class="lightbox__image" src="${image.original}" alt="${image.description}" />`
	}).join('')

	lightboxImages = document.querySelectorAll('.lightbox__image')

	lightbox.addEventListener('click', e => {
		if (e.target.nodeName === 'IMG') return
		lightbox.classList.remove(IS_OPEN)
	})

	currentPosition = FIRST_LESSON_IMAGES.findIndex(image => {
		return image.description === e.target.alt
	})

	moveSlide()
})

btnClose.addEventListener('click', e => {
	e.stopPropagation()
	lightbox.classList.remove(IS_OPEN)
})

arrowLeft.addEventListener('click', e => {
	e.stopPropagation()
	currentPosition--
	moveSlide()
})
arrowRight.addEventListener('click', e => {
	e.stopPropagation()
	currentPosition++
	moveSlide()
})

document.addEventListener('keydown', e => {
	if (e.key === 'ArrowRight') {
		currentPosition++
		moveSlide()
	} else if (e.key === 'ArrowLeft') {
		currentPosition--
		moveSlide()
	}
	if (e.key === 'Escape') {
		lightbox.classList.remove(IS_OPEN)
	}
})
