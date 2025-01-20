document.addEventListener("DOMContentLoaded", function() {
    
    // Контейнер для хранения названий курсов
    let name = [];
    const coursesContainer = document.getElementById('courses-list');
    const searchInput = document.getElementById('search');
    const searchForm = document.querySelector('form');

    // Функция обновления списка курсов
    function updateCourseList(filteredCourses) {
        coursesContainer.innerHTML = ""; // Очистить список
        if (filteredCourses.length === 0) {
            coursesContainer.innerHTML = "<p class='text-muted'>Курсы не найдены</p>";
        } else {
            filteredCourses.forEach(course => {
                const courseItem = document.createElement('a');
                courseItem.href = '#';
                courseItem.classList.add('list-group-item', 'list-group-item-action');
                courseItem.textContent = course;
                coursesContainer.appendChild(courseItem);
            });
        }
    }

    // Загрузка данных с API
    fetch('http://cat-facts-api.std-900.ist.mospolytech.ru/api/courses?api_key=ef4b4899-31c7-43a5-9d32-4693acfb9191')
    .then(response => response.json())
    .then(data => {
        console.log('Полученные данные:', data); // Просмотр данных

        if (data && data.courses && data.teachers) {
            // Обработка курсов
            name1 = data.courses.map(course => course.name);
            updateCourseList(name1);

            // Обработка преподавателей
            const teacherContainer = document.getElementById('teachers-list');
            data.teachers.forEach(teacher => {
                const teacherItem = document.createElement('li');
                teacherItem.classList.add('list-group-item');
                teacherItem.textContent = `${teacher.teacher} - ${teacher.level} (${teacher.total_length} лет опыта)`;
                teacherContainer.appendChild(teacherItem);
            });
        } else {
            throw new Error('Неверный формат данных от API');
        }
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные. Проверьте формат или соединение.');
    });


    // Обработка поиска
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвратить перезагрузку страницы
        const query = searchInput.value.toLowerCase().trim();
        const filteredCourses = name.filter(course => course.toLowerCase().includes(query));
        updateCourseList(filteredCourses);
    });
});
