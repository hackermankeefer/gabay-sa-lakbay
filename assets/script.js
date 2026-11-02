// Shared script for Gabay sa Lakbay site
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuButton = document.getElementById('menuButton');
  const navLinks = document.getElementById('navLinks');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const expanded = navLinks.classList.contains('active');
      menuButton.setAttribute('aria-expanded', expanded);
    });
  }

  // Let mobile visitors open a region submenu before following its region link.
  const dropdownLinks = document.querySelectorAll('.dropdown > a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const dropdown = link.parentElement;
      if (window.matchMedia('(max-width: 650px)').matches && !dropdown.classList.contains('open')) {
        event.preventDefault();
        dropdown.classList.add('open');
        link.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Keyboard support for region dropdowns at any width.
  dropdownLinks.forEach(link => {
    link.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const dropdown = link.parentElement;
        const open = dropdown.classList.toggle('open');
        link.setAttribute('aria-expanded', String(open));
      }
    });
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
  });

  // Close the mobile menu after a destination or submenu link is followed.
  const navLinkItems = document.querySelectorAll('#navLinks a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      if (window.matchMedia('(max-width: 650px)').matches && link.parentElement.classList.contains('dropdown') && link.parentElement.classList.contains('open')) return;
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 150) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

  // Simple search across destination names (hardcoded list)
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const searchMessage = document.getElementById('searchMessage');
  if (searchForm && searchInput && searchMessage) {
    const destinations = [
      'Saud Beach', 'Anawangin Cove', 'Pagsanjan River', 'Chico River', 'Mt Pulag', 'Mt Pinatubo',
      'Boracay White Beach', 'Malapascua Island', 'Loboc River', 'Abatan River', 'Osmena Peak', 'Mt Kanlaon',
      'Cloud 9', 'Samal Island', 'Cagayan de Oro River', 'Agusan River', 'Mt Apo', 'Mt Hamiguitan'
    ];
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        searchMessage.textContent = 'Enter a destination name to search.';
        return;
      }
      const matches = destinations.filter(d => d.toLowerCase().includes(query));
      if (matches.length) {
        const links = matches.map(name => `<a href="${slugify(name)}.html">${name}</a>`).join(', ');
        searchMessage.innerHTML = `Found: ${links}`;
      } else {
        searchMessage.textContent = 'No matching destinations.';
      }
    });
  }

  function slugify(text) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '.html';
  }
});
