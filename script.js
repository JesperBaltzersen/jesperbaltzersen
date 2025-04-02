document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let activeSection = null;

    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const closeBtn = section.querySelector('.close-btn');

        header.addEventListener('click', () => {
            const index = parseInt(header.dataset.index);
            
            if (activeSection === index) {
                // Close the current section
                section.classList.remove('active');
                activeSection = null;
            } else {
                // Close any open section
                if (activeSection !== null) {
                    sections[activeSection].classList.remove('active');
                }
                // Open the clicked section
                section.classList.add('active');
                activeSection = index;
            }
        });

        // Prevent the close button from triggering the section toggle
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            section.classList.remove('active');
            activeSection = null;
        });
    });
}); 