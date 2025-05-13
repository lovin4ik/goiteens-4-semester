import { LESSONS } from '../constants/lessons.js'

const lessonsList = document.getElementById('lessonsList')

const renderLesson = lesson => {
	return `
		<li>
			<a
				href="${lesson.link}"
				class="text-lg transition-colors duration-300 hover:text-primary"
				>${lesson.id}. ${lesson.title}</a
			>
		</li>
	`
}

lessonsList.innerHTML = LESSONS.map(lesson => {
	return renderLesson(lesson)
}).join('')

console.log(lessonsList)
