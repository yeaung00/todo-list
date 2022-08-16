import './style.css';
const Project = (() => {
    let Title = [];
    let Task = [];
    let Date = [];
    let Note = [];

    const init = () => {
        if (window.localStorage.getItem("Title") !== null) { Title = JSON.parse(localStorage.getItem("Title")); }
        if (window.localStorage.getItem("Task") !== null) { Task = JSON.parse(localStorage.getItem("Task")); }
        if (window.localStorage.getItem("Date") !== null) { Date = JSON.parse(window.localStorage.getItem("Date")); }   
        if (window.localStorage.getItem("Note") !== null) { Note = JSON.parse(window.localStorage.getItem("Note")); }
    }
    function setTitle(title) {
        Title.push(title);
    }
    function setTask(task) {
        const titleIndex = Title.indexOf(Nav.getCurrentTitle());
        Task[titleIndex].push(task);
    }
    function getTitle() {
        return Title;
    }
    function getTask() {
        return Task;
    }
    function setDate(e) {
        const titleIndex = Title.indexOf(Nav.getCurrentTitle());
        const currentTask = e.target.closest("#taskDiv > div").children[0].textContent;
        const index = Task[titleIndex].indexOf(currentTask);

        Date[titleIndex].splice(index, 1, e.target.value);
    }
    function getDate() {
        return Date;
    }
    function setNote(e, note) {
        const titleIndex = Title.indexOf(Nav.getCurrentTitle());
        const currentTask = e.target.closest("#notePreview").children[1].textContent;
        const index = Task[titleIndex].indexOf(currentTask);
        Note[titleIndex].splice(index, 1, note);
    }
    function getNote() {
        return Note;
    }
    function deleteTitle(titleIndex) {
        Title.splice(titleIndex, 1);
        Task.splice(titleIndex, 1);
        Date.splice(titleIndex, 1);
        Note.splice(titleIndex, 1);
    }
    function deleteTask(titleIndex, taskIndex) {
        Task[titleIndex].splice(taskIndex, 1);
        Date[titleIndex].splice(taskIndex, 1);
        Note[titleIndex].splice(taskIndex, 1);
    }
    function editTask(oldTask, newTask) {
        const title = Nav.getCurrentTitle();
        const titleIndex = Title.indexOf(title);
        const taskIndex = Task[titleIndex].indexOf(oldTask);
        Task[titleIndex].splice(taskIndex, 1, newTask);
    }
    function editTitle(oldTitle, newTitle) {
        titleIndex = Title.indexOf(oldTitle);
        Title.splice(titleIndex, 1, newTitle);
    }
    function createTaskArray() {
        Task.push([]);
    }
    function createDateArray() {
        Date.push([]);
    }
    function createNoteArray() {
        Note.push([]);
    }
    function createNoteSubArray() {
        const titleIndex = Title.indexOf(Nav.getCurrentTitle());
        if (Note.length === 0) { Note.push([". . ."]); }
        else { Note[titleIndex].push([". . ."]); }
    }
    return {
        init,
        setTitle,
        setTask,
        setDate,
        getTitle,
        getTask,
        getDate,
        setNote,
        getNote,
        deleteTitle,
        deleteTask,
        editTask,
        editTitle,
        createTaskArray,
        createDateArray,
        createNoteArray,
        createNoteSubArray,
    };
})();

