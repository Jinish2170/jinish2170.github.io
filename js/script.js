// JavaScript to download CV
document.addEventListener('DOMContentLoaded', function() {
    const downloadCVButton = document.getElementById('download-cv');
    
    // Set the href attribute to the location of the CV file
    downloadCVButton.setAttribute('href', 'assets/Jinish_Kathiriya_CV.pdf');
    
    // Set the download attribute so that it triggers a download
    downloadCVButton.setAttribute('download', 'Jinish_Kathiriya_CV.pdf');
    
    // Optional: Track if the button was clicked
    downloadCVButton.addEventListener('click', function() {
        alert('Your CV is being downloaded!');
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Fade-in effect for sections
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
