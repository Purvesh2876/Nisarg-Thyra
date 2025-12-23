/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------------------
       1. STICKY HEADER LOGIC
    ------------------------------------------------------- */
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    /* -------------------------------------------------------
       2. MOBILE DRAWER MENU LOGIC
    ------------------------------------------------------- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelectorAll('.nav-link'); // Main links
    const dropdownSubLinks = document.querySelectorAll('.dropdown li a'); // Sub-links

    // Helper function to close everything cleanly
    const closeDrawer = () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = ''; // Unlock background scroll
        
        // Optional: Collapse dropdowns when drawer closes so it's fresh next time
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('dropdown-active');
        });
    };

    // Open Drawer
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    }

    // Close Drawer (X Button)
    if(closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
    }

    // SMART LINK LOGIC (The Toggle Fix)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if this link has a dropdown sibling (like "Products")
            const dropdown = link.nextElementSibling;

            if (dropdown && dropdown.classList.contains('dropdown')) {
                // IT IS A MENU TOGGLE
                e.preventDefault(); // Stop jumping/navigating
                e.stopPropagation(); // Stop bubbling
                
                // Toggle the class: If present remove it, if missing add it.
                // This makes it Open AND Close on click.
                link.parentElement.classList.toggle('dropdown-active');
                
            } else {
                // IT IS A REGULAR LINK (Home, About, etc.)
                closeDrawer();
            }
        });
    });

    // Close drawer when clicking a sub-link (e.g., "Solar VFD")
    dropdownSubLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* -------------------------------------------------------
       3. NUMBER COUNTER ANIMATION
    ------------------------------------------------------- */
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if(count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                startCounters();
                observer.disconnect(); 
            }
        });
        observer.observe(statsSection);
    } else {
        startCounters(); 
    }
});