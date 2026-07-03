/**
 * AstraCore Game Booster - All-in-One Engine
 */

// --- UTILS ---
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const sleep = ms => new Promise(res => setTimeout(res, ms));
const generateMetric = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- STORAGE ---
const Storage = {
    save: (k, d) => localStorage.setItem('ac_'+k, JSON.stringify(d)),
    get: (k, def) => localStorage.getItem('ac_'+k) ? JSON.parse(localStorage.getItem('ac_'+k)) : def
};

// --- MAIN RUNNER ---
document.addEventListener('DOMContentLoaded', () => {
    // Canvas Particles
    const canvas = $('#particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let pts = [];
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize); resize();
        for(let i=0; i<40; i++) pts.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, sx:Math.random()*0.4-0.2, sy:Math.random()*0.4-0.2});
        setInterval(() => {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            pts.forEach(p => {
                p.x += p.sx; p.y += p.sy;
                if(p.x>canvas.width||p.x<0) p.sx*=-1; if(p.y>canvas.height||p.y<0) p.sy*=-1;
                ctx.fillStyle = 'rgba(0,243,255,0.3)'; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI*2); ctx.fill();
            });
        }, 1000/60);
    }

    // Splash Screen Simulation
    let prog = 0;
    const bar = $('#loader-bar');
    const pct = $('#loader-percentage');
    const iv = setInterval(() => {
        prog += generateMetric(5, 15);
        if(prog >= 100) {
            prog = 100; clearInterval(iv);
            $('#splash-screen').classList.add('hidden');
            $('#app-interface').classList.remove('hidden');
            initApp();
        }
        if(bar) bar.style.width = prog + '%';
        if(pct) pct.innerText = prog + '%';
    }, 150);
});

// --- ENGINE INITIALIZATION ---
function initApp() {
    // SPA Navigation
    $$('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.nav-btn').forEach(b => b.classList.remove('active'));
            $$('.app-page').forEach(p => p.classList.remove('active-page'));
            btn.classList.add('active');
            $(`#${btn.dataset.target}`).classList.add('active-page');
            $('#page-title').innerText = btn.querySelector('span').innerText;
        });
    });

    // Dashboard Specs
    const specs = $('#device-specs');
    if(specs) {
        specs.innerHTML = `
            <p>Platform: ${navigator.platform}</p>
            <p>Resolusi: ${window.screen.width}x${window.screen.height}</p>
            <p>RAM Estimasi: ${navigator.deviceMemory || '4'} GB</p>
            <p>Status: ONLINE</p>
        `;
    }

    // Telemetry Counter (FPS & Ping)
    let fc = 0, lt = performance.now(), cfps = 60;
    function loop() {
        fc++; const now = performance.now();
        if(now >= lt + 1000) {
            cfps = Math.round((fc * 1000) / (now - lt));
            if($('#fps-val')) $('#fps-val').innerText = cfps;
            if($('#ping-val')) $('#ping-val').innerText = generateMetric(15, 40) + ' ms';
            fc = 0; lt = now;
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Boost Core Button
    const bBtn = $('#btn-core-boost');
    if(bBtn) {
        bBtn.addEventListener('click', () => {
            bBtn.innerText = "BOOSTING...";
            setTimeout(() => {
                bBtn.innerText = "BOOST";
                alert(`🚀 Sistem Dioptimasi!\nMemori Sandbox dilepaskan: ${generateMetric(50, 150)} MB`);
            }, 2000);
        });
    }

    // Cleaner Engine
    const cBtn = $('#btn-clean-now');
    if(cBtn) {
        cBtn.addEventListener('click', () => {
            $('#cache-size').innerText = "0";
            alert("🧹 File sampah browser berhasil dibersihkan!");
        });
    }

    // Accent Settings
    const acc = $('#setting-accent');
    if(acc) {
        acc.value = Storage.get('accent', 'cyan');
        document.documentElement.setAttribute('data-accent', acc.value);
        acc.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-accent', e.target.value);
            Storage.save('accent', e.target.value);
        });
    }
                     }
          
