document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Initialize lightbox for profile picture
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
    lightbox.style.zIndex = '2000';

    const img = new Image();
    img.src = profilePic.getAttribute('src');
    img.style.maxWidth = '50%';
    img.style.maxHeight = '80%';
    img.style.borderRadius = '5%';

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target !== img) {
        lightbox.style.display = 'none';
        document.body.removeChild(lightbox);
      }
    });
  });

  // Modal functionality for project showcases
  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });

  // Close modals
  document.querySelectorAll('.modal .close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
      this.parentElement.parentElement.style.display = 'none';
    });
  });

  // Clicking outside to close modals
  window.addEventListener('click', function(e) {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Other initialization code...
    
    // Modal functionality for project showcases
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
    });

    // Define openModal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            // Initialize the Blackjack game if its modal is opened
            if (modalId === "blackjackModal") {
                initializeBlackjackGame();
            }
        }
    }

    // Close modal logic...
});

