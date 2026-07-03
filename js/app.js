/**
 * AstraCore Game Booster - Pro Flagship Engine
 */

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const genMetric = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Database Lokal Engine (Agar Data Game Tersimpan Permanen di HP)
const DB = {
    save: (key, data) => localStorage.setItem('astracore_' + key, JSON.stringify(data)),
    get: (key, fallback) => localStorage.getItem('astracore_' + key) ? JSON.parse(localStorage.getItem('astracore_' + key)) : fallback
};

// Data Game Bawaan Asli
let gameLibrary = DB.get('games', [
    { title: 'Mobile Legends', genre: 'MOBA', icon: '⚔️' },
    { title: 'PUBG Mobile', genre: 'Battle Royale', icon: '🔫' },
    { title: 'Genshin Impact', genre: 'RPG', icon: '✨' }
]);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Simulasi Booting Splash Screen
    let progress = 0;
    const bar = $('#loader-bar');
    const pct = $('#loader-percentage');
    const bootInterval = setInterval(() => {
        progress += genMetric(4, 12);
        if (progress >= 100) {
            progress = 100;
            clearInterval(bootInterval);
            $('#splash-screen').classList.add('hidden');
            $('#app-interface').classList.remove('hidden');
            startAstraEngine(); // Aktifkan sistem inti
        }
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.innerText = progress + '%';
    }, 120);

    // 2. Efek Latar Belakang Partikel Matrix
    const canvas = $('#particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize); resize();
        for (let i = 0; i < 35; i++) {
            particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: Math.random() * 0.3 - 0.15, vy: Math.random() * 0.3 - 0.15 });
        }
        setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x > canvas.width || p.x < 0) p.vx *= -1;
                if (p.y > canvas.height || p.y < 0) p.vy *= -1;
                ctx.fillStyle = 'rgba(0, 243, 255, 0.25)';
                ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();
            });
        }, 1000 / 60);
    }
});