const Icon = (() => {
    function makeEditIcon() {
        const editIcon = document.createElement("i");

        editIcon.classList.add("fa");
        editIcon.classList.add("fa-pen-to-square");

        editIcon.addEventListener("click", IconEvent.editItem);
        return editIcon;
    }
    function makeTrashIcon() {
        const trashIcon = document.createElement("i");

        trashIcon.classList.add("fa");
        trashIcon.classList.add("fa-trash");

        trashIcon.addEventListener('click', IconEvent.deleteItem);

        return trashIcon;
    }
    function iconSpan() {
        const iconSpan = document.createElement("span");

        iconSpan.classList.add("iconSpan");
        iconSpan.classList.add("hidden");

        iconSpan.appendChild(makeTrashIcon());
        iconSpan.appendChild(makeEditIcon());

        return iconSpan;
    }
    function toggleIcon(e) {
        const iconSpan = e.target.children[1];
        iconSpan.classList.toggle("hidden");
    }
    return {
        iconSpan,
        toggleIcon,
    };
})();
const IconEvent = (() => {
    function editItem(e) {
        if (e.target.closest("#projectDiv") !== null) {
            const title = e.target.closest("div").children[0];
            const oldTitle = title.textContent;
            title.setAttribute("contenteditable", "true");
            title.addEventListener("keydown", (e) => { titleEnterKey(e, oldTitle); });
        }else if (e.target.closest("#taskDiv") !== null) {
            const task = e.target.closest("div").children[0];
            const oldTask = task.textContent;
            task.setAttribute("contenteditable", "true");
            task.addEventListener("keydown", (e) => { enterKey(e, oldTask); });
        }
    }
    function enterKey(e, oldTask) {
        if (e.key === "Enter") { 
            e.target.setAttribute("contenteditable", "false");
            Project.editTask(oldTask, e.target.textContent);
            ProjectPreview.saveTaskToLocalStorage();
        }
    }
    function titleEnterKey(e, oldTitle) {
        if (e.key === "Enter") {
            e.target.setAttribute("contenteditable", "false");
            Project.editTitle(oldTitle, e.target.textContent);
            Nav.saveTitleToLocalStorage();
        }
    }
    function deleteItem(e) {
        if (e.target.closest("#projectDiv") !== null) {
            const title = e.target.closest("div").children[0].textContent;
            const titleIndex = Project.getTitle().indexOf(title);
            const addTaskButton = document.getElementById("addTaskButton");
            const projectTitle = document.getElementById("projectTitle");
            const taskDiv = document.getElementById("taskDiv");
            const noteTitle = document.getElementById("noteTitle");
            const textArea = document.getElementById("textArea");

            noteTitle.textContent = "";
            textArea.classList.toggle("hidden");

            projectTitle.textContent = "";
            taskDiv.innerHTML = "";
            addTaskButton.classList.add("hidden");

            Project.deleteTitle(titleIndex);
            Nav.saveTitleToLocalStorage();
            ProjectPreview.saveTaskToLocalStorage();
            ProjectPreview.saveDateToLocalStorage();
            NotesPreview.saveNoteToLocalStorage();
            e.target.closest("div").remove();
        }
        else if (e.target.closest("#taskDiv") !== null) {
            const title = e.target.closest("#projectPreview").children[0].textContent;
            const titleIndex = Project.getTitle().indexOf(title);
            const task = e.target.closest("div").children[0].textContent;
            const taskIndex = Project.getTask()[titleIndex].indexOf(task);
            const noteTitle = document.getElementById("noteTitle");
            const textArea = document.getElementById("textArea");

            noteTitle.textContent = "";
            textArea.classList.toggle("hidden");
            
            Project.deleteTask(titleIndex, taskIndex);
            ProjectPreview.saveTaskToLocalStorage();
            ProjectPreview.saveDateToLocalStorage();
            NotesPreview.saveNoteToLocalStorage();
            e.target.closest("div").remove();
        }
    }
    
    return {
        editItem,
        deleteItem,
    };
})();
const Nav = (() => {
    let currentTitle;
    const projectDiv = document.getElementById("projectDiv");
    const addProjectButton = document.getElementById("addProjectButton");
    const projectDescriptionDiv = document.getElementById("projectDescriptionDiv");
    const cancelButton = document.getElementById("cancelButton");
    const submitButton = document.getElementById("submitButton");
    const projectDescriptionInput = document.getElementById("projectDescriptionInput");

    function bindEvents() {
        addProjectButton.addEventListener("click", toggleHidden);
        cancelButton.addEventListener("click", toggleHidden);
        submitButton.addEventListener("click", toggleHidden);
        submitButton.addEventListener("click", setCurrentTitle);
        submitButton.addEventListener("click", createProject);
        projectDescriptionInput.addEventListener("keydown", enterKey)
        submitButton.addEventListener("click", saveTitleToLocalStorage);
        submitButton.addEventListener("click", ProjectPreview.saveTaskToLocalStorage);
        submitButton.addEventListener("click", ProjectPreview.saveDateToLocalStorage);
        submitButton.addEventListener("click", NotesPreview.saveNoteToLocalStorage);
        submitButton.addEventListener("click", clearInput);
    }

    function toggleHidden() {
        addProjectButton.classList.toggle("hidden");
        projectDescriptionDiv.classList.toggle("hidden");
    }
    function enterKey(e) {
        if (e.key === "Enter") {
            submitButton.click();
        }
    }
    function createProject() {
        Project.setTitle(currentTitle);
        Project.createTaskArray();
        Project.createDateArray();
        Project.createNoteArray();
        render();
    }
    function clearInput() {
        projectDescriptionInput.value = "";
    }
    function setCurrentTitle(e) {
        if (e.target.id === "submitButton") { currentTitle = projectDescriptionInput.value; }
        else { currentTitle = e.target.textContent; }
    }
    function getCurrentTitle() {
        return currentTitle;
    }
    function createButton(title) {
        const titleButtonDiv = document.createElement("div");
        const titleButton = document.createElement("button");

        titleButton.classList.add("white");
        titleButton.classList.add("projectBtn");
        titleButton.textContent = title;
        titleButton.addEventListener("click", setCurrentTitle);
        titleButton.addEventListener("click", ProjectPreview.render);

        titleButtonDiv.appendChild(titleButton);
        titleButtonDiv.appendChild(Icon.iconSpan());
        titleButtonDiv.addEventListener("mouseenter", Icon.toggleIcon);
        titleButtonDiv.addEventListener("mouseleave", Icon.toggleIcon);

        return titleButtonDiv;
    }
    function render() {
        const Title = Project.getTitle();
        projectDiv.innerHTML = "";
        for (let i = 0; i < Title.length; i++) {
            projectDiv.appendChild(createButton(Title[i]));
        }
    }
    function saveTitleToLocalStorage() {
        window.localStorage.setItem("Title", JSON.stringify(Project.getTitle()));
    }
    return {
        getCurrentTitle,
        render,
        bindEvents,
        saveTitleToLocalStorage,
    };
})();

