document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.navbar ul');
  
  menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.navbar ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navList.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Sticky navbar on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if(window.scrollY > 100) {
      navbar.style.background = 'rgba(31, 36, 45, 0.95)';
      navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.boxShadow = 'none';
    }
  });

  // Smooth scrolling for navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });

  // Enhanced form handling
  const contactForm = document.querySelector('.contact form');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = {
        name: formData.get('Full Name'),
        email: formData.get('Email Address'),
        phone: formData.get('Mobile Number') || 'Not provided',
        subject: formData.get('Email Subject'),
        message: formData.get('Your Message')
      };
      
      // Validate
      if(!data.name || !data.email || !data.subject || !data.message) {
        showAlert('Please fill in all required fields', 'error');
        return;
      }
      
      // Here you would typically send to a server
      // For demo, we'll simulate success
      simulateFormSubmission(data);
    });
  }

  function simulateFormSubmission(data) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Success message
      showAlert(`Thank you, ${data.name}! Your message has been sent. I'll contact you soon at ${data.email}.`, 'success');
      contactForm.reset();
      
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }

  function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if(existingAlert) existingAlert.remove();
    
    // Create alert
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.textContent = message;
    
    // Style it
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.padding = '15px 25px';
    alert.style.background = type === 'error' ? '#ff2a6d' : '#00ff9d';
    alert.style.color = '#1f242d';
    alert.style.borderRadius = '5px';
    alert.style.zIndex = '10000';
    alert.style.animation = 'fadeIn 0.3s ease-out';
    
    document.body.appendChild(alert);
    
    // Remove after 5 seconds
    setTimeout(() => {
      alert.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => alert.remove(), 300);
    }, 5000);
  }

  // Animation for portfolio items on scroll
  const portfolioItems = document.querySelectorAll('.portfolio-box');
  const animateOnScroll = function() {
    portfolioItems.forEach(item => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(itemPosition < screenPosition) {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state
  portfolioItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.5s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
});