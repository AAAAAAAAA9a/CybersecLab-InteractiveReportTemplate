function getComponentPath(componentName) {
    const repoName = location.pathname.split('/')[1];
    let basePath = '';
    
    // If not on local development
    if (location.hostname !== 'localhost' && repoName && repoName !== '') {
        const pathParts = location.pathname.split('/');
        pathParts.splice(0, 2); // Remove empty string and repo name
        const depth = pathParts.length;
        
        for (let i = 0; i < depth; i++) {
            basePath += '../';
        }
    } else {
        // Local development path calculation
        const path = window.location.pathname;
        const depth = path.split('/').length - 2;
        for (let i = 0; i < depth; i++) {
            basePath += '../';
        }
    }
    
    return `${basePath}components/${componentName}.html`;
}

function loadComponent(componentName, targetSelector) {
  fetch(getComponentPath(componentName))
      .then(response => response.text())
      .then(html => {
          document.querySelectorAll(targetSelector).forEach(el => {
              el.innerHTML = html;
          });
          
          updateLabTitle();

          if (componentName === 'screenshot-container' && window.initScreenshotUploads) {
              window.initScreenshotUploads();
          }
      })
      .catch(error => {
          console.error(`Error loading component ${componentName}:`, error);
      });
}

function updateLabTitle() {
  const pageTitle = document.title;
  const labTitleElements = document.querySelectorAll('.lab-title');
  
  labTitleElements.forEach(el => {
      el.textContent = pageTitle;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadComponent('header', '.report-header');
  loadComponent('controls', '.controls-container');
  
  document.querySelectorAll('.screenshot-container').forEach(() => {
    loadComponent('screenshot-container', '.screenshot-container');
  });
  
  updateLabTitle();
});