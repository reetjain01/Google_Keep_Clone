const addButton = document.querySelector('#add');

const updateLocalStorageData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"} "></div>
        <textarea class="${text ? "hidden" : ""}"></textarea> `;

        note.insertAdjacentHTML('afterbegin', htmlData);



        // getting the refernces

        const editButton = note.querySelector('.edit');
        const deleteButton = note.querySelector('.delete');
        const mainDiv = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        // deleting then note

        deleteButton.addEventListener('click', () =>{
            note.remove();
            updateLocalStorageData();
        });

        // toggle using edit button

        textArea.value = text;
        mainDiv.innerHTML = text;

        editButton.addEventListener('click', () => {
            mainDiv.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
        });

        textArea.addEventListener('change', () => {
            const value = event.target.value;
            mainDiv.innerHTML = value;

            updateLocalStorageData();
        });


        document.body.appendChild(note);
 
}

// getting Data back from the local storage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes)
{
    notes.forEach((note) => {
            addNewNote(note);
        })
}


addButton.addEventListener('click', () => {
    addNewNote();
});