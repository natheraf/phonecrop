const DEVICES = [
  // ── iPhone 17 series (2025)
  { label: 'iPhone 17 Pro Max', w: 1320, h: 2868 },
  { label: 'iPhone 17 Pro',     w: 1206, h: 2622 },
  { label: 'iPhone Air',        w: 1260, h: 2736 },
  { label: 'iPhone 17',         w: 1206, h: 2622 },
  // ── iPhone 16 series (2024)
  { label: 'iPhone 16e',        w: 1170, h: 2532 },
  { label: 'iPhone 16 Pro Max', w: 1320, h: 2868 },
  { label: 'iPhone 16 Pro',     w: 1206, h: 2622 },
  { label: 'iPhone 16 Plus',    w: 1290, h: 2796 },
  { label: 'iPhone 16',         w: 1179, h: 2556 },
  // ── iPhone 15 series (2023)
  { label: 'iPhone 15 Pro Max', w: 1290, h: 2796 },
  { label: 'iPhone 15 Pro',     w: 1179, h: 2556 },
  { label: 'iPhone 15 Plus',    w: 1290, h: 2796 },
  { label: 'iPhone 15',         w: 1179, h: 2556 },
  // ── iPhone 14 series (2022)
  { label: 'iPhone 14 Pro Max', w: 1290, h: 2796 },
  { label: 'iPhone 14 Pro',     w: 1179, h: 2556 },
  { label: 'iPhone 14 Plus',    w: 1284, h: 2778 },
  { label: 'iPhone 14',         w: 1170, h: 2532 },
  // ── iPhone SE (2022)
  { label: 'iPhone SE (3rd)',    w: 750,  h: 1334 },
  // ── iPhone 13 series (2021)
  { label: 'iPhone 13 Pro Max', w: 1284, h: 2778 },
  { label: 'iPhone 13 Pro',     w: 1170, h: 2532 },
  { label: 'iPhone 13',         w: 1170, h: 2532 },
  { label: 'iPhone 13 mini',    w: 1080, h: 2340 },
  // ── iPhone 12 series (2020)
  { label: 'iPhone 12 Pro Max', w: 1284, h: 2778 },
  { label: 'iPhone 12 Pro',     w: 1170, h: 2532 },
  { label: 'iPhone 12',         w: 1170, h: 2532 },
  { label: 'iPhone 12 mini',    w: 1080, h: 2340 },
  // ── iPhone SE (2020)
  { label: 'iPhone SE (2nd)',    w: 750,  h: 1334 },
  // ── iPhone 11 series (2019)
  { label: 'iPhone 11 Pro Max', w: 1242, h: 2688 },
  { label: 'iPhone 11 Pro',     w: 1125, h: 2436 },
  { label: 'iPhone 11',         w: 828,  h: 1792 },
  // ── iPhone XS / XR series (2018)
  { label: 'iPhone XS Max',     w: 1242, h: 2688 },
  { label: 'iPhone XS',         w: 1125, h: 2436 },
  { label: 'iPhone XR',         w: 828,  h: 1792 },
  // ── iPhone X (2017)
  { label: 'iPhone X',          w: 1125, h: 2436 },
  // ── iPhone 8 series (2017)
  { label: 'iPhone 8 Plus',     w: 1080, h: 1920 },
  { label: 'iPhone 8',          w: 750,  h: 1334 },
  // ── iPhone 7 series (2016)
  { label: 'iPhone 7 Plus',     w: 1080, h: 1920 },
  { label: 'iPhone 7',          w: 750,  h: 1334 },
  // ── iPhone SE 1st gen / 6s / 6 (2014–2016)
  { label: 'iPhone SE (1st)',    w: 640,  h: 1136 },
  { label: 'iPhone 6s Plus',    w: 1080, h: 1920 },
  { label: 'iPhone 6s',         w: 750,  h: 1334 },
  { label: 'iPhone 6 Plus',     w: 1080, h: 1920 },
  { label: 'iPhone 6',          w: 750,  h: 1334 },
  // ── Misc
  { label: 'Square 1:1',        w: 1,    h: 1    },
];

let currentRatioW = 1320, currentRatioH = 2868;
let vPos = 'center', hPos = 'center';
let images = []; // { id, file, img, name }
let idCounter = 0;

