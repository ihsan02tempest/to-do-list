# 📝 TaskFlow - Modern To-Do List Application

![TaskFlow Preview](https://via.placeholder.com/1200x600/16171d/ffffff?text=TaskFlow+-+Modern+To-Do+List)

TaskFlow adalah aplikasi manajemen tugas (To-Do List) modern, minimalis, dan elegan yang dibangun dengan teknologi web terkini. Dirancang untuk memberikan pengalaman pengguna yang mulus dalam mencatat dan memantau tugas sehari-hari.

## ✨ Fitur Utama

*   **Manajemen Tugas Lengkap**: Tambah, edit, hapus, dan tandai tugas sebagai selesai.
*   **Prioritas & Kategori**: Kelompokkan tugas berdasarkan prioritas (Rendah, Sedang, Tinggi) dan kategori (Pribadi, Kerja, Belanja, Kesehatan, Lainnya).
*   **Dashboard Statistik**: Pantau produktivitas dengan statistik real-time dan *progress bar* interaktif.
*   **Penyaringan (Filter)**: Filter tugas dengan mudah (Semua, Aktif, Selesai).
*   **Mode Gelap/Terang (Dark Mode)**: Dukungan tema adaptif dengan satu klik.
*   **Penyimpanan Lokal (Persistent)**: Data tersimpan aman di *browser localStorage*, tidak hilang saat halaman di-refresh.
*   **UI/UX Premium**: Dibangun dengan komponen `shadcn/ui` dan Tailwind CSS untuk tampilan modern dan animasi yang halus.

## 🛠️ Teknologi yang Digunakan

*   [React 19](https://react.dev/) - Library UI
*   [TypeScript](https://www.typescriptlang.org/) - Type safety
*   [Vite](https://vitejs.dev/) - Build tool yang sangat cepat
*   [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
*   [shadcn/ui](https://ui.shadcn.com/) - Koleksi komponen UI yang indah dan dapat dikustomisasi
*   [Lucide React](https://lucide.dev/) - Ikon SVG yang elegan

## 🚀 Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan TaskFlow di mesin lokal Anda:

### Prasyarat
Pastikan Anda telah menginstal **Node.js** (versi 18+ direkomendasikan) di sistem Anda.

### Instalasi

1. **Clone repository ini**
   ```bash
   git clone https://github.com/ihsan02tempest/to-do-list.git
   cd to-do-list
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Server)**
   ```bash
   npm run dev
   ```

4. **Buka di Browser**
   Buka URL yang tertera di terminal Anda (biasanya `http://localhost:5173/`) untuk melihat aplikasi.

## 📁 Struktur Direktori Utama

```
src/
├── components/       # Komponen React (UI & Bisnis logic)
│   ├── ui/           # Komponen dasar dari shadcn/ui
│   ├── add-todo-form.tsx
│   ├── todo-item.tsx
│   ├── todo-filters.tsx
│   └── ...
├── hooks/            # Custom React Hooks (misal: useLocalStorage)
├── lib/              # Fungsi utilitas
├── types/            # Definisi tipe TypeScript (Interfaces, Types)
├── App.tsx           # Komponen utama aplikasi
├── main.tsx          # Titik masuk aplikasi (Entry point)
└── index.css         # Styling utama (Tailwind imports)
```

## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda memiliki saran perbaikan, fitur baru, atau menemukan *bug*, silakan buka *issue* atau kirim *Pull Request*.

## 📄 Lisensi

Proyek ini bersifat *Open-Source* dan bebas digunakan untuk keperluan pembelajaran maupun modifikasi.
