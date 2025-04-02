document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let activeSection = null;
    let isTransitioning = false;
    let lastTransitionStart = 0;

    sections.forEach((section, sectionIndex) => {
        const header = section.querySelector('.section-header');
        const closeBtn = section.querySelector('.close-btn');
        const content = section.querySelector('.section-content');

        // Reset transition state if animation somehow gets interrupted
        content.addEventListener('transitioncancel', () => {
            isTransitioning = false;
        });

        content.addEventListener('transitionend', () => {
            isTransitioning = false;
        });

        header.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // If still transitioning but it's been more than 500ms, force reset
            if (isTransitioning) {
                if (Date.now() - lastTransitionStart > 500) {
                    isTransitioning = false;
                } else {
                    return;
                }
            }

            const index = sectionIndex;
            
            if (activeSection === index) {
                // Close the current section
                section.classList.remove('active');
                activeSection = null;
            } else {
                // Close any open section
                if (activeSection !== null && sections[activeSection]) {
                    sections[activeSection].classList.remove('active');
                }
                // Open the clicked section
                section.classList.add('active');
                activeSection = index;
            }
            
            isTransitioning = true;
            lastTransitionStart = Date.now();
        });

        // Prevent the close button from triggering the section toggle
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                section.classList.remove('active');
                activeSection = null;
                isTransitioning = false;
            });
        }
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