// Custom element for projects card that will be used in projects page to display projects
class ProjectsCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        // Create a container for the projects card
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    background-color: color-mix(in srgb, var(--main-bg-color, #FFF0F5) 40%, white 60%);
                    border: 1px solid black;
                    border-radius: 10px;
                    padding: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                    text-align: center;
                    max-width: 400px;
                    display: block; 
                }
                :host(:hover) {
                    transform: translateY(-5px);
                }
                h2 {
                    font-size: 1.8rem;
                    margin: 0.5rem 0;
                }
                img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                }
                a{
                    display: inline-block;
                    margin-top: 0.5rem;
                    text-decoration: none;
                    color: var(--accent-color, #FBAED2);
                    font-weight: bold;
                }
            </style>
            <h2></h2>
            <picture>
                <img src="" alt="Project Image">
            </picture>
            <p></p>
            <a href="#" target="_blank">View Project</a>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes(){
        return ['title', 'description', 'link', 'image'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name === 'title'){
            this.shadowRoot.querySelector('h2').textContent = newValue;
        } else if(name === 'description'){
            this.shadowRoot.querySelector('p').textContent = newValue;
        } else if(name === 'link'){
            this.shadowRoot.querySelector('a').href = newValue;
        } else if(name === 'image'){
            this.shadowRoot.querySelector('img').src = newValue;
            this.shadowRoot.querySelector('img').alt = newValue + ' Screenshot';
        }
    }
}

customElements.define('projects-card', ProjectsCard);