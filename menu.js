// Wait for the DOM to be fully loaded before calling includeHTML
document.addEventListener('DOMContentLoaded', function () {
    includeHTML();  // This ensures the function runs after the DOM is ready
});

function includeHTML() {
    const elements = document.querySelectorAll("[data-include-html]");
    console.log("elements: ", elements);  // Debugging log to check if elements are found

    elements.forEach(async (el) => {
        const file = el.getAttribute("data-include-html");
        if (file) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    console.log(`Successfully fetched: ${file}`);
                    el.innerHTML = await response.text();

                    // Now that the navbar is loaded, add the event listener for the hamburger menu
                    const hamburger = document.getElementById('hamburger');
                    const overlay = document.getElementById('overlay');

                    // Ensure both elements exist before adding event listeners
                    if (hamburger && overlay) {
                        hamburger.addEventListener('click', function () {
                            hamburger.classList.toggle('open');
                            overlay.classList.toggle('open');
                        });
                    } else {
                        console.error("Hamburger or overlay not found in the DOM.");
                    }
                } else {
                    console.error(`Error fetching ${file}: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error including HTML: ${error}`);
            }
        }
    });
}