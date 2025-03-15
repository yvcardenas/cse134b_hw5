// Implement a custom element for the projects page that fetches and displays the projects from the API
// BIN ID:67d4f06a8561e97a50ec3c40
// API KEY: $2a$10$aYhoasD1nvzFKDwjbclWfOVJPCKONJHy0.aEv4ncm5w8HyK0dyDRG 
const sampleProjects = [
    {
        title: "Developer Journal",
        description: "An interactive, space-themed task management app.",
        image: "../media/developer-journal.jpg",
        link: "https://github.com/yvcardenas/developer_journal"
    },
    {
        title: "Entertainment Recommender",
        description: "A personalized entertainment recommender app using AI.",
        image: "../media/entertainment-recommender.jpg",
        link: "https://github.com/yvcardenas/entertainment_recommender"
    }
];

// Only set default projects if none exist in localStorage
if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(sampleProjects));
}

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('#projects-container');
    // projectsContainer.innerHTML = '';
    // const remoteDataURL = '/data/projects.json';
    
    // JSONBIN API Credentials
    const binID = '67d4f06a8561e97a50ec3c40';
    const apiMasterKey = '$2a$10$lTc3bE5Lx9LZG9uyGXPp7uvCkzxK6v0KuBluOviDlgaIxH.86V.6.';
    // const apiAccessKey = '$2a$10$aYhoasD1nvzFKDwjbclWfOVJPCKONJHy0.aEv4ncm5w8HyK0dyDRG';
    const jsonBinURL = `https://api.jsonbin.io/v3/b/${binID}/latest`;

    function createProjectCard(project){
        const card = document.createElement('projects-card');
        card.setAttribute('title', project.title);
        card.setAttribute('image', project.image);
        card.setAttribute('description', project.description);
        card.setAttribute('link', project.link);
        projectsContainer.appendChild(card);
    }

    // Load projects from local storage
    function fetchLocalProjects(){
        projectsContainer.innerHTML = ''; // Clearing the previous content to start fresh
        const localProjects = JSON.parse(localStorage.getItem('projects')) || [];
        localProjects.forEach(createProjectCard);
    }

    // Load projects from the JSON Bin API
    async function fetchRemoteProjects(){
        try {
            const response = await fetch(jsonBinURL, {
                method: 'GET',
                headers: {
                    'X-Master-Key': apiMasterKey
                }
            });
            if(!response.ok){
                throw new Error('Failed to fetch remote projects');
            }
            const data = await response.json();

            if (!data.record || !Array.isArray(data.record)) {
                throw new Error("Invalid data format received from JSONBin.");
            }

            localStorage.setItem('projects', JSON.stringify(data.record));
            projectsContainer.innerHTML = ''; // Clearing the previous content to start fresh
            data.record.forEach(createProjectCard);
        } catch (error) {
            console.error("Error fetching remote projects!", error);
            alert("Failed to load remote projects. Please try again later.");
        }
    }

    // Attach eventListeners to buttons
    document.getElementById('load-local').addEventListener('click', fetchLocalProjects);
    document.getElementById('load-remote').addEventListener('click', fetchRemoteProjects);

    fetchLocalProjects();
    fetchRemoteProjects();
});