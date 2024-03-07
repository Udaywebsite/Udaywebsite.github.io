document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      const section = document.querySelector(`#${sectionId}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dynamic content loading for Resume section
  document.querySelector('[data-section="resume"]').addEventListener('click', () => {
    fetch('resume.html') // Assuming 'resume.html' is a partial
      .then(response => response.text())
      .then(html => {
        document.querySelector('#resume').innerHTML = html;
      })
      .catch(error => console.error('Error loading the resume section:', error));
  });

  // Lightbox for profile picture
  const profilePic = document.querySelector('.profile-pic');
  profilePic.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100vw';
    lightbox.style.height = '100vh';
    lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';

    const img = new Image();
    img.src = profilePic.src;
    img.style.maxWidth = '80%';
    img.style.maxHeight = '80%';
    img.style.borderRadius = '50%';

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });
  });

  // Modal functionality for project showcases
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
        this.style.display = 'none';
      }
    });
  });

  // Open project modal
  window.openProjectModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  };

  // Close project modal
  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  };

  // Optional: Add additional JavaScript for other interactive features or dynamic content loading as needed.
});

