/* =========================================
   GP Crackers - Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // Set Active Nav Link based on current URL
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPath === "") currentPath = "index.html";
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (href.includes('#') && currentPath === 'index.html' && window.location.hash === href.substring(href.indexOf('#')))) {
            link.classList.add('nav-active');
        } else {
            link.classList.remove('nav-active');
        }
    });

    /* ── Navbar & WhatsApp Scroll Behavior ── */
    const navbar = document.getElementById("mainNavbar");
    const whatsapp = document.querySelector(".whatsapp-float");

    window.addEventListener("scroll", function () {
        // Navbar Glassmorphism
        const navbarMenuEl = document.getElementById('navbarMenu');
        const isExpanded = navbarMenuEl && navbarMenuEl.classList.contains('show');
        
        if (window.scrollY > 80 || isExpanded) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }

        // Hide WhatsApp in hero section (appears after scrolling past 50% of viewport)
        if (whatsapp) {
            if (window.scrollY > window.innerHeight * 0.5) {
                whatsapp.style.opacity = "1";
                whatsapp.style.visibility = "visible";
                whatsapp.style.pointerEvents = "auto";
                whatsapp.style.transform = "scale(1)";
            } else {
                whatsapp.style.opacity = "0";
                whatsapp.style.visibility = "hidden";
                whatsapp.style.pointerEvents = "none";
                whatsapp.style.transform = "scale(0.8)";
            }
        }
    });

    // Trigger scroll event on load to set initial states
    window.dispatchEvent(new Event('scroll'));

    // Navbar Menu Collapse Listeners
    const navbarMenuEl = document.getElementById('navbarMenu');
    if (navbarMenuEl) {
        navbarMenuEl.addEventListener('show.bs.collapse', function () {
            navbar.classList.add('navbar-scrolled');
        });
        navbarMenuEl.addEventListener('hide.bs.collapse', function () {
            if (window.scrollY <= 80) {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }



    /* ── Products Page Filter ── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    if (filterBtns.length > 0 && productItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        // Small animation delay for smooth appearance
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.classList.add('hide');
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

});
