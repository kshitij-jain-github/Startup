
/* ─── CUSTOM CURSOR ─── */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});
function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('a, button, .tab-btn, .rcat-btn, .pj-thumb, .pj-nav-tab, .svc-card, .test-card, .price-card, .faq-q').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ─── MOBILE MENU ─── */
document.getElementById('hamburger').addEventListener('click', () => document.getElementById('mobile-menu').classList.add('open'));
document.getElementById('close-menu').addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open'));
function closeMM() { document.getElementById('mobile-menu').classList.remove('open'); }

/* ─── TAB SWITCHER ─── */
document.getElementById('tab-web').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('tab-reels').classList.remove('active');
    document.getElementById('web-grid').style.display = 'block';
    document.getElementById('reel-grid').style.display = 'none';
});
document.getElementById('tab-reels').addEventListener('click', function () {
    this.classList.add('active');
    document.getElementById('tab-web').classList.remove('active');
    document.getElementById('reel-grid').style.display = 'block';
    document.getElementById('web-grid').style.display = 'none';
});

/* ─── PROJECT VIEWERS ─── */
document.querySelectorAll('.pj-viewer').forEach(function (viewer) {
    const windowEl = viewer.querySelector('.pj-window');
    const imgWrap = viewer.querySelector('.pj-img-wrap');
    const img = imgWrap.querySelector('img');
    const progressFill = viewer.querySelector('.pj-progress-fill');
    const pageLabel = viewer.querySelector('.pj-page-label');
    const navTabs = viewer.querySelectorAll('.pj-nav-tab');
    const row = viewer.closest('.pj-row');
    const thumbs = row ? row.querySelectorAll('.pj-thumb') : [];
    const images = JSON.parse(viewer.getAttribute('data-images') || '[]');
    let curIdx = 0, rafId = null, isHovered = false;

    function loadPage(idx) {
        if (!images[idx]) return;
        curIdx = idx;
        stopScroll();
        imgWrap.style.opacity = '0';
        imgWrap.style.transition = 'opacity 0.25s ease';
        imgWrap.style.transform = 'translateY(0)';
        setTimeout(() => {
            img.src = images[idx].src;
            img.alt = images[idx].label || '';
            if (pageLabel) pageLabel.textContent = images[idx].label || ('Page ' + (idx + 1));
            imgWrap.style.opacity = '1';
            if (img.complete) { if (isHovered) setTimeout(startScroll, 100); }
            else { img.onload = () => { if (isHovered) setTimeout(startScroll, 100); }; }
        }, 200);
        navTabs.forEach(t => t.classList.toggle('cur', parseInt(t.getAttribute('data-idx')) === idx));
        thumbs.forEach((th, i) => th.classList.toggle('active', i === idx));
    }

    function startScroll() {
        if (!isHovered) return;
        const windowH = windowEl.offsetHeight;
        const imgH = img.offsetHeight;
        const scrollable = imgH - windowH;
        if (scrollable <= 0) return;
        const dur = Math.min(14000, Math.max(4000, scrollable * 14));
        let startTime = null;
        function step(ts) {
            if (!isHovered) { stopScroll(); return; }
            if (!startTime) startTime = ts;
            const elapsed = ts - startTime;
            const progress = Math.min(elapsed / dur, 1);
            const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            imgWrap.style.transition = 'none';
            imgWrap.style.transform = 'translateY(' + (-(eased * scrollable)) + 'px)';
            if (progressFill) progressFill.style.height = (eased * 100) + '%';
            if (progress < 1) rafId = requestAnimationFrame(step);
        }
        rafId = requestAnimationFrame(step);
    }

    function stopScroll() {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        imgWrap.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        imgWrap.style.transform = 'translateY(0)';
        if (progressFill) progressFill.style.height = '0%';
    }

    viewer.addEventListener('mouseenter', () => {
        isHovered = true;
        if (img.complete && img.naturalHeight > 0) startScroll();
        else img.addEventListener('load', () => { if (isHovered) startScroll(); }, { once: true });
    });
    viewer.addEventListener('mouseleave', () => { isHovered = false; stopScroll(); });

    navTabs.forEach(tab => {
        tab.addEventListener('click', e => { e.stopPropagation(); loadPage(parseInt(tab.getAttribute('data-idx'))); });
    });
    thumbs.forEach((thumb, i) => {
        thumb.addEventListener('click', () => {
            loadPage(i);
            navTabs.forEach(t => t.classList.toggle('cur', parseInt(t.getAttribute('data-idx')) === i));
        });
    });
});

/* ─── REEL FILTER ─── */
document.querySelectorAll('.rcat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.rcat-btn').forEach(b => b.classList.remove('act'));
        btn.classList.add('act');
        const cat = btn.dataset.cat;
        document.querySelectorAll('.reel-card').forEach(c => {
            c.style.display = (cat === 'all' || c.dataset.cat === cat) ? 'block' : 'none';
        });
    });
});

/* ─── FAQ ACCORDION ─── */
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});

/* ─── SCROLL REVEAL ─── */
const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ─── ANIMATED COUNTERS ─── */
function runCnt(el) {
    const t = parseInt(el.dataset.t), s = el.dataset.s || '';
    let c = 0;
    const step = Math.max(1, Math.ceil(t / 60));
    const ti = setInterval(() => { c = Math.min(c + step, t); el.textContent = c + s; if (c >= t) clearInterval(ti); }, 16);
}
const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { runCnt(e.target); cntObs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.cnt').forEach(el => cntObs.observe(el));

/* ─── LIVE DASHBOARD ─── */
let lv = 243901;
const lvEl = document.getElementById('live-num');
setInterval(() => {
    lv += Math.floor(Math.random() * 8) + 2;
    if (lvEl) lvEl.textContent = lv.toLocaleString('en-IN');
    const bars = document.querySelectorAll('.dm-bar');
    if (bars.length) { const b = bars[Math.floor(Math.random() * bars.length)]; b.style.height = (Math.floor(Math.random() * 55) + 30) + '%'; }
}, 3000);

/* ─── CONTACT FORM → WHATSAPP ─── */
document.getElementById('cform').addEventListener('submit', e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const brief = [
        'Hello Xtract Studios,',

        'A new project inquiry has been submitted through your website.',
        '',

        '• CLIENT INFORMATION',

        'Name: ' + v('fn'),
        'Company: ' + (v('fc') || 'Not Provided'),
        'Email: ' + v('fe'),
        'Phone: ' + v('fp'),
        '',

        '• PROJECT DETAILS',
        'Service Required: ' + v('fs'),
        'Budget Range: ' + v('fb'),
        'Expected Timeline: ' + v('ft'),
        'Current Website: ' + (v('fw') || 'Not Provided'),
        '',

        '• PROJECT BRIEF',

        v('fm'),
        '',


        'Thank you ',

    ].join('\n');
    window.open('https://wa.me/918448908359?text=' + encodeURIComponent(brief), '_blank');
    document.getElementById('cform').style.display = 'none';
    document.getElementById('form-ok').style.display = 'block';
});

function resetForm() {
    document.getElementById('cform').reset();
    document.getElementById('cform').style.display = 'grid';
    document.getElementById('form-ok').style.display = 'none';
}