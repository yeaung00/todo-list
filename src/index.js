import './style.css';
const Project = (() => {
    let Title = [];

    function setTitle(title) {
        Title.push(title);
    }
    function getTitle() {
        return Title;
    }
    return {
        setTitle,
        getTitle,
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

    function toggleHidden() {
        addProjectButton.classList.toggle("hidden");
        projectDescriptionDiv.classList.toggle("hidden");
        console.log("Hello");
    }
    function setCurrentTitle(e) {
        if (e.target.id === "submitButton") { currentTitle = projectDescriptionInput.value; }
        else { currentTitle = e.target.textContent; }
    }
    function createProject() {
        Project.setTitle(currentTitle);
        render();
    }
    function createButton(title) {
        const titleButtonDiv = document.createElement("div");
        const titleButton = document.createElement("button");

        titleButton.classList.add("white");
        titleButton.classList.add("projectBtn");
        titleButton.textContent = title;
        titleButton.addEventListener("click", setCurrentTitle);
     //   titleButton.addEventListener("click", ProjectPreview.render);

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
})();
const ProjectPreview = (() => {
    //cache DOM
    const projectTitle = document.getElementById("projectTitle");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskDiv = document.getElementById("taskDiv");
    const taskDescriptionDiv = document.getElementById("taskDescriptionDiv");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");
    const cancelTaskButton = document.getElementById("cancelTaskButton");
    const submitTaskButton = document.getElementById("submitTaskButton");
})();