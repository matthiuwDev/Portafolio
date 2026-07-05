document.addEventListener('DOMContentLoaded', () => {
    const hambBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hambBtn && navMenu) {
        hambBtn.addEventListener('click', () => {
            const isExpanded = hambBtn.getAttribute('aria-expanded') === 'true';
            hambBtn.setAttribute('aria-expanded', !isExpanded);
            hambBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hambBtn.setAttribute('aria-expanded', 'false');
                hambBtn.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper .nav-arrow");
    
    if (carousel && arrowBtns.length > 0) {
        const firstImg = carousel.querySelectorAll("img")[0];
        let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

        const showHideIcons = () => {
            let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
            arrowBtns[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
            arrowBtns[1].style.display = Math.ceil(carousel.scrollLeft) >= scrollWidth ? "none" : "block";
        };

        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                let firstImgWidth = firstImg.clientWidth + 14;
                carousel.scrollLeft += btn.id === "left" ? -firstImgWidth : firstImgWidth;
                setTimeout(showHideIcons, 60);
            });
        });

        const autoSlide = () => {
            if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
            positionDiff = Math.abs(positionDiff);
            let firstImgWidth = firstImg.clientWidth + 14;
            let valDifference = firstImgWidth - positionDiff;
            
            if (carousel.scrollLeft > prevScrollLeft) {
                carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
            } else {
                carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
            }
        };

        const dragStart = (e) => {
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carousel.scrollLeft;
        };

        const dragging = (e) => {
            if (!isDragStart) return;
            e.preventDefault();
            isDragging = true;
            carousel.classList.add("dragging");
            positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcons();
        };

        const dragStop = () => {
            isDragStart = false;
            carousel.classList.remove("dragging");
            if (!isDragging) return;
            isDragging = false;
            autoSlide();
        };

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("touchstart", dragStart, { passive: true });
        document.addEventListener("mousemove", dragging);
        carousel.addEventListener("touchmove", dragging, { passive: false });
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("touchend", dragStop);
        
        showHideIcons();
    }
    const scrollBtn = document.getElementById("scrollBtn");
    const header = document.querySelector(".header");

    if (scrollBtn && header) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    scrollBtn.classList.add("show");
                } else {
                    scrollBtn.classList.remove("show");
                }
            });
        }, { rootMargin: "-100px 0px 0px 0px" });

        const scrollWatcher = document.createElement('div');
        scrollWatcher.style.position = 'absolute';
        scrollWatcher.style.top = '0';
        scrollWatcher.style.height = '200px';
        scrollWatcher.style.width = '100%';
        scrollWatcher.style.pointerEvents = 'none';
        document.body.prepend(scrollWatcher);

        observer.observe(scrollWatcher);

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const btnCelebration = document.getElementById('btn-celebration');
    if (btnCelebration) {
        btnCelebration.addEventListener('click', () => {
            btnCelebration.style.display = "none";
            
            const icons = document.querySelectorAll('.social-icon');
            icons.forEach(icon => {
                icon.classList.add('show');
            });
        });
    }
});
