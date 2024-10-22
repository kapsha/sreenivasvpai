document.addEventListener("DOMContentLoaded", () => {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // Apply the color theme globally (this applies to all pages)
            document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', config.theme.secondaryColor);
            document.documentElement.style.setProperty('--background-color', config.theme.backgroundColor);
            document.documentElement.style.setProperty('--text-color', config.theme.textColor);

            // Update title and subtitle for pages that have them
            const titleElement = document.querySelector('h1');
            const subtitleElement = document.querySelector('p');
            if (titleElement && subtitleElement) {
                titleElement.textContent = config.siteInfo.title;
                subtitleElement.textContent = config.siteInfo.subtitle;
            }

            // Update services section if it exists
            const servicesGrid = document.querySelector('.services-grid');
            if (servicesGrid) {
                servicesGrid.innerHTML = ''; // Clear existing services
                config.services.forEach(service => {
                    const serviceItem = document.createElement('div');
                    serviceItem.classList.add('service-item');
                    serviceItem.innerHTML = `
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                    `;
                    servicesGrid.appendChild(serviceItem);
                });
            }
        })
        .catch(error => console.error('Error loading config:', error));
});
