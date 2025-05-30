const imagesList = document.getElementById('imagesList')
const beginBtn = document.getElementById('beginBtn')
let imagesListElements
const renderImages = count => {
	return Array.from({ length: count }, (_, i) => {
		return `
			<li>
				<img
					data-src="https://picsum.photos/400/300?random=${Math.random()}"
					src=""
					alt="image-${i + 1}"
					id="imagesListElement"
					class="w-[400px] h-[300px] bg-white/15 rounded-xl transition-transform duration-300"
				/>
			</li>
		`
	}).join('')
}

imagesList.innerHTML = renderImages(20)
imagesListElements = document.querySelectorAll('#imagesListElement')

const observer = new IntersectionObserver(entries => {
	entries.forEach(
		entry => {
			if (entry.isIntersecting) {
				const image = entry.target
				image.src = image.dataset.src
				image.style.transform = 'translateY(0)'
				observer.unobserve(image)
			} else {
				const image = entry.target
				image.style.transform = 'translateY(100px)'
			}
		},
		{
			threshold: 0.3
		}
	)
})

const startObserver = () => {
	imagesListElements.forEach(image => {
		observer.observe(image)
	})
}

beginBtn.addEventListener('click', startObserver)
