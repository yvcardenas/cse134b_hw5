// Implement a custom element for the projects page that fetches and displays the projects from the API
document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('main > section ul');
    projectsContainer.innerHTML = '';

    const remoteDataURL = '/data/projects.json';

    function createProjectCard(project){
        const card = document.createElement('project-card');
        card.setAttribute('title', project.title);
        card.setAttribute('description', project.description);
        card.setAttribute('link', project.link);
        card.setAttribute('image', project.image);
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