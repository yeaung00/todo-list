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
})();