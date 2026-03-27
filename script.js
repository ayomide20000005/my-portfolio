// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Fade-In on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Accordion for Skills
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Project Modal Data
const projectData = {
    hardpaper: {
        title: 'HardPaper',
        description: 'AI-powered research IDE that analyzes code projects and auto-generates LaTeX papers (IEEE, ACM, Springer). Features Monaco editor, citation manager, and live preview.',
        tags: ['Electron', 'LaTeX', 'Monaco', 'AI'],
        details: {
            features: [
                'Code analysis and paper generation',
                'Monaco editor integration',
                'Citation manager with BibTeX support',
                'Live LaTeX preview',
                'Multiple template support (IEEE, ACM, Springer)'
            ],
            tech: ['Electron', 'JavaScript', 'LaTeX', 'Monaco Editor', 'AI/ML']
        },
        links: [
            { text: 'GitHub', url: '#' },
            { text: 'Demo', url: '#' }
        ]
    },
    acces: {
        title: 'Acces Studio',
        description: 'Offline, no-code video studio built with Electron & Remotion. Drag-and-drop builder, brand kits, and local-first MP4/GIF export engine.',
        tags: ['Electron', 'Remotion', 'JavaScript'],
        details: {
            features: [
                'Drag-and-drop video builder',
                'Brand kit management',
                'Local-first export engine',
                'MP4 and GIF output',
                'No-code interface'
            ],
            tech: ['Electron', 'Remotion', 'JavaScript', 'FFmpeg']
        },
        links: [
            { text: 'GitHub', url: '#' },
            { text: 'Demo', url: '#' }
        ]
    },
    demis: {
        title: 'Demis',
        description: 'AI-powered VS Code extension that suggests and configures dev environments based on your role. Built for developers, made to share.',
        tags: ['VS Code', 'AI', 'TypeScript'],
        details: {
            features: [
                'Role-based environment suggestions',
                'Auto-configuration of dev tools',
                'AI-powered recommendations',
                'One-click setup',
                'Shareable configurations'
            ],
            tech: ['VS Code API', 'TypeScript', 'AI/ML']
        },
        links: [
            { text: 'GitHub', url: '#' },
            { text: 'Marketplace', url: '#' }
        ]
    },
    boseman: {
        title: 'Boseman',
        description: 'Urban snake displacement research tool. Computes the USDRI risk score using iNaturalist, GBIF, and Google Earth Engine data with Leaflet maps.',
        tags: ['Flask', 'Python', 'GIS'],
        details: {
            features: [
                'USDRI risk score computation',
                'iNaturalist and GBIF integration',
                'Google Earth Engine data',
                'Interactive Leaflet maps',
                'Urban displacement analysis'
            ],
            tech: ['Flask', 'Python', 'Leaflet', 'GIS', 'Google Earth Engine']
        },
        links: [
            { text: 'GitHub', url: '#' },
            { text: 'Live Map', url: '#' }
        ]
    }
};

// Project Modal
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalDetails = document.getElementById('modal-details');
const modalLinks = document.getElementById('modal-links');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const project = projectData[card.dataset.project];
        if (!project) return;
        
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        
        modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
        
        modalDetails.innerHTML = `
            <h4>Key Features</h4>
            <ul>
                ${project.details.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <h4 style="margin-top: 16px;">Technology</h4>
            <ul>
                ${project.details.tech.map(t => `<li>${t}</li>`).join('')}
            </ul>
        `;
        
        modalLinks.innerHTML = project.links.map(link => 
            `<a href="${link.url}" target="_blank">${link.text}</a>`
        ).join('');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Lightbox for Book Images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});