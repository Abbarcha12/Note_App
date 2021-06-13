const addBtn = document.getElementById('add')
const fav = document.getElementById('fav')
const show = document.querySelector('.show')
const chang_color = document.querySelector('.color')


const notes = JSON.parse(localStorage.getItem('notes'))




addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')
    note.setAttribute('draggable', true)
    note.addEventListener('drag', function (e) {
        note.style.position = "absolute"

    })
    note.addEventListener('click', () => {
        note.style.backgroundColor = color

    })
    note.addEventListener('dragend', function (e) {
        var x = e.pageX
        var y = e.pageY
        note.style.left = (x - 30) + "px"
        note.style.top = (y - 30) + "px"


    })
    show.addEventListener('click', () => {
        note.classList.remove('hide')
    })


    note.innerHTML = `
    <div class="tools">
    <button class="star "><i class="fas fa-star"></i></button>
        <button class="edit" id="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
    const star = note.querySelector('.star')
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')


    chang_color.addEventListener('click', () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        let col = "#" + randomColor;
        note.style.backgroundColor = col;


    })


    let color = '#';
    color += Math.random().toString(16).slice(2, 8)
    note.style.backgroundColor = color
    star.addEventListener('click', () => {
        star.style.color = 'yellow'
    })

    // edit.addEventListener('click', () => {
    //     console.log(edit)
    // })

    function display() {
        setTimeout(() => {
            note.classList.add('hide')
        }, 1000000);
    }
    display()

    fav.addEventListener('click', () => {
        if (note.classList.contains = 'hide') {
            note.classList.remove('hide')
        } else {
            note.classList.add('hide')
        }


    })
    fav.addEventListener('click', () => {
        if (star.style.color != 'yellow') {
            note.classList.add('hide')

        }
    })



    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()

        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        main.innerHTML = marked(value)

        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}
