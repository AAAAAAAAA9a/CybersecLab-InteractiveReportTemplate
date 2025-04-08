document.addEventListener('DOMContentLoaded', function() {
    let active = null;
    
    function initScreenshotUploads() {
        document.querySelectorAll('.screenshot-upload').forEach(div => {
            if (!div.innerHTML.trim()) {
                div.innerHTML = '<div class="no-print">Click then paste (CTRL + V)</div><img src="">';
            }
            
            div.addEventListener('click', function() {
                if (active === this) {
                    active.classList.remove('active');
                    active = null;
                } else {
                    if (active) active.classList.remove('active');
                    active = this;
                    active.classList.add('active');
                }
            });
        });
    }

    document.addEventListener('paste', function(e) {
        if (!active) return;
        
        for (let item of e.clipboardData.items) {
            if (item.type.includes('image')) {
                const url = URL.createObjectURL(item.getAsFile());
                const img = active.querySelector('img');
                img.src = url;
                img.style.display = 'block';
                active.querySelector('.no-print').style.display = 'none';
                active.classList.remove('active');
                active = null;
                break;
            }
        }
    });
    
    initScreenshotUploads();
    
    window.initScreenshotUploads = initScreenshotUploads;
});