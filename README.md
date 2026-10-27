# Dashboard Kawalan Dokumen ISO — PSP

**Sistem:** MS ISO 9001:2015  
**Institusi:** Politeknik Seberang Perai  
**Unit:** Kawalan Dokumen  
**Stack:** React 18 + Vite 5 + Tailwind CSS 3 + Recharts

---

## 🖥️ Halaman Dashboard

| Halaman | Fungsi |
|---|---|
| **Dashboard** | KPI cards, carta status, senarai amaran |
| **Dokumen** | Senarai 20 dokumen dengan carian & penapis |
| **Semakan** | Dokumen dalam semakan & menunggu kelulusan |
| **Tamat Tempoh** | Dokumen luput & hampir luput (≤30 hari) |

---

## 🚀 Cara Run Secara Lokal

### Langkah 1 — Pastikan Node.js dipasang
Muat turun di: https://nodejs.org (pilih versi LTS)

### Langkah 2 — Buka terminal dalam folder projek
```bash
cd DOC-KAWALAN
npm install
npm run dev
```

### Langkah 3 — Buka dalam browser
```
http://localhost:5173/DOC-KAWALAN/
```

---

## 🌐 Cara Deploy ke GitHub Pages (Langkah Demi Langkah)

### LANGKAH 1 — Daftar akaun GitHub
1. Pergi ke https://github.com
2. Klik **Sign up** (percuma)
3. Isikan nama pengguna, emel dan kata laluan

---

### LANGKAH 2 — Buat repositori baru
1. Log masuk ke GitHub
2. Klik butang **"+"** di sudut kanan atas
3. Pilih **"New repository"**
4. Namakan repositori: `DOC-KAWALAN`
5. Pastikan ia **Public**
6. Klik **"Create repository"**

---

### LANGKAH 3 — Upload fail projek

**Cara paling mudah (guna web browser):**

1. Dalam halaman repositori, klik **"uploading an existing file"**
2. Buka folder `DOC-KAWALAN` dalam komputer anda
3. **Select all** (Ctrl+A) semua fail & folder
4. Drag & drop ke halaman GitHub
5. Scroll ke bawah, klik **"Commit changes"**

> ⚠️ Pastikan folder `.github/workflows/deploy.yml` turut diupload!

---

### LANGKAH 4 — Aktifkan GitHub Pages
1. Dalam repositori, klik tab **Settings**
2. Di menu kiri, klik **Pages**
3. Di bawah **"Build and deployment"**, tukar **Source** kepada **GitHub Actions**
4. Klik **Save**

---

### LANGKAH 5 — Tunggu deploy selesai
1. Klik tab **Actions** dalam repositori
2. Anda akan nampak workflow sedang berjalan (🟡 kuning = sedang proses)
3. Tunggu 2–3 minit sehingga jadi (✅ hijau = berjaya)

---

### LANGKAH 6 — Buka laman web anda!
URL laman web anda:
```
https://<nama-pengguna-github-anda>.github.io/DOC-KAWALAN/
```

Contoh: `https://ahmadpsp.github.io/DOC-KAWALAN/`

---

## 📁 Struktur Projek

```
DOC-KAWALAN/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← Auto-deploy GitHub Actions
├── src/
│   ├── App.jsx               ← Keseluruhan dashboard (4 halaman)
│   ├── main.jsx              ← React entry point
│   └── index.css             ← Tailwind CSS
├── index.html
├── vite.config.js            ← base: '/DOC-KAWALAN/'
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## ✨ Ciri-Ciri Dashboard

- 📦 **4 KPI Cards** — Jumlah dokumen, aktif, perlu semakan, luput
- 📊 **Carta Bar** — Taburan status dokumen
- 📁 **Pecahan Jenis** — Prosedur, Arahan Kerja, Borang
- 🔍 **Carian & Penapis** — Cari dokumen, tapis jenis & status
- 🔄 **Halaman Semakan** — Jejak aliran semakan & kelulusan
- ⚠️ **Halaman Tamat Tempoh** — Alert dokumen luput / hampir luput
- 📱 **Responsif** — Berfungsi di telefon dan komputer
- 🎨 **Tema Biru/Putih** — Profesional & bersih
