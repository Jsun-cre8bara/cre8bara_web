// 펀러닝 웹사이트 JavaScript

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // 통계 카운터 애니메이션
    initCounterAnimation();
});

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.feature-box, .attraction-card, .course-card, .partnership-card, .success-card, .stat-card, .step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter Animation for Statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // 애니메이션 속도

    const animateCounter = (counter) => {
        const target = counter.textContent;
        let current = 0;
        
        // 숫자와 기호 분리
        const match = target.match(/(\d+(?:~\d+)?)(.*)/);
        if (!match) return;
        
        const numbers = match[1];
        const suffix = match[2];
        
        // 범위 형식 (15~25% 같은 경우)
        if (numbers.includes('~')) {
            counter.textContent = numbers + suffix;
            return;
        }
        
        const targetNumber = parseInt(numbers);
        const increment = targetNumber / speed;

        const updateCounter = () => {
            current += increment;
            if (current < targetNumber) {
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = targetNumber + suffix;
            }
        };

        updateCounter();
    };

    // Intersection Observer로 화면에 보일 때 애니메이션 실행
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// 버튼 클릭 이벤트 (실제 서비스에서는 실제 기능으로 연결)
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#' || this.getAttribute('href') === '#start') {
            e.preventDefault();
            alert('펀러닝 서비스는 곧 출시 예정입니다! 조금만 기다려주세요 😊');
        }
    });
});

// 페이지 스크롤 시 Hero 섹션 페이드 효과
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const opacity = 1 - (scrolled / heroHeight) * 0.5;
        hero.style.opacity = opacity;
    }
});