const ProjectPreview = (() => {
    let currentTask;
    const projectTitle = document.getElementById("projectTitle");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskDiv = document.getElementById("taskDiv");
    const taskDescriptionDiv = document.getElementById("taskDescriptionDiv");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");
    const cancelTaskButton = document.getElementById("cancelTaskButton");
    const submitTaskButton = document.getElementById("submitTaskButton");
    
    function bindEvents() {
        addTaskButton.addEventListener("click", toggleHidden);
        taskDescriptionInput.addEventListener("keydown", enterKey);
        cancelTaskButton.addEventListener("click", toggleHidden);
        submitTaskButton.addEventListener("click", toggleHidden);
        submitTaskButton.addEventListener("click", setCurrentTask);
        submitTaskButton.addEventListener("click", createTask);
        submitTaskButton.addEventListener("click", saveTaskToLocalStorage);
        submitTaskButton.addEventListener("click", NotesPreview.saveNoteToLocalStorage);
        submitTaskButton.addEventListener("click", clearInput);
    }

    function toggleHidden() {
        taskDescriptionDiv.classList.toggle("hidden");
        addTaskButton.classList.toggle("hidden");
    }
    function setCurrentTask(e) {
        if (e.target.id === "submitTaskButton") { currentTask = taskDescriptionInput.value; }
        else { currentTask = e.target.textContent; }

    }
    function getCurrentTask() {
        return currentTask;
    }
    function enterKey(e) {
        if (e.key === "Enter") { submitTaskButton.click(); }
    }
    function createTask() {
        Project.setTask(currentTask);
        Project.createNoteSubArray();
        render();
    }
    function clearInput() {
        taskDescriptionInput.value = "";
    }
    function createButton(task) {
        const taskButton = document.createElement("button");

        taskButton.classList.add("white");
        taskButton.classList.add("projectBtn");
        taskButton.textContent = task;
        taskButton.addEventListener("click", setCurrentTask);
        taskButton.addEventListener("click", NotesPreview.render);

        return taskButton;
    }
    function createDate(date) {
        const dateDiv = document.createElement("div");
        const dateInput = document.createElement("input");

        dateInput.setAttribute("type", "date");
        dateInput.classList.add("dueDate")
        dateInput.addEventListener("input", Project.setDate);
        dateInput.addEventListener("input", saveDateToLocalStorage);
        
        if (date !== undefined) { dateInput.value = date; }
        dateDiv.appendChild(dateInput);
        return dateDiv;
    }
    function render() {
        const Task = Project.getTask();
        const Date = Project.getDate();
        taskDiv.innerHTML = "";
        projectTitle.textContent = Nav.getCurrentTitle();
        addTaskButton.classList.remove("hidden");

        const titleIndex = Project.getTitle().indexOf(Nav.getCurrentTitle());
        if (Task[titleIndex] === undefined) { return; }
        for (let i = 0; i < Task[titleIndex].length; i++) {
            const taskButtonDiv = document.createElement("div");
            const iconSpan = Icon.iconSpan();

            taskButtonDiv.appendChild(createButton(Task[titleIndex][i]));
            taskButtonDiv.appendChild(iconSpan);
            taskButtonDiv.appendChild(createDate(Date[titleIndex][i]));
            taskButtonDiv.addEventListener("mouseenter", Icon.toggleIcon);
            taskButtonDiv.addEventListener("mouseleave", Icon.toggleIcon);
            taskDiv.appendChild(taskButtonDiv);
        }
    }
    function saveTaskToLocalStorage() {
        window.localStorage.setItem("Task", JSON.stringify(Project.getTask()));
    }
    function saveDateToLocalStorage() {
        window.localStorage.setItem("Date", JSON.stringify(Project.getDate()));
    }
    return {
        bindEvents,
        render,
        getCurrentTask,
        saveTaskToLocalStorage,
        saveDateToLocalStorage,
    };
})();

