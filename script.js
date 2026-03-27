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

// Project Data (Updated: removed Live Map/Marketplace, added Download for Acces)
const projectData = {
    hardpaper: {
        title: 'HardPaper',
        description: 'A research-first IDE designed to bridge the gap between software engineering and academic research. It automates the process of converting active codebases into publication-ready research packages and scientific documentation.',
        tags: ['Electron', 'LaTeX', 'Monaco', 'AI', 'Node.js', 'PDF Engine'],
        details: {
            features: [
                'Automated research paper drafting with AI assistance',
                'Code-to-scientific-notation conversion',
                'Integrated citation management (BibTeX)',
                'Live web preview generation',
                'Research package export (IEEE, ACM, Springer)'
            ],
            tech: ['Electron', 'JavaScript', 'LaTeX', 'Monaco Editor', 'AI/ML', 'Node.js']
        },
        links: [
            { text: 'GitHub', url: 'https://github.com/ayomide20000005/hardpaper' }
        ]
    },
    acces: {
        title: 'Acces Studio',
        description: 'A professional-grade, open-source, fully offline desktop video creation suite. It allows users to generate high-fidelity videos without cloud dependencies, utilizing a no-code visual editor and a powerful template system.',
        tags: ['Electron', 'React', 'Remotion', 'Tailwind', 'FFmpeg'],
        details: {
            features: [
                'Template Adapter for rapid video generation',
                'Brand Kit integration for consistency',
                'Local-first rendering engine (no cloud)',
                'MP4 and GIF export support',
                'Drag-and-drop no-code interface'
            ],
            tech: ['Electron', 'React', 'Remotion', 'Tailwind CSS', 'FFmpeg']
        },
        links: [
            { text: 'GitHub', url: 'https://github.com/ayomide20000005/Access-Studio' }
        ]
    },
    demis: {
        title: 'Demis',
        description: 'An "Environment Architect" utility built as a VS Code extension. It automates complex development environment setups through a devtools.json synchronization system, ensuring consistent dev environments across multiple machines without manual configuration.',
        tags: ['TypeScript', 'VS Code API', 'Node.js', 'DevOps'],
        details: {
            features: [
                'Automated dependency syncing across machines',
                'Environment-as-Code (EaC) mapping',
                'Local configuration snapshots',
                'Role-based environment suggestions',
                'One-click setup for teams'
            ],
            tech: ['TypeScript', 'VS Code Extension API', 'Node.js']
        },
        links: [
            { text: 'GitHub', url: 'https://github.com/ayomide20000005/Demis' }
        ]
    },
    boseman: {
        title: 'Boseman',
        description: 'A geospatial search engine and data analysis platform focused on environmental impact. Specifically, it tracks and analyzes the urban displacement of wildlife (with a focus on snakes) using real-time satellite imagery and ecological data.',
        tags: ['Python', 'Flask', 'Leaflet', 'GIS', 'APIs'],
        details: {
            features: [
                'Spatiotemporal analysis of displacement patterns',
                'Automated reporting on wildlife-urban boundaries',
                'Integration with iNaturalist & GBIF',
                'Google Earth Engine data processing',
                'Interactive Leaflet mapping'
            ],
            tech: ['Python', 'Flask', 'Leaflet.js', 'Google Earth Engine API', 'PostgreSQL']
        },
        links: [
            { text: 'GitHub', url: 'https://github.com/ayomide20000005/Boseman' }
        ]
    }
};

// Project Details Modal
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const modalDetails = document.getElementById('modal-details');
const modalLinks = document.getElementById('modal-links');

document.querySelectorAll('.details-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.card');
        const project = projectData[card.dataset.project];
        if (!project) return;
        
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
        modalDetails.innerHTML = `
            <h4>Key Features</h4>
            <ul>${project.details.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <h4 style="margin-top: 16px;">Technology</h4>
            <ul>${project.details.tech.map(t => `<li>${t}</li>`).join('')}</ul>
        `;
        modalLinks.innerHTML = project.links.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join('');
        
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
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Lightbox Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImages = [];
let currentIndex = 0;

const openLightbox = (images, index = 0) => {
    currentImages = images;
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const updateLightboxImage = () => {
    lightboxImg.src = currentImages[currentIndex];
    lightboxCaption.textContent = `Image ${currentIndex + 1} of ${currentImages.length}`;
};

const nextImage = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
};

const prevImage = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
};

// Project and Book Images (skip text-only research items)
document.querySelectorAll('.card-image.lightbox-trigger, .book-cover img.lightbox-trigger').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = img.closest('.card') || img.closest('.book-card');
        let images = [];
        
        if (card && card.dataset.images) {
            images = JSON.parse(card.dataset.images);
        } else {
            images = [img.src];
        }
        
        const startIndex = images.indexOf(img.src);
        openLightbox(images, startIndex >= 0 ? startIndex : 0);
    });
});

// Research Images (only items with data-images attribute)
document.querySelectorAll('.list-item[data-images]').forEach(item => {
    item.addEventListener('click', (e) => {
        if (!e.target.closest('.list-links')) {
            const images = JSON.parse(item.dataset.images);
            openLightbox(images, 0);
        }
    });
});

// Profile Image
document.querySelector('.profile-img.lightbox-trigger')?.addEventListener('click', () => {
    openLightbox(['mypic.jpg'], 0);
});

const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) nextImage();
    if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) prevImage();
});