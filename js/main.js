// Main JavaScript file for MultiTools Website

// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initializeSearch();
});

// Get relative path for components
function getComponentPath() {
    const path = window.location.pathname;
    if (path.includes('/tools/')) {
        return '../components/';
    }
    return 'components/';
}

// Load header component
function loadHeader() {
    const componentPath = getComponentPath();
    fetch(componentPath + 'header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            // Fix relative paths in header
            const header = document.querySelector('header');
            if (header && window.location.pathname.includes('/tools/')) {
                const links = header.querySelectorAll('a[href="index.html"]');
                links.forEach(link => link.href = '../index.html');
            }
            // Initialize Bootstrap dropdown if on page with navbar
            if (typeof bootstrap !== 'undefined') {
                const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
                dropdownElementList.forEach(dropdownToggleEl => {
                    new bootstrap.Dropdown(dropdownToggleEl);
                });
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback header if component fails to load
            const homeLink = window.location.pathname.includes('/tools/') ? '../index.html' : 'index.html';
            document.body.insertAdjacentHTML('afterbegin', `
                <header class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container">
                        <a class="navbar-brand" href="${homeLink}">MultiTools</a>
                        <a class="nav-link text-white" href="${homeLink}">Home</a>
                    </div>
                </header>
            `);
        });
}

// Load footer component
function loadFooter() {
    const componentPath = getComponentPath();
    fetch(componentPath + 'footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            // Fix relative paths in footer
            const footer = document.querySelector('footer');
            if (footer && window.location.pathname.includes('/tools/')) {
                const links = footer.querySelectorAll('a[href="index.html"]');
                links.forEach(link => link.href = '../index.html');
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback footer
            document.body.insertAdjacentHTML('beforeend', `
                <footer class="bg-dark text-light text-center py-3 mt-5">
                    <div class="container">
                        <p>&copy; 2024 MultiTools. All rights reserved.</p>
                    </div>
                </footer>
            `);
        });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const headerSearch = document.getElementById('headerSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterTools(e.target.value.toLowerCase());
        });
    }
    
    if (headerSearch) {
        headerSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchTools();
            }
        });
    }
}

// Filter tools based on search query
function filterTools(query) {
    const cards = document.querySelectorAll('.tool-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
        const category = card.closest('.category-section')?.id || '';
        
        if (title.includes(query) || description.includes(query) || category.includes(query)) {
            card.parentElement.style.display = '';
            visibleCount++;
        } else {
            card.parentElement.style.display = 'none';
        }
    });
    
    // Show "No results" message if no tools match
    let noResultsMsg = document.getElementById('noResults');
    if (visibleCount === 0 && query !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'noResults';
            noResultsMsg.className = 'alert alert-info text-center mt-4';
            noResultsMsg.innerHTML = '<h5>No tools found</h5><p>Try searching with different keywords.</p>';
            document.querySelector('.tools-grid')?.parentElement.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Search tools function (called from header search button)
function searchTools() {
    const headerSearch = document.getElementById('headerSearch');
    if (headerSearch && window.location.pathname.includes('index.html')) {
        const query = headerSearch.value.toLowerCase();
        filterTools(query);
        // Scroll to tools section
        document.querySelector('.tools-grid')?.scrollIntoView({ behavior: 'smooth' });
    } else if (headerSearch) {
        // Redirect to index with search query
        window.location.href = `index.html?search=${encodeURIComponent(headerSearch.value)}`;
    }
}

// Handle search query from URL parameter
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        const searchInput = document.getElementById('searchInput');
        const headerSearch = document.getElementById('headerSearch');
        if (searchInput) {
            searchInput.value = searchQuery;
            filterTools(searchQuery.toLowerCase());
        }
        if (headerSearch) {
            headerSearch.value = searchQuery;
        }
    }
});

// Copy to clipboard function (used by many tools)
function copyToClipboard(text, elementId) {
    navigator.clipboard.writeText(text).then(function() {
        const element = document.getElementById(elementId);
        if (element) {
            const originalText = element.textContent;
            element.textContent = 'Copied!';
            element.classList.add('btn-success');
            setTimeout(function() {
                element.textContent = originalText;
                element.classList.remove('btn-success');
            }, 2000);
        }
        showAlert('Copied to clipboard!', 'success');
    }).catch(function(err) {
        console.error('Failed to copy:', err);
        showAlert('Failed to copy to clipboard', 'danger');
    });
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-custom`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.tool-content') || document.querySelector('main');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
}

// Download file function
function downloadFile(content, filename, contentType = 'text/plain') {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate URL
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

