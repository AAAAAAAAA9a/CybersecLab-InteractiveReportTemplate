function getComponentPath(componentName) {
    // Always go up one directory to components for lab files
    return "../components/" + componentName + ".html";
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