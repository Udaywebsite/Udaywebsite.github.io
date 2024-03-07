document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = document.querySelector(`#${this.getAttribute('data-section')}`);
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Dynamic content loading (example for Resume section)
  document.querySelector('[data-section="resume"]').addEventListener('click', () => {
    fetch('resume.html') // Assume you have a 'resume.html' partial to load
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
});
