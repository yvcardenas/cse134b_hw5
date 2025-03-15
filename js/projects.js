// Implement a custom element for the projects page that fetches and displays the projects from the API
// BIN ID:67d4f06a8561e97a50ec3c40
// API KEY: $2a$10$aYhoasD1nvzFKDwjbclWfOVJPCKONJHy0.aEv4ncm5w8HyK0dyDRG 

document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('#projects-container');
    // projectsContainer.innerHTML = '';
    // const remoteDataURL = '/data/projects.json';
    
    // JSONBIN API Credentials
    const binID = '67d4f06a8561e97a50ec3c40';
    const apiKey = '$2a$10$aYhoasD1nvzFKDwjbclWfOVJPCKONJHy0.aEv4ncm5w8HyK0dyDRG';
    const jsonBinURL = `https://api.jsonbin.io/b/${binID}/latest`;

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
                headers: {
                    'X-Master-Key': apiKey
                }
            });
            if(!response.ok){
                throw new Error('Failed to fetch remote projects');
            }
            const data = await response.json();
            localStorage.setItem('projects', JSON.stringify(data.projects));
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