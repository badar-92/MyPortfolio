// ===== Contact Form Handler =====
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('span');
    const btnIcon = submitBtn.querySelector('i');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Change button state
        if (btnText) btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        if (btnIcon) {
            btnIcon.classList.remove('fa-paper-plane');
            btnIcon.classList.add('fa-spinner', 'fa-spin');
        }
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                if (formStatus) {
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                }
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.style.opacity = '0';
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                        }, 500);
                    }
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error
            if (formStatus) {
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again or email me directly.';
                formStatus.className = 'form-status error';
            }
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 500);
                }
            }, 5000);
        } finally {
            // Reset button state
            if (btnText) btnText.textContent = 'Send Message';
            submitBtn.disabled = false;
            if (btnIcon) {
                btnIcon.classList.remove('fa-spinner', 'fa-spin');
                btnIcon.classList.add('fa-paper-plane');
            }
            
            // Reset form status display
            setTimeout(() => {
                if (formStatus) {
                    formStatus.style.opacity = '1';
                    formStatus.style.display = 'block';
                }
            }, 10);
        }
    });
});