const NotesPreview = (() => {
    const noteTitle = document.getElementById("noteTitle");
    const textArea = document.getElementById("textArea");
    const noteButtonDiv = document.getElementById("noteButtonDiv");
    const cancelNoteButton = document.getElementById("cancelNoteButton");
    const saveNoteButton = document.getElementById("saveNoteButton");

    textArea.addEventListener("click", removeHiddenNoteButtonDiv);
    cancelNoteButton.addEventListener("click", toggleHiddenNoteButtonDiv);
    saveNoteButton.addEventListener("click", toggleHiddenNoteButtonDiv);
    saveNoteButton.addEventListener("click", submitNote);
    saveNoteButton.addEventListener("click", saveNoteToLocalStorage);

    function removeHiddenTextArea() {
        textArea.classList.remove("hidden");
    }
    function removeHiddenNoteButtonDiv() {
        noteButtonDiv.classList.remove("hidden");
    }
    function toggleHiddenNoteButtonDiv() {
        noteButtonDiv.classList.toggle("hidden");
    }
    function submitNote(e) {
        Project.setNote(e, textArea.value);
        render();
    }
    function render() {
        const titleIndex = Project.getTitle().indexOf(Nav.getCurrentTitle());
        const taskIndex = Project.getTask()[titleIndex].indexOf(ProjectPreview.getCurrentTask());
        const Note = Project.getNote();
        noteTitle.textContent = ProjectPreview.getCurrentTask();
        removeHiddenTextArea();
        if (Note[titleIndex] === undefined) { return; }
        textArea.value = Note[titleIndex][taskIndex];
    }
    function saveNoteToLocalStorage() {
        window.localStorage.setItem("Note", JSON.stringify(Project.getNote()));
    }
    return {
        render,
        saveNoteToLocalStorage,
    };
})();
const LocalStorage = (() => {
    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }
    window.onload = () => {
        if (storageAvailable('localStorage')) {
            Project.init();
            Nav.bindEvents();
            ProjectPreview.bindEvents();
            Nav.render();
        }
        else {
            alert("This computer does not support local storage. Your data will not be saved.")
        }
    }
})();

function del() {
    window.localStorage.removeItem("Title");
    window.localStorage.removeItem("Task");
    window.localStorage.removeItem("Date");
    window.localStorage.removeItem("Note");
}