// Implement a custom element for the projects page that fetches and displays the projects from the API
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('#projects-container');
    projectsContainer.innerHTML = '';

    const remoteDataURL = '/data/projects.json';

    function createProjectCard(project){
        const card = document.createElement('projects-card');
        card.setAttribute('title', project.title);
        card.setAttribute('image', project.image);
        card.setAttribute('description', project.description);
        card.setAttribute('link', project.link);
        projectsContainer.appendChild(card);
    }

    const localProjects = JSON.parse(localStorage.getItem('projects')) || [];
    localProjects.forEach(createProjectCard);

    fetch(remoteDataURL)
        .then(response => response.json())
        .then(remoteProjects => {
            remoteProjects.forEach(createProjectCard);
        })
        .catch(error => console.error('Error fetching projects:', error));
});