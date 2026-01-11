// ===== Phone Carousel =====
class PhoneCarousel {
    constructor(container) {
        this.container = container;
        this.images = container.querySelectorAll('.phone-screen img');
        this.buttons = container.querySelectorAll('.nav-btn');
        this.indicators = container.querySelectorAll('.indicator');
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Show first image
        this.showImage(this.currentIndex);
        
        // Previous button event
        if (this.buttons[0]) {
            this.buttons[0].addEventListener('click', () => {
                this.prevImage();
            });
        }
        
        // Next button event
        if (this.buttons[1]) {
            this.buttons[1].addEventListener('click', () => {
                this.nextImage();
            });
        }
        
        // Indicator events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showImage(index);
            });
        });
        
        // Auto slide every 5 seconds
        this.startAutoSlide();
        
        // Pause auto slide on hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
        
        // Touch/swipe support for mobile
        this.addTouchEvents();
    }
    
    showImage(index) {
        // Update current index
        this.currentIndex = index;
        
        // Hide all images
        this.images.forEach(img => {
            img.classList.remove('active');
        });
        
        // Show current image
        this.images[this.currentIndex].classList.add('active');
        
        // Update indicators
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        this.indicators[this.currentIndex].classList.add('active');
    }
    
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(this.currentIndex);
    }
    
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(this.currentIndex);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextImage();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
    
    addTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const minSwipeDistance = 50;
        
        if (startX - endX > minSwipeDistance) {
            // Swipe left - next image
            this.nextImage();
        }
        
        if (endX - startX > minSwipeDistance) {
            // Swipe right - previous image
            this.prevImage();
        }
    }
}

// Initialize all carousels on page
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.phone-container');
    carousels.forEach(container => {
        new PhoneCarousel(container);
    });
});