// ─── Mobile detection & screen size capture
(function initDetectBanner() {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 1 && window.screen.width < 1024);
  if (!isMobile) return;

  const banner = document.getElementById('detectBanner');
  banner.style.display = 'flex';

  document.getElementById('detectBtn').onclick = () => {
    // Use physical pixel resolution (CSS px × devicePixelRatio)
    const dpr = window.devicePixelRatio || 1;
    const physW = Math.round(window.screen.width * dpr);
    const physH = Math.round(window.screen.height * dpr);

    // Always store as portrait (narrow × tall)
    const pw = Math.min(physW, physH);
    const ph = Math.max(physW, physH);

    currentRatioW = pw;
    currentRatioH = ph;

    document.getElementById('customW').value = pw;
    document.getElementById('customH').value = ph;

    // Deselect preset dropdown
    document.getElementById('deviceSelect').value = '';

    updateAll();

    // Update banner to confirm
    banner.classList.add('used');
    banner.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> Set to this device: ${pw} × ${ph} px (${(dpr).toFixed(1)}× screen)`;
  };
})();


// ─── Build device dropdown
const deviceSelect = document.getElementById('deviceSelect');
DEVICES.forEach((d, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = `${d.label} (${d.w}×${d.h})`;
  deviceSelect.appendChild(opt);
});

deviceSelect.addEventListener('change', () => {
  const d = DEVICES[deviceSelect.value];
  currentRatioW = d.w; currentRatioH = d.h;
  document.getElementById('customW').value = d.w;
  document.getElementById('customH').value = d.h;
  updateAll();
});

document.getElementById('applyCustom').onclick = () => {
  const w = parseFloat(document.getElementById('customW').value);
  const h = parseFloat(document.getElementById('customH').value);
  if (w > 0 && h > 0) {
    currentRatioW = w; currentRatioH = h;
    deviceSelect.value = '';
    updateAll();
  }
};

// ─── Position buttons
document.querySelectorAll('[data-pos]').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('[data-pos]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    vPos = btn.dataset.pos;
    updateAll();
  };
});

document.querySelectorAll('[data-hpos]').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('[data-hpos]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    hPos = btn.dataset.hpos;
    updateAll();
  };
});

// ─── Drag and drop
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  handleFiles([...e.dataTransfer.files]);
});

document.getElementById('fileInput').onchange = e => handleFiles([...e.target.files]);

// ─── Perceptual hashing (8x8 average hash)
function getImageHash(img) {
  const SIZE = 8;
  const c = document.createElement('canvas');
  c.width = SIZE; c.height = SIZE;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, SIZE, SIZE);
  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  const grays = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    grays.push(0.299 * data[i*4] + 0.587 * data[i*4+1] + 0.114 * data[i*4+2]);
  }
  const avg = grays.reduce((a, b) => a + b, 0) / grays.length;
  return grays.map(v => v >= avg ? '1' : '0').join('');
}

function hammingDistance(a, b) {
  let dist = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) dist++;
  return dist;
}

function isDuplicate(hash) {
  // threshold of 5 catches near-identical images (re-saved, slightly resized, etc.)
  return images.some(existing => hammingDistance(existing.hash, hash) <= 5);
}

function handleFiles(files) {
  const imgFiles = files.filter(f => f.type.startsWith('image/'));
  if (!imgFiles.length) return;
  setStatus(`Loading ${imgFiles.length} image(s)…`);
  let loaded = 0;
  let skipped = 0;
  imgFiles.forEach(file => {
    const id = ++idCounter;
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        const hash = getImageHash(img);
        if (isDuplicate(hash)) {
          skipped++;
        } else {
          images.push({ id, file, img, name: file.name, hash });
        }
        if (loaded === imgFiles.length) {
          renderGrid();
          if (skipped > 0) {
            setStatus(`Loaded ${images.length} image(s) — skipped ${skipped} duplicate(s)`);
          } else {
            setStatus(`Loaded ${images.length} image(s)`);
          }
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ─── Render
function renderGrid() {
  const grid = document.getElementById('imageGrid');
  const empty = document.getElementById('emptyState');
  document.getElementById('countBadge').textContent = images.length;
  document.getElementById('downloadBtn').disabled = images.length === 0;

  if (images.length === 0) {
    empty.style.display = 'block';
    grid.querySelectorAll('.image-card').forEach(c => c.remove());
    return;
  }
  empty.style.display = 'none';

  grid.querySelectorAll('.image-card').forEach(c => c.remove());
  images.forEach(item => {
    const card = buildCard(item);
    grid.appendChild(card);
  });

  updateRatioDisplay();
}

function buildCard(item) {
  const card = document.createElement('div');
  card.className = 'image-card';
  card.dataset.id = item.id;

  const wrap = document.createElement('div');
  wrap.className = 'preview-wrap';

  const canvas = document.createElement('canvas');
  drawPreview(canvas, item);
  wrap.appendChild(canvas);

  const rem = document.createElement('button');
  rem.className = 'card-remove';
  rem.innerHTML = '&times;';
  rem.onclick = () => {
    images = images.filter(i => i.id !== item.id);
    renderGrid();
  };
  wrap.appendChild(rem);

  const meta = document.createElement('div');
  meta.className = 'card-meta';

  const name = document.createElement('span');
  name.className = 'card-name';
  name.title = item.name;
  name.textContent = item.name;

  const sz = document.createElement('span');
  sz.className = 'card-size';
  sz.textContent = `${item.img.width}×${item.img.height}`;

  meta.appendChild(name);
  meta.appendChild(sz);

  const resRow = document.createElement('div');
  resRow.className = 'card-res-row';

  const origRes = document.createElement('span');
  origRes.className = 'card-res orig';
  origRes.textContent = `${item.img.width}×${item.img.height}`;

  const arrow = document.createElement('span');
  arrow.className = 'card-res-arrow';
  arrow.textContent = '→';

  const cropRes = document.createElement('span');
  cropRes.className = 'card-res crop';
  updateCropResLabel(cropRes, item);

  resRow.appendChild(origRes);
  resRow.appendChild(arrow);
  resRow.appendChild(cropRes);

  card.appendChild(wrap);
  card.appendChild(meta);
  card.appendChild(resRow);
  return card;
}

function getCropRect(imgW, imgH) {
  const targetRatio = currentRatioW / currentRatioH;
  const imgRatio = imgW / imgH;

  let cropW, cropH;
  if (imgRatio > targetRatio) {
    // image is wider: crop width
    cropH = imgH;
    cropW = cropH * targetRatio;
  } else {
    // image is taller: crop height
    cropW = imgW;
    cropH = cropW / targetRatio;
  }

  // horizontal
  let cropX;
  if (hPos === 'left') cropX = 0;
  else if (hPos === 'right') cropX = imgW - cropW;
  else cropX = (imgW - cropW) / 2;

  // vertical
  let cropY;
  if (vPos === 'top') cropY = 0;
  else if (vPos === 'bottom') cropY = imgH - cropH;
  else cropY = (imgH - cropH) / 2;

  return { x: cropX, y: cropY, w: cropW, h: cropH };
}

function drawPreview(canvas, item) {
  const maxW = 240, maxH = 240;
  const { img } = item;
  const scale = Math.min(maxW / img.width, maxH / img.height, 1);
  const dW = Math.round(img.width * scale);
  const dH = Math.round(img.height * scale);
  canvas.width = dW;
  canvas.height = dH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, dW, dH);

  // draw crop overlay
  const crop = getCropRect(img.width, img.height);
  const oX = crop.x * scale;
  const oY = crop.y * scale;
  const oW = crop.w * scale;
  const oH = crop.h * scale;

  // dim outside
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, dW, dH);
  ctx.clearRect(oX, oY, oW, oH);
  ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, oX, oY, oW, oH);

  // border
  ctx.strokeStyle = '#c8f060';
  ctx.lineWidth = 2;
  ctx.strokeRect(oX + 1, oY + 1, oW - 2, oH - 2);
}

function updateCropResLabel(el, item) {
  const crop = getCropRect(item.img.width, item.img.height);
  el.textContent = `${Math.round(crop.w)}×${Math.round(crop.h)}`;
}

function updateAll() {
  updateRatioDisplay();
  document.querySelectorAll('.image-card').forEach(card => {
    const id = parseInt(card.dataset.id);
    const item = images.find(i => i.id === id);
    if (!item) return;
    const canvas = card.querySelector('canvas');
    drawPreview(canvas, item);
    const cropEl = card.querySelector('.card-res.crop');
    if (cropEl) updateCropResLabel(cropEl, item);
  });
}

function updateRatioDisplay() {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const g = gcd(Math.round(currentRatioW * 10), Math.round(currentRatioH * 10));
  const sw = Math.round(currentRatioW * 10) / g;
  const sh = Math.round(currentRatioH * 10) / g;
  document.getElementById('ratioDisplay').textContent = `${sw}:${sh}`;
}

// ─── Download
document.getElementById('downloadBtn').onclick = async () => {
  if (images.length === 0) return;
  const btn = document.getElementById('downloadBtn');
  btn.disabled = true;
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" class="spinning" fill="none"><circle cx="7" cy="7" r="5" stroke="#111" stroke-width="1.5" stroke-dasharray="20" stroke-dashoffset="10"/></svg> Processing…`;
  setStatus('Cropping and zipping…');

  const zip = new JSZip();
  const folder = zip.folder('cropped');

  for (const item of images) {
    const crop = getCropRect(item.img.width, item.img.height);
    const c = document.createElement('canvas');
    c.width = Math.round(crop.w);
    c.height = Math.round(crop.h);
    const ctx = c.getContext('2d');
    ctx.drawImage(item.img, crop.x, crop.y, crop.w, crop.h, 0, 0, c.width, c.height);

    const blob = await new Promise(res => c.toBlob(res, 'image/jpeg', 0.95));
    const ext = item.name.replace(/\.[^.]+$/, '');
    folder.file(`${ext}_cropped.jpg`, blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'phonecrop_images.zip';
  a.click();
  URL.revokeObjectURL(url);

  btn.disabled = false;
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7A1.5 1.5 0 0012 11.5V10" stroke="#111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Download ZIP`;
  setStatus(`Done! Downloaded ${images.length} image(s)`);
};

document.getElementById('clearBtn').onclick = () => {
  images = [];
  renderGrid();
  setStatus('Cleared');
};

function setStatus(msg) {
  document.getElementById('statusText').textContent = msg;
}
