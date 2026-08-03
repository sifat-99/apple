const menuToggle = document.querySelector('.menu-toggle');
const mobileNavModal = document.querySelector('.mobile-nav-modal');
const mobileNavClose = document.querySelector('.mobile-nav-close');
const categoryMenuToggleButton = document.querySelector('#bottom-nav-category');

if (menuToggle && mobileNavModal && mobileNavClose) {
    menuToggle.addEventListener('click', () => {
        mobileNavModal.classList.add('active');
    });

    mobileNavClose.addEventListener('click', () => {
        mobileNavModal.classList.remove('active');
    });

    mobileNavModal.addEventListener('click', (e) => {
        if (e.target === mobileNavModal) {
            mobileNavModal.classList.remove('active');
        }
    });
}
if (categoryMenuToggleButton) {
    categoryMenuToggleButton.addEventListener('click', () => {
        mobileNavModal.classList.toggle('active');
        
        const categoryMenu = document.querySelector('.category-menu-modal');
        if (categoryMenu) {
            categoryMenu.classList.remove('active');
        }
    });
}

// Banner Carousel 
const track = document.querySelector('.carousel-section');
const slides = document.querySelectorAll('.carousel-slide');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const dots = document.querySelectorAll('.dot');

if (track && slides.length > 0) {
    let currentIndex = 0;
    const slideCount = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    let autoplayInterval = setInterval(nextSlide, 3000);
}

const showAllCategoriesBtn = document.getElementById('showAllCategoriesBtn');
const featuredGrid = document.querySelector('.featured-grid');

if (showAllCategoriesBtn && featuredGrid) {
    showAllCategoriesBtn.addEventListener('click', () => {
        featuredGrid.classList.toggle('mobile-collapsed');
        if (featuredGrid.classList.contains('mobile-collapsed')) {
            showAllCategoriesBtn.textContent = 'Show all categories';
        } else {
            showAllCategoriesBtn.textContent = 'Hide categories';
        }
    });
}



// All carousel
const allCarousels = document.querySelectorAll('.deals-carousel');

allCarousels.forEach(carousel => {
    const container = carousel.parentElement;
    
    const prevBtn = container.querySelector('.prev-deal');
    const nextBtn = container.querySelector('.next-deal');
    
    if (prevBtn && nextBtn) {
        const scrollAmount = 256;
        
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    const categoryNav = container.querySelector('.ag-computers-category-nav');
    if (categoryNav) {
        const categoryLinks = categoryNav.querySelectorAll('.category-link');
        const productCards = carousel.querySelectorAll('.product-card');

        if (categoryLinks.length > 0) {
            categoryLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    categoryLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    const category = link.textContent.trim().toLowerCase();
                    let searchKeyword = category;
                    if (searchKeyword === 'macbooks') searchKeyword = 'macbook';
                    if (searchKeyword === 'ipads') searchKeyword = 'ipad';
                    if (searchKeyword === 'laptops') searchKeyword = 'laptop';
                    if (searchKeyword === 'accessories') searchKeyword = 'accessory';
                    if (searchKeyword === 'all products') searchKeyword = '';
                    
                    productCards.forEach(card => {
                        const nameEl = card.querySelector('.product-name');
                        if (nameEl) {
                            const productName = nameEl.textContent.toLowerCase();
                            if (productName.includes(searchKeyword) || 
                                (searchKeyword === 'macbook' && productName.includes('mackbook'))) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                    
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                });
            });
        }
    }
});


// About photo carousel logic
const aboutCarousels = document.querySelectorAll('.about-carousel-wrapper');

aboutCarousels.forEach(wrapper => {
    const carousel = wrapper.querySelector('.about-card-photo-carousel');
    const prevBtn = wrapper.querySelector('.prev-btn');
    const nextBtn = wrapper.querySelector('.next-btn');
    const dots = wrapper.querySelectorAll('.dot');
    
    if (!carousel) return;
    
    let currentIndex = 0;
    const slides = carousel.querySelectorAll('.about-photo-card');
    const slideCount = slides.length;
    
    function updateCarousel() {
        if (slides[currentIndex]) {
            const scrollLeft = slides[currentIndex].offsetLeft - carousel.offsetLeft;
            carousel.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
});


const searchInput = document.querySelector('.navbar-search-input');
const searchContainer = document.querySelector('.navbar-search-container');
const searchPopup = document.getElementById('searchPopup');
const desktopSearch = document.querySelector('.desktop-search');
const mobileSearchClose = document.getElementById('mobileSearchClose');

if (searchInput && searchPopup) {
    const showPopup = (e) => {
        searchPopup.classList.add('active');
        desktopSearch.classList.add('active');
        if (mobileSearchClose) mobileSearchClose.classList.add('active');
        e.stopPropagation();
    };

    const hidePopup = () => {
        searchPopup.classList.remove('active');
        desktopSearch.classList.remove('active');
        if (mobileSearchClose) mobileSearchClose.classList.remove('active');
    };

    searchInput.addEventListener('click', showPopup);
    searchInput.addEventListener('focus', showPopup);
    
    if (searchContainer) {
        searchContainer.addEventListener('click', showPopup);
    }

    if (mobileSearchClose) {
        mobileSearchClose.addEventListener('click', (e) => {
            hidePopup();
            e.stopPropagation();
        });
    }

    document.addEventListener('click', (e) => {
        if (!searchPopup.contains(e.target) && (!searchContainer || !searchContainer.contains(e.target)) && (!mobileSearchClose || !mobileSearchClose.contains(e.target))) {
            hidePopup();
        }
    });

    searchPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

const paginationNumbers = document.querySelectorAll('.pagination-number');
if (paginationNumbers.length > 0) {
    paginationNumbers.forEach(number => {
        number.addEventListener('click', (e) => {
            e.preventDefault();
            paginationNumbers.forEach(n => n.classList.remove('active'));
            number.classList.add('active');
        });
    });
}

// Mobile Filter Sidebar Toggle
const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
const categoryFilterSidebar = document.querySelector('.category-filter-sidebar');
const mobileFilterClose = document.querySelector('.mobile-filter-close');
const filterOverlay = document.querySelector('.filter-overlay');

if (mobileFilterToggle && categoryFilterSidebar) {
    mobileFilterToggle.addEventListener('click', () => {
        categoryFilterSidebar.classList.add('active');
        if (filterOverlay) filterOverlay.classList.add('active');
    });
}

if (mobileFilterClose && categoryFilterSidebar) {
    mobileFilterClose.addEventListener('click', () => {
        categoryFilterSidebar.classList.remove('active');
        if (filterOverlay) filterOverlay.classList.remove('active');
    });
}

if (filterOverlay && categoryFilterSidebar) {
    filterOverlay.addEventListener('click', () => {
        categoryFilterSidebar.classList.remove('active');
        filterOverlay.classList.remove('active');
    });
}