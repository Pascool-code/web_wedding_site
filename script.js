document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            body.classList.toggle('menu-open');
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('menu-open');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (body.classList.contains('menu-open') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.menu-toggle')) {
                body.classList.remove('menu-open');
            }
        });
    }

    // Initialisation de la carte
    const map = L.map('map', {
        center: [48.8675991, 3.4807403],
        zoom: 13,
        dragging: false,        // Désactive le déplacement
        touchZoom: false,       // Désactive le zoom sur mobile
        scrollWheelZoom: false, // Désactive le zoom avec la molette
        doubleClickZoom: false, // Désactive le zoom au double-clic
        boxZoom: false,         // Désactive le zoom avec la boîte
        keyboard: false,        // Désactive les contrôles clavier
        zoomControl: false      // Masque les boutons de zoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ajout du marqueur pour le lieu du mariage
    const marker = L.marker([48.8675991, 3.4807403]).addTo(map);
    marker.bindPopup("<b>Domaine des Saules</b><br>Lieu de la célébration").openPopup();

    // Smooth scrolling pour la navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gestion du formulaire RSVP
    const form = document.getElementById('rsvpForm');
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwoqjH3H1a7D_mnJpR1y2lDBO3Hqc4Klzc6797NDSVlSfuBPkQGnTjZf2hTvjUvgf0XzA/exec';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Afficher un message de succès
            alert('Merci ! Votre réponse a bien été enregistrée.');
            form.reset();
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Animation au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Variables pour le diaporama
    let slideIndex = 1;
    showSlides(slideIndex);

    // Fonction globale pour changer les slides
    window.changeSlide = function(n) {
        showSlides(slideIndex += n);
    }

    // Fonction globale pour le contrôle par points
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        const slides = document.getElementsByClassName("slides");
        const dots = document.getElementsByClassName("dot");
        const thumbnails = document.getElementsByClassName("thumbnail");
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        // Cacher toutes les slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Désactiver tous les points et miniatures
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
            thumbnails[i].classList.remove("active");
        }
        
        // Afficher la slide actuelle et activer le point et la miniature correspondants
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].classList.add("active");
        thumbnails[slideIndex-1].classList.add("active");
    }

    // Changement automatique des slides toutes les 5 secondes
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}); 