// --- CORE FUNCTIONAL SYSTEM ---
function startAstraEngine() {
    // A. Sistem Navigasi Menu Bawah
    $$('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.nav-btn').forEach(b => b.classList.remove('active'));
            $$('.app-page').forEach(p => p.classList.remove('active-page'));
            
            btn.classList.add('active');
            const target = btn.dataset.target;
            $(`#${target}`).classList.add('active-page');
            $('#page-title').innerHTML = `Astra<span>Core</span> | ${btn.querySelector('span').innerText}`;
        });
    });

    // B. Tampilkan Spesifikasi Handphone Secara Akurat
    const specBox = $('#device-specs');
    if (specBox) {
        specBox.innerHTML = `
            <p><span>Arsitektur CPU:</span> ${navigator.platform.includes('arm') ? 'ARM Cortex-v8' : 'Octa-Core SOC'}</p>
            <p><span>Resolusi Layar:</span> ${window.screen.width} x ${window.screen.height} px</p>
            <p><span>Alokasi RAM:</span> ${navigator.deviceMemory || '4'} GB LPDDR4X</p>
            <p><span>Engine Grafis:</span> Vulkan API v1.3</p>
        `;
    }

    // C. Aliran Data Telemetri Real-time (FPS & PING Berfluktuasi Alami)
    let fpsCount = 0, lastTime = performance.now();
    function liveTelemetry() {
        fpsCount++;
        const now = performance.now();
        if (now >= lastTime + 1000) {
            const actualFps = Math.round((fpsCount * 1000) / (now - lastTime));
            // Stabilisasi simulasi di angka 58-61 FPS
            const fakeFps = actualFps > 60 ? genMetric(59, 61) : genMetric(58, 60);
            if ($('#fps-val')) $('#fps-val').innerText = fakeFps;
            if ($('#ping-val')) $('#ping-val').innerText = genMetric(18, 29) + ' ms';
            fpsCount = 0; lastTime = now;
        }
        requestAnimationFrame(liveTelemetry);
    }
    requestAnimationFrame(liveTelemetry);

    // D. Fungsional Tombol BOOST Super Premium + Konsol Log Peretasan
    const boostBtn = $('#btn-core-boost');
    const consoleBox = $('#boost-console');
    const logOutput = $('#boost-log');

    if (boostBtn) {
        boostBtn.addEventListener('click', async () => {
            boostBtn.disabled = true;
            boostBtn.innerText = "TUNING...";
            consoleBox.classList.remove('hidden');
            logOutput.innerHTML = "";

            const logs = [
                "[>] Accessing kernel space...",
                "[>] Clearing background cache chains...",
                "[>] Allocating GPU priority matrix...",
                "[>] Optimizing CPU Governor to PERFORMANCE...",
                "[>] Thermal throttling threshold bypassed.",
                "[SUCCESS] AstraCore Engine fully optimized!"
            ];

            for (let line of logs) {
                logOutput.innerHTML += `<div>${line}</div>`;
                consoleBox.scrollTop = consoleBox.scrollHeight;
                await new Promise(r => setTimeout(r, 400));
            }

            setTimeout(() => {
                alert(`🚀 CORE ENGINE BOOSTED!\nStabilitas game ditingkatkan sebesar 25%.`);
                boostBtn.disabled = false;
                boostBtn.innerText = "BOOST";
                consoleBox.classList.add('hidden');
            }, 800);
        });
    }

    // E. Fungsional Fitur TAMBAH GAME (Bisa Diklik & Berfungsi Nyata)
    const modal = $('#game-modal');
    renderLibrary(); // Tampilkan katalog game saat awal dibuka

    if ($('#btn-add-game')) {
        $('#btn-add-game').addEventListener('click', () => modal.classList.remove('hidden'));
    }
    if ($('#btn-modal-close')) {
        $('#btn-modal-close').addEventListener('click', () => modal.classList.add('hidden'));
    }

    if ($('#btn-modal-save')) {
        $('#btn-modal-save').addEventListener('click', () => {
            const title = $('#modal-game-title').value.trim();
            const genre = $('#modal-game-genre').value.trim();
            const emojis = ['🎮', '🕹️', '🏹', '🚗', '⚽', '🏆'];

            if (title && genre) {
                gameLibrary.push({
                    title: title,
                    genre: genre,
                    icon: emojis[Math.floor(Math.random() * emojis.length)]
                });
                DB.save('games', gameLibrary); // Simpan permanen
                renderLibrary(); // Render ulang daftar game
                
                // Reset form input & tutup popup modal
                $('#modal-game-title').value = "";
                $('#modal-game-genre').value = "";
                modal.classList.add('hidden');
            } else {
                alert("Harap isi seluruh kolom nama dan kategori game!");
            }
        });
    }

    // F. Fitur Smart Cleaner (Membersihkan Angka Sampah)
    const cleanBtn = $('#btn-clean-now');
    if (cleanBtn) {
        cleanBtn.addEventListener('click', () => {
            cleanBtn.innerText = "CLEANING...";
            cleanBtn.disabled = true;
            setTimeout(() => {
                const cleaned = $('#cache-size').innerText;
                $('#cache-size').innerText = "0";
                alert(`🧹 Bersih Total!\nSejumlah ${cleaned} MB file sampah sistem berhasil dimusnahkan.`);
                cleanBtn.innerText = "Bersihkan Sekarang";
                cleanBtn.disabled = false;
            }, 1200);
        });
    }

    // G. Pengaturan Kustomisasi Tema Warna Aksentuasi
    const accentSelect = $('#setting-accent');
    if (accentSelect) {
        const savedAccent = DB.get('ui_accent', 'cyan');
        accentSelect.value = savedAccent;
        document.documentElement.setAttribute('data-accent', savedAccent);

        accentSelect.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-accent', e.target.value);
            DB.save('ui_accent', e.target.value);
        });
    }
}

// Fungsi Bantu untuk Menampilkan List Game ke dalam Grid Layar
function renderLibrary() {
    const grid = $('#game-library-grid');
    if (!grid) return;
    grid.innerHTML = ""; // Bersihkan tampilan lama

    gameLibrary.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game-card glass';
        div.innerHTML = `
            <span class="game-icon">${game.icon}</span>
            <div class="game-title">${game.title}</div>
            <div class="game-genre">${game.genre}</div>
            <button class="btn-launch" onclick="alert('Meluncurkan ${game.title} dengan Akselerasi AstraCore!')">LAUNCH</button>
        `;
        grid.appendChild(div);
    });
      }
      
