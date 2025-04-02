document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let activeSection = null;
    let isTransitioning = false;

    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const closeBtn = section.querySelector('.close-btn');
        const content = section.querySelector('.section-content');

        // Add transition end listener
        content.addEventListener('transitionend', () => {
            isTransitioning = false;
        });

        header.addEventListener('click', (e) => {
            // Prevent click if we're in transition
            if (isTransitioning) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

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
            
            isTransitioning = true;
            e.preventDefault();
            e.stopPropagation();
        });

        // Prevent the close button from triggering the section toggle
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            section.classList.remove('active');
            activeSection = null;
        });
    });

    // Contact email functionality
    const contactLink = document.querySelector('.contact-link');
    const emailText = document.querySelector('.email-text');
    const copyButton = document.querySelector('.copy-button');
    
    if (contactLink && emailText && copyButton) {
        let isEmailVisible = false;
        
        contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            isEmailVisible = !isEmailVisible;
            emailText.classList.toggle('visible');
            copyButton.classList.toggle('visible');
        });

        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('jesperbaltzersen@gmail.com');
                
                // Visual feedback
                const originalColor = copyButton.style.color;
                copyButton.style.color = '#4CAF50';
                setTimeout(() => {
                    copyButton.style.color = originalColor;
                }, 1000);
            } catch (err) {
                console.error('Failed to copy email:', err);
            }
        });
    }
}); 