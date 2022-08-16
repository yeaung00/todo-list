import './style.css';
const Project = (() => {
    let Title = [];
    let Task = [];
    function setTitle(title) {
        Title.push(title);
    }
    function getTitle() {
        return Title;
    }
    function setTask(task) {
        const titleIndex = Title.indexOf(Nav.getCurrentTitle());
        Task[titleIndex].push(task);
    }
    function getTask() {
        return Task;
    }
    function createTaskArray() {
        Task.push([]);
    }
    return {
        setTitle,
        getTitle,
        setTask,
        getTask,
        createTaskArray,
    };
})();
const Icon = (() => {
    function makeEditIcon() {
        const editIcon = document.createElement("i");

        editIcon.classList.add("fa");
        editIcon.classList.add("fa-pen-to-square");

       // editIcon.addEventListener("click", IconEvent.editItem);
        return editIcon;
    }
    function makeTrashIcon() {
        const trashIcon = document.createElement("i");

        trashIcon.classList.add("fa");
        trashIcon.classList.add("fa-trash");

        //trashIcon.addEventListener('click', IconEvent.deleteItem);

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
const Nav = (() => {
    let currentTitle;
    //cache DOM
    const projectDiv = document.getElementById("projectDiv");
    const addProjectButton = document.getElementById("addProjectButton");
    const projectDescriptionDiv = document.getElementById("projectDescriptionDiv");
    const cancelButton = document.getElementById("cancelButton");
    const submitButton = document.getElementById("submitButton");
    const projectDescriptionInput = document.getElementById("projectDescriptionInput");
    //bind events
    addProjectButton.addEventListener("click", toggleHidden);
    cancelButton.addEventListener("click", toggleHidden);
    submitButton.addEventListener("click", toggleHidden);
    submitButton.addEventListener("click", setCurrentTitle);
    submitButton.addEventListener("click", createProject);
    submitButton.addEventListener("click", clearInput);

    function toggleHidden() {
        addProjectButton.classList.toggle("hidden");
        projectDescriptionDiv.classList.toggle("hidden");
        console.log("Hello");
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
    function createProject() {
        Project.setTitle(currentTitle);
        Project.createTaskArray();
        render();
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
    return {
        getCurrentTitle,
    };
})();
const ProjectPreview = (() => {
    let currentTask;
    //cache DOM
    const projectTitle = document.getElementById("projectTitle");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskDiv = document.getElementById("taskDiv");
    const taskDescriptionDiv = document.getElementById("taskDescriptionDiv");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");
    const cancelTaskButton = document.getElementById("cancelTaskButton");
    const submitTaskButton = document.getElementById("submitTaskButton");

    addTaskButton.addEventListener("click", toggleHidden);
    cancelTaskButton.addEventListener("click", toggleHidden);
    submitTaskButton.addEventListener("click", toggleHidden);
    submitTaskButton.addEventListener("click", setCurrentTask);
    submitTaskButton.addEventListener("click", createTask);
    submitTaskButton.addEventListener("click", clearInput);

    function setCurrentTask(e) {
        if (e.target.id === "submitTaskButton") { currentTask = taskDescriptionInput.value; }
        else { currentTask = e.target.textContent; }

    }
    function getCurrentTask() {
        return currentTask;
    }
    function toggleHidden() {
        taskDescriptionDiv.classList.toggle("hidden");
        addTaskButton.classList.toggle("hidden");
    }
    function clearInput() {
        taskDescriptionInput.value = "";
    }
    function createTask() {
        Project.setTask(currentTask);
       // Project.createNoteSubArray();
        render();
    }
    function createButton(task) {
        const taskButton = document.createElement("button");

        taskButton.classList.add("white");
        taskButton.classList.add("projectBtn");
        taskButton.textContent = task;
        taskButton.addEventListener("click", setCurrentTask);
      //  taskButton.addEventListener("click", NotesPreview.render);

        return taskButton;
    }
    function render() {
        const Task = Project.getTask();
      //  const Date = Project.getDate();
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
           // taskButtonDiv.appendChild(createDate(Date[titleIndex][i]));
            taskButtonDiv.addEventListener("mouseenter", Icon.toggleIcon);
            taskButtonDiv.addEventListener("mouseleave", Icon.toggleIcon);
            taskDiv.appendChild(taskButtonDiv);
        }
    }
    return {
        render,
    }
})();

const NotesPreview = (() => {
    //cache DOM
    const noteTitle = document.getElementById("noteTitle");
    const textArea = document.getElementById("textArea");
    const noteButtonDiv = document.getElementById("noteButtonDiv");
    const cancelNoteButton = document.getElementById("cancelNoteButton");
    const saveNoteButton = document.getElementById("saveNoteButton");
})();