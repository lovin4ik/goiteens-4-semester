//! imports and exports
const imagesList = document.getElementById('imagesList')
const beginBtn = document.getElementById('beginBtn')
let imagesListElements

//* функція яка робить масив зі зображеннями і повертає його
const renderImages = count => {
	return Array.from({ length: count }, (_, i) => {
		return `
			<li>
				<img
					data-src="https://picsum.photos/400/300?random=${Math.random()}"
					src=""
					alt="image-${i + 1}"
					id="imagesListElement"
					class="w-[400px] h-[300px] bg-white/15 rounded-xl transition-[transform, opacity] duration-300"
				/>
			</li>
		`
	}).join('')
}

//* рендеримо зображення і получаємо елементи
imagesList.innerHTML = renderImages(20)
imagesListElements = document.querySelectorAll('#imagesListElement')

const observer = new IntersectionObserver(entries => {
	entries.forEach(
		entry => {
			if (entry.isIntersecting) {
				//? якщо зображення відображається
				//? image - це є зображення яке відображається
				const image = entry.target
				//? міняємо src
				image.src = image.dataset.src
				//? додаємо анімацію
				image.style.transform = 'translateY(0)'
				image.style.opacity = '1'
				//? очищаємо observer від зображення яке відображається
				observer.unobserve(image)
			} else {
				//? якщо зображення не відображається
				//? image - це є зображення яке відображається
				const image = entry.target
				//? додаємо анімацію
				image.style.transform = 'translateY(100px)'
				image.style.opacity = '0.2'
			}
		},
		{
			threshold: 0.3
		}
	)
})

//? функція яка запускає observer
const startObserver = () => {
	imagesListElements.forEach(image => {
		observer.observe(image)
	})
}

//? запуск функції при кліку на кнопку
beginBtn.addEventListener('click', startObserver)
