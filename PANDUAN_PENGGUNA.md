# Panduan Pengguna - Influencer Campaign Management System

## Daftar Isi

1. [Pengenalan Sistem](#pengenalan-sistem)
2. [Login & Autentikasi](#login--autentikasi)
3. [Dashboard](#dashboard)
4. [Menu Campaign](#menu-campaign)
5. [Menu Influencer](#menu-influencer)
6. [Pengaturan & Logout](#pengaturan--logout)

---

## Pengenalan Sistem

Sistem Influencer Campaign Management adalah platform berbasis web yang dirancang untuk memudahkan admin dalam mengelola kampanye marketing dengan influencer. Sistem ini menyediakan fitur lengkap mulai dari pembuatan kampanye, pengelolaan influencer, hingga monitoring performa posting konten.

### Fitur Utama

- ✅ Manajemen Kampanye dengan AI Assistant
- ✅ Database Influencer (Instagram & TikTok)
- ✅ Monitoring & Approval Post
- ✅ Real-time Analytics & Metrics
- ✅ Dark Mode Support

---

## Login & Autentikasi

### Cara Login

1. Buka halaman login sistem
2. Masukkan **Email** dan **Password**
3. Klik tombol **"Sign In"**
4. Sistem akan memvalidasi kredensial dan redirect ke Dashboard

### Fitur Keamanan

- Session-based authentication
- Token JWT untuk API requests
- Auto-logout setelah session expired
- Password encryption

---

## Dashboard

Dashboard adalah halaman utama yang menampilkan ringkasan seluruh aktivitas kampanye dan performa sistem.

### 1. **Metrics Cards (Kartu Statistik)**

Terdapat 5 kartu statistik utama di bagian atas dashboard:

#### **Total Influencers**

- **Fungsi**: Menampilkan jumlah total influencer yang terdaftar dalam sistem
- **Icon**: Users (biru)
- **Growth Indicator**: Menampilkan pertumbuhan jumlah influencer dibanding periode sebelumnya
- **Format**: Angka + persentase pertumbuhan (contoh: +100%)

#### **Active Campaigns**

- **Fungsi**: Menampilkan jumlah kampanye yang sedang berjalan
- **Icon**: Lightning (ungu)
- **Growth Indicator**: Pertumbuhan kampanye aktif
- **Manfaat**: Monitoring beban kerja aktif tim

#### **Pending Posts**

- **Fungsi**: Jumlah posting yang menunggu approval
- **Icon**: Clock (orange)
- **Growth Indicator**: Perubahan jumlah pending posts
- **Action Required**: Segera review jika angka tinggi

#### **Total Campaigns**

- **Fungsi**: Total seluruh kampanye (draft + upcoming + active + expired)
- **Icon**: Briefcase (hijau)
- **Growth Indicator**: Pertumbuhan total kampanye
- **Manfaat**: Melihat produktivitas pembuatan kampanye

#### **Total Engagement**

- **Fungsi**: Total engagement dari seluruh posting kampanye
- **Icon**: Heart (pink)
- **Growth Indicator**: Pertumbuhan engagement
- **Manfaat**: Mengukur efektivitas kampanye secara keseluruhan

**Catatan**: Semua metrics menampilkan:

- Angka besar (nilai utama)
- Trend arrow (naik/turun)
- Persentase growth (hijau untuk positif, merah untuk negatif)
- Label "vs last month"

### 2. **Engagement Chart**

- **Fungsi**: Visualisasi grafik engagement dari waktu ke waktu
- **Jenis**: Line chart atau area chart
- **Data**: Menampilkan trend engagement harian/mingguan
- **Manfaat**: Melihat pola performa kampanye

### 3. **Leaderboard**

- **Fungsi**: Menampilkan ranking influencer berdasarkan performa
- **Informasi**:
  - Nama influencer
  - Total engagement
  - Jumlah posting
  - Rating/score
- **Manfaat**: Identifikasi top performers

---

## Menu Campaign

Menu Campaign mengelola seluruh lifecycle kampanye marketing dari pembuatan hingga monitoring hasil.

### Navigasi Campaign

Terdapat 2 sub-menu:

1. **All Campaigns** - List semua kampanye
2. **Posts** - Monitoring posting influencer

---

### **A. All Campaigns**

Halaman ini menampilkan daftar semua kampanye yang pernah dibuat.

#### **Status Filter Cards**

Terdapat 4 kartu filter status kampanye:

**1. Draft** (Border Abu-abu, Icon Kuning)

- **Fungsi**: Kampanye yang masih dalam tahap penyusunan
- **Status**: Belum dipublikasi
- **Action**: Bisa diedit atau dihapus
- **Jumlah**: Ditampilkan di card

**2. Upcoming** (Border Abu-abu, Icon Biru)

- **Fungsi**: Kampanye yang sudah dijadwalkan tapi belum dimulai
- **Status**: Menunggu start_date
- **Action**: Bisa diedit atau dibatalkan
- **Jumlah**: Ditampilkan di card

**3. Active** (Border CYAN - Menonjol, Icon Hijau)

- **Fungsi**: Kampanye yang sedang berjalan
- **Status**: Sudah dimulai, belum berakhir
- **Action**: Monitoring real-time, bisa menambah influencer
- **Jumlah**: Ditampilkan di card
- **Visual**: **Border cyan tebal** untuk mudah teridentifikasi

**4. Expired** (Border Abu-abu, Icon Merah)

- **Fungsi**: Kampanye yang sudah selesai
- **Status**: Melewati end_date
- **Action**: Read-only, bisa dilihat untuk analisis
- **Jumlah**: Ditampilkan di card

**Cara Menggunakan Filter**:

- Klik salah satu card status
- Tabel campaign akan filter otomatis
- Card yang diklik akan mendapat **ring biru** (highlight)
- Klik lagi untuk reset filter

#### **Tabel Campaign**

Menampilkan list campaign dengan kolom:

| Kolom             | Fungsi             | Informasi                                    |
| ----------------- | ------------------ | -------------------------------------------- |
| **Image**         | Thumbnail kampanye | Preview visual (ratio 19:9 landscape)        |
| **Campaign Name** | Nama kampanye      | Judul utama campaign                         |
| **Product**       | Nama produk        | Produk yang dipromosikan                     |
| **Duration**      | Periode kampanye   | Format: "DD MMM YYYY - DD MMM YYYY"          |
| **Status**        | Status badge       | Draft/Upcoming/Active/Expired (dengan warna) |
| **Influencers**   | Jumlah influencer  | Total invited influencers                    |
| **Posts**         | Jumlah posting     | Approved posts count                         |
| **Actions**       | Tombol aksi        | View/Edit/Delete                             |

**Fitur Search & Sort**:

- Search bar: Cari berdasarkan nama campaign atau produk
- Sort dropdown: Newest/Oldest/By status
- Date range filter: Filter by start_date atau live_post_date

#### **Create New Campaign**

Klik tombol **"+ Create Campaign"** untuk membuat kampanye baru.

**Form Campaign terdiri dari 8 section:**

---

**1. Basic Information**

| Field         | Required | Fungsi          | Contoh                         |
| ------------- | -------- | --------------- | ------------------------------ |
| Campaign Name | ✅       | Nama kampanye   | "Promo Ramadan 2025"           |
| Product Name  | ✅       | Nama produk     | "Hijab Premium Collection"     |
| Campaign Goal | ✅       | Tujuan kampanye | "Meningkatkan awareness brand" |
| Status        | ✅       | Status awal     | Draft/Upcoming/Active          |

**AI Generate Button** 🤖:

- **Lokasi**: Di samping Campaign Goal
- **Fungsi**: Generate otomatis campaign brief menggunakan AI
- **Input Required**: Campaign Name, Product Name, Campaign Goal harus diisi
- **Output**:
  - Description (refined goal)
  - KPI Target
  - Key Messages
  - Mandatory Hashtags
  - Mandatory CTA
  - Rules
  - Platform Deliverables
  - Target Metrics (reach, engagement, impressions)
  - Bonus Multiplier
- **Cara Pakai**:
  1. Isi 3 field required
  2. Klik tombol "Generate with AI"
  3. Tunggu loading (~ 5-10 detik)
  4. Field lain akan terisi otomatis
  5. Review dan edit sesuai kebutuhan

---

**2. Campaign Image**

**Upload Image**:

- **Format**: JPG, PNG, WebP
- **Max Size**: 2MB
- **Aspect Ratio Toggle**:
  - **Landscape (19:9)** - Default, untuk banner horizontal
  - **Portrait (9:19)** - Untuk story/feed vertical
- **Max Width**:
  - Landscape: 800px
  - Portrait: 360px
- **Preview**: Real-time preview saat upload
- **Remove**: Klik X untuk hapus gambar

**Cara Upload**:

1. Klik area "Click to upload or drag and drop"
2. Pilih file dari komputer
3. Preview akan muncul otomatis
4. Toggle portrait/landscape sesuai kebutuhan

---

**3. Campaign Duration**

| Field      | Required | Format           | Fungsi                  |
| ---------- | -------- | ---------------- | ----------------------- |
| Start Date | ✅       | YYYY-MM-DD HH:mm | Kapan campaign mulai    |
| End Date   | ✅       | YYYY-MM-DD HH:mm | Kapan campaign berakhir |

**Validasi**:

- End date harus setelah start date
- Datetime picker dengan timezone local
- Otomatis set status "Upcoming" jika start date > now

---

**4. Goals & KPI**

**KPI Target** ✅ (Required):

- **Fungsi**: Target pencapaian utama
- **Format**: Free text
- **Contoh**: "100K impressions, 5K engagements, 500 sales"
- **Manfaat**: Measurement success metrics

**Target Metrics** (Optional tapi recommended):

| Field                  | Satuan      | Fungsi           | Contoh |
| ---------------------- | ----------- | ---------------- | ------ |
| Target Reach           | Number      | Jangkauan unik   | 500000 |
| Target Engagement      | Number      | Total interaksi  | 25000  |
| Target Engagement Rate | % (decimal) | Rasio engagement | 5.0    |
| Target Impressions     | Number      | Total tampilan   | 750000 |

**Bonus Multiplier**:

- **Fungsi**: Pengali bonus jika target terlampaui
- **Format**: Decimal (contoh: 1.5)
- **Default**: 1.0
- **Manfaat**: Incentive untuk influencer
- **Helper Text**: "Multiplier for bonus calculation when targets are exceeded"

**Cara Kerja Bonus**:

```
Jika Actual Engagement > Target Engagement
Bonus = (Actual - Target) × Bonus Multiplier × Base Rate
```

---

**5. Key Messages**

**Fungsi**: Pesan utama yang harus disampaikan influencer dalam konten.

**Cara Menambah**:

1. Ketik pesan di input field
2. Tekan "Enter" atau klik tombol "+ Add"
3. Pesan muncul sebagai chips/tag
4. Klik "X" untuk hapus pesan tertentu

**Contoh Key Messages**:

- "Produk halal dan berkualitas tinggi"
- "Cocok untuk segala usia"
- "Free shipping untuk pembelian minimal 200K"
- "Limited edition hanya bulan ini"

**Best Practice**:

- Maksimal 5-7 key messages
- Singkat dan jelas (1 kalimat)
- Fokus pada unique selling point

---

**6. Hashtags & CTA**

**Mandatory Hashtags**:

- **Fungsi**: Hashtag wajib yang harus ada di setiap posting
- **Format**: Otomatis tambah "#" jika belum ada
- **Input**: Ketik dan enter, atau pisahkan dengan koma
- **Contoh**: #PromoRamadan, #HijabPremium, #SyahDigital

**Cara Menambah**:

1. Ketik hashtag (dengan/tanpa #)
2. Tekan Enter atau koma
3. Hashtag muncul sebagai chips
4. Klik X untuk hapus

**Mandatory CTA**:

- **Fungsi**: Call-to-action wajib di caption
- **Format**: Free text
- **Contoh**:
  - "Swipe up untuk belanja!"
  - "Link di bio ya!"
  - "Kode promo: RAMADAN25"
  - "DM untuk order sekarang!"

---

**7. Platform Deliverables**

**Fungsi**: Menentukan jenis konten yang harus diproduksi per platform.

**Add Deliverable**:
Klik tombol "+ Add Deliverable" untuk menambah requirement.

**Form Deliverable**:

| Field          | Options/Format              | Fungsi                  |
| -------------- | --------------------------- | ----------------------- |
| Platform       | Instagram / TikTok          | Pilih platform          |
| Content Format | Feed/Story/Reels/Video/Live | Jenis konten            |
| Quantity       | Number                      | Berapa posting          |
| Min Duration   | Seconds                     | Durasi minimal (video)  |
| Max Duration   | Seconds                     | Durasi maksimal (video) |
| Notes          | Text                        | Catatan tambahan        |

**Contoh Deliverable**:

1. Instagram Reels - 2 video - 30-60 detik
2. Instagram Feed - 3 post - Notes: "Gunakan template brand"
3. TikTok Video - 5 video - 15-30 detik
4. Instagram Story - 10 story - Notes: "Highlight promo"

**Actions**:

- **Edit**: Klik icon pensil
- **Delete**: Klik icon trash
- **Reorder**: Drag & drop (jika ada)

---

**8. Categories**

**Fungsi**: Kategorisasi campaign untuk filtering dan reporting.

**Cara Memilih**:

1. Centang checkbox kategori yang sesuai
2. Bisa multi-select
3. Loading state saat fetch kategori

**Contoh Kategori**:

- Fashion & Beauty
- Food & Beverage
- Technology
- Lifestyle
- Health & Fitness
- Travel
- Education

**Manfaat**:

- Filter campaign by category
- Analytics per kategori
- Rekomendasi influencer sesuai kategori

---

**9. Description & Rules**

**Description**:

- **Fungsi**: Deskripsi detail kampanye
- **Format**: Textarea, support line break
- **Auto-fill**: Terisi otomatis dari AI generate
- **Manfaat**: Penjelasan lengkap untuk influencer

**Rules**:

- **Fungsi**: Aturan dan ketentuan kampanye
- **Format**: Textarea, support line break
- **Contoh**:
  - "Wajib mention akun @brandofficial"
  - "Tidak boleh endorse kompetitor bersamaan"
  - "Posting sesuai jadwal yang ditentukan"
  - "Laporan insights wajib diserahkan"

---

**10. Compensation Type**

| Option    | Fungsi                  | Contoh                     |
| --------- | ----------------------- | -------------------------- |
| Paid      | Bayar dengan uang       | "Rp 5.000.000 per posting" |
| Barter    | Tukar dengan produk     | "1 set produk senilai 2jt" |
| Hybrid    | Kombinasi paid + barter | "Rp 2jt + produk"          |
| Affiliate | Komisi per sales        | "10% per transaksi"        |

**Content Usage Rights**:

- **Checkbox**: Apakah brand boleh repost konten?
- **Default**: False
- **Jika True**: Konten bisa digunakan untuk iklan/marketing brand

---

**Button Actions**:

**Save as Draft**:

- Simpan tanpa publish
- Status: Draft
- Bisa edit kapan saja

**Publish Campaign**:

- Publish langsung
- Status: Upcoming (jika start_date > now) atau Active
- Influencer bisa lihat dan daftar

**Cancel**:

- Batalkan pembuatan
- Redirect ke list campaign
- Data tidak tersimpan

---

#### **View Campaign Detail**

Klik campaign dari list untuk melihat detail lengkap.

**Informasi Ditampilkan**:

1. **Header Section**:

   - Campaign image (besar)
   - Campaign name
   - Product name
   - Status badge
   - Edit & Delete button

2. **Overview Section**:

   - Start date & End date
   - Duration (berapa hari)
   - Status timeline visual

3. **Campaign Info**:

   - Campaign Goal
   - Description
   - KPI Target
   - Target Metrics (reach, engagement, rate, impressions)
   - Bonus Multiplier

4. **Content Requirements**:

   - Key Messages (list)
   - Mandatory Hashtags (chips)
   - Mandatory CTA
   - Rules

5. **Platform Deliverables Table**:

   - Platform name
   - Content format
   - Quantity
   - Duration range
   - Notes

6. **Influencers Section**:

   - List invited influencers
   - Status (invited/accepted/rejected)
   - Contact info

7. **Posts Section** (Tabel Posting):

**Kolom Posts**:

| Kolom           | Informasi                                  | Visual               |
| --------------- | ------------------------------------------ | -------------------- |
| **Influencer**  | Avatar + Icon Platform + Username + Name   | Avatar 8x8, icon 4x4 |
| **Post**        | Thumbnail (16x16) + Caption + Timestamp    | Clickable thumbnail  |
| **Performance** | Like, Comment, View, Play, Engagement Rate | Icons + angka        |
| **Status**      | Pending/Approved/Rejected                  | Badge berwarna       |

**Fitur Posts Table**:

**Avatar Platform**:

- Instagram: `instagram_avatar_url` (jika platform = instagram)
- TikTok: `tiktok_avatar_url` (jika platform = tiktok)
- Posisi: Kiri icon platform
- Style: Rounded full, border + ring, 8x8

**Post Thumbnail**:

- Clickable link ke post asli
- Hover: Overlay play icon
- Error handling: Fallback ke placeholder

**Caption**:

- Truncate 30 karakter
- Button "Selengkapnya" untuk expand
- Button "Sembunyikan" untuk collapse

**Timestamp**:

- Relative time dalam Bahasa Indonesia
- Format: "X detik/menit/jam/hari/minggu/bulan/tahun yang lalu"

**Performance Metrics**:

- Row 1: Like (❤️) + Comment (💬) + View (👁️)
- Row 2: Play (▶️) + Engagement Rate (📈)
- Format angka: K untuk ribuan, M untuk jutaan
- Null handling: Tampilkan "0" jika null

**Status Badge**:

- **Pending**: Kuning
- **Approved**: Hijau
- **Rejected**: Merah

---

#### **Edit Campaign**

Klik tombol "Edit" di detail campaign atau di tabel.

**Fitur**:

- Form sama dengan Create Campaign
- Data pre-filled dari campaign existing
- AI Generate tetap bisa digunakan (override data)
- Image preview existing image
- Categories auto-selected

**Validasi**:

- Tidak bisa ubah start_date jika campaign sudah active
- Warning jika ada influencer sudah posting

---

#### **Delete Campaign**

Klik tombol "Delete" (icon trash).

**Konfirmasi Dialog**:

- Title: "Confirm Delete"
- Message: "Are you sure you want to delete this campaign? This action cannot be undone."
- Buttons: "Cancel" / "Delete"

**Kondisi Delete**:

- ✅ Allowed: Draft, Upcoming (tanpa posting)
- ❌ Blocked: Active campaign dengan posting
- ⚠️ Warning: Upcoming campaign dengan influencer invited

---

### **B. Posts (Monitoring & Approval)**

Halaman untuk monitoring dan meng-approve posting dari influencer.

#### **Filter Section**

**5 Filter tersedia**:

| Filter          | Options                       | Fungsi                                      |
| --------------- | ----------------------------- | ------------------------------------------- |
| Campaign        | Dropdown list                 | Filter by campaign (hanya active campaigns) |
| Influencer Name | Text input                    | Search by influencer name                   |
| Status          | Pending/Approved/Rejected/All | Filter by approval status                   |
| Platform        | Instagram/TikTok/All          | Filter by platform                          |
| Clear Filters   | Button                        | Reset semua filter                          |

**Cara Menggunakan**:

1. Pilih filter yang diinginkan
2. Tabel otomatis update
3. Kombinasi filter supported
4. Klik "Clear Filters" untuk reset

---

#### **Posts Table**

**Kolom Table**:

| Kolom             | Informasi                                | Aksi                    |
| ----------------- | ---------------------------------------- | ----------------------- |
| **Campaign Info** | Thumbnail campaign + Nama campaign       | Visual reference        |
| **Influencer**    | Avatar + Platform icon + Username + Name | Identifikasi influencer |
| **Post**          | Thumbnail + Caption + Posted time        | Preview konten          |
| **Performance**   | Like, Comment, View, Play, ER            | Real-time metrics       |
| **Status**        | Badge status                             | Visual status           |
| **Action**        | Dropdown approval                        | Change status           |

**Detail Kolom**:

**1. Campaign Info**:

- Campaign image (12x12)
- Campaign name
- Campaign ID (small text)

**2. Influencer**:

- **Avatar**:
  - `instagram_avatar_url` untuk Instagram
  - `tiktok_avatar_url` untuk TikTok
  - Posisi: Kiri icon platform
  - Size: 8x8, rounded full, border + ring
- **Platform Icon**: Instagram (pink) atau TikTok (black/white adaptive)
- **Username**: @username (dari platform)
- **Name**: Nama lengkap influencer

**3. Post**:

- **Thumbnail**:
  - Size: 16x16
  - Clickable ke `post_url` (external link)
  - Hover: Overlay play button
- **Caption**:
  - Truncate 30 karakter
  - Expandable: "Selengkapnya" / "Sembunyikan"
- **Posted Time**:
  - Relative time: "X jam/hari yang lalu"
  - Bahasa Indonesia

**4. Performance**:

- **Row 1**:
  - ❤️ Like count
  - 💬 Comment count
  - 👁️ Reach/View count
- **Row 2**:
  - ▶️ Play count (video)
  - 📈 Engagement Rate (%) - 2 decimal

**Format Angka**:

- < 1000: Tampilkan angka penuh
- > = 1000: 1.5K
- > = 1000000: 2.3M

**Null Handling**:

- Jika null: Tampilkan "0" atau "0.00%"

**5. Status**:

- **Pending**: 🟡 Yellow badge
- **Approved**: 🟢 Green badge
- **Rejected**: 🔴 Red badge

**6. Action Dropdown**:

- **Options**:
  - Pending (default)
  - Approve
  - Reject
- **Konfirmasi**: Dialog confirm sebelum update
- **Loading**: Spinner saat proses
- **Success**: Notification + refresh table
- **Error**: Error message dari API

---

#### **Approval Workflow**

**1. Review Post**:

- Klik thumbnail untuk buka post asli
- Cek konten sesuai guideline
- Cek mandatory hashtags & CTA
- Cek performance awal

**2. Approve Post**:

- Pilih "Approve" di dropdown
- Konfirmasi dialog muncul
- Klik "Approve" untuk konfirmasi
- Status berubah jadi hijau
- Notification: "Post status has been changed to approved"

**3. Reject Post**:

- Pilih "Reject" di dropdown
- Konfirmasi dialog muncul
- Klik "Reject" untuk konfirmasi
- Status berubah jadi merah
- Notification: "Post status has been changed to rejected"
- _Note_: Influencer akan notified untuk revision

**4. Back to Pending**:

- Bisa change approved/rejected kembali ke pending
- Useful untuk review ulang

---

#### **Pagination**

**Fitur**:

- Showing: "Showing X to Y of Z posts"
- Page navigation: Previous / Next
- Current page indicator: "Page X of Y"
- Per page: 10 posts (fixed)

**Disabled State**:

- Previous disabled di page 1
- Next disabled di last page

---

## Menu Influencer

Menu untuk mengelola database influencer dan kategori mereka.

### Navigasi Influencer

Terdapat 2 sub-menu:

1. **Directory** - Database influencer
2. **Categories** - Kategori influencer

---

### **A. Directory (Database Influencer)**

Halaman menampilkan seluruh influencer yang terdaftar di sistem.

#### **Influencer Table**

**Kolom Table**:

| Kolom          | Informasi                      | Fungsi            |
| -------------- | ------------------------------ | ----------------- |
| **Influencer** | Stacked Avatars + Name + Email | Identitas lengkap |
| **Instagram**  | Icon + Username                | Akun Instagram    |
| **TikTok**     | Icon + Username                | Akun TikTok       |
| **Categories** | Chips kategori                 | Spesialisasi      |
| **Actions**    | View/Edit/Delete               | Aksi admin        |

**Detail Kolom**:

**1. Influencer Column**:

- **Stacked Avatar Group**:
  - Instagram avatar (`instagram_avatar_url`)
  - TikTok avatar (`tiktok_avatar_url`)
  - Overlapping dengan `-space-x-2`
  - Border white + ring slate
  - Size: 8x8 each
- **Name**: Nama lengkap (bold)
- **Email**: Email influencer (small text)

**2. Instagram Column**:

- **Icon**: Instagram pink gradient
- **Username**: @username
- **Clickable**: Link ke profile Instagram

**3. TikTok Column**:

- **Icon**: TikTok (black dark mode, white light mode)
- **Username**: @username
- **Display Name**: Secondary text
- **Clickable**: Link ke profile TikTok

**4. Categories**:

- **Format**: Chips/badges
- **Max Display**: 3 kategori + "..." if more
- **Colors**: Random/assigned per kategori

**5. Actions**:

- **View**: 👁️ Icon - Lihat detail
- **Edit**: ✏️ Icon - Edit data
- **Delete**: 🗑️ Icon - Hapus influencer

---

#### **Create New Influencer**

Klik tombol **"+ Add Influencer"**.

**Form Fields**:

**Personal Info**:
| Field | Required | Format | Contoh |
|-------|----------|--------|--------|
| Name | ✅ | Text | "Rina Beautyguru" |
| Email | ✅ | Email | "rina@gmail.com" |
| Phone | ❌ | Number | "081234567890" |

**Instagram Account**:
| Field | Required | Format |
|-------|----------|--------|
| Username | ❌ | @username | "@rinabeauty" |
| Avatar URL | ❌ | URL/Upload | Profile photo |
| Follower Count | ❌ | Number | "150000" |
| Avg Engagement Rate | ❌ | Percentage | "4.5" |

**TikTok Account**:
| Field | Required | Format |
|-------|----------|--------|
| Username | ❌ | @username | "@rinabeautyy" |
| Display Name | ❌ | Text | "Rina Beauty" |
| Avatar URL | ❌ | URL/Upload | Profile photo |
| Follower Count | ❌ | Number | "250000" |
| Avg Engagement Rate | ❌ | Percentage | "6.2" |

**Categories**:

- Multi-select checkbox
- Pilih minimal 1 kategori
- Bisa pilih beberapa

**Notes**:

- Textarea untuk catatan internal
- Optional
- Tidak terlihat oleh influencer

**Button Actions**:

- **Save**: Simpan influencer baru
- **Cancel**: Batalkan dan kembali ke list

---

#### **View Influencer Detail**

Klik icon View (👁️) untuk melihat detail.

**Informasi Ditampilkan**:

**1. Profile Header**:

- Stacked avatars (besar)
- Name
- Email
- Phone

**2. Instagram Stats**:

- Username dengan link
- Follower count (formatted)
- Average engagement rate
- Total posts collaborated

**3. TikTok Stats**:

- Username dengan link
- Display name
- Follower count (formatted)
- Average engagement rate
- Total videos collaborated

**4. Categories**:

- All assigned categories
- Badge format

**5. Performance History**:

- Tabel campaign yang pernah diikuti
- Total posts
- Total engagement
- Average ER per campaign

**6. Recent Posts**:

- Gallery posting terakhir
- Platform icon
- Performance metrics quick view

---

#### **Edit Influencer**

Klik icon Edit (✏️).

**Fitur**:

- Form sama dengan Create
- Data pre-filled
- Bisa update avatar (upload baru)
- Follower count manual update

**Use Case**:

- Update contact info
- Update stats (follower, ER)
- Add/remove categories
- Update notes

---

#### **Delete Influencer**

Klik icon Delete (🗑️).

**Confirmation Dialog**:

- Title: "Delete Influencer?"
- Message: Warning jika ada campaign aktif
- Buttons: Cancel / Delete

**Kondisi**:

- ✅ Allowed: Tidak ada campaign aktif
- ❌ Blocked: Ada campaign aktif dengan pending posts
- ⚠️ Warning: Ada campaign history (archive instead)

---

### **B. Categories (Kategori Influencer)**

Halaman untuk mengelola kategori/niche influencer.

#### **Category Table**

**Kolom**:
| Kolom | Informasi |
|-------|-----------|
| Name | Nama kategori |
| Description | Deskripsi kategori |
| Influencer Count | Jumlah influencer |
| Actions | Edit/Delete |

**Contoh Kategori**:

- Fashion & Beauty - 45 influencers
- Food & Beverage - 23 influencers
- Technology - 12 influencers
- Lifestyle - 67 influencers
- Travel - 18 influencers

---

#### **Create Category**

Klik **"+ Add Category"**.

**Form**:
| Field | Required | Fungsi |
|-------|----------|--------|
| Name | ✅ | Nama kategori |
| Description | ❌ | Penjelasan kategori |
| Icon | ❌ | Icon/emoji kategori |

**Validasi**:

- Name unique (tidak boleh duplicate)
- Auto-capitalize first letter

---

#### **Edit Category**

Update nama atau deskripsi kategori.

**Note**:

- Jika ada influencer menggunakan kategori, perubahan akan reflected otomatis
- Tidak bisa hapus kategori yang sedang dipakai

---

#### **Delete Category**

**Kondisi**:

- ✅ Allowed: Kategori tidak dipakai influencer
- ❌ Blocked: Kategori masih dipakai
- **Alternative**: Archive category (hide from selection)

---

## Pengaturan & Logout

### **Theme Toggle**

**Lokasi**: Header (top right)

**Fungsi**: Switch antara Light Mode dan Dark Mode

**Icon**:

- Light mode: ☀️ Sun icon
- Dark mode: 🌙 Moon icon

**Behavior**:

- Click toggle langsung switch
- Preference tersimpan di localStorage
- Apply ke seluruh aplikasi

---

### **User Dropdown**

**Lokasi**: Header (top right, sebelah theme toggle)

**Info Ditampilkan**:

- Avatar user (jika ada)
- Name
- Email
- Role (Admin)

**Menu Options**:

- **Profile**: Lihat/edit profile
- **Settings**: Pengaturan aplikasi
- **Logout**: Keluar dari sistem

---

### **Logout**

**2 Cara Logout**:

**1. Via User Dropdown**:

- Klik avatar/name di header
- Pilih "Logout"
- Confirmation dialog muncul

**2. Via Sidebar Footer**:

- Klik menu "Logout" di sidebar bawah
- Confirmation dialog muncul

**Confirmation Dialog**:

- Title: "Confirm Logout"
- Message: "Are you sure you want to logout?"
- Buttons:
  - "Cancel" - Batalkan logout
  - "Logout" - Konfirmasi logout
- Loading state saat proses

**After Logout**:

- Session cleared
- Token removed
- Redirect ke login page
- Success notification: "You have been logged out"

---

## Tips & Best Practices

### **Campaign Management**

1. ✅ Gunakan AI Generate untuk quick start
2. ✅ Review dan edit hasil AI sesuai kebutuhan
3. ✅ Set target metrics realistis
4. ✅ Upload image campaign dengan ratio yang sesuai
5. ✅ Clear dan spesifik di KPI Target
6. ✅ Maksimal 5-7 key messages
7. ✅ Test hashtags sebelum mandatory
8. ✅ Set bonus multiplier untuk motivasi influencer

### **Influencer Management**

1. ✅ Update follower count secara berkala
2. ✅ Track engagement rate per campaign
3. ✅ Assign kategori yang tepat
4. ✅ Maintain stacked avatars (upload kedua platform)
5. ✅ Notes internal untuk tracking performance

### **Post Approval**

1. ✅ Review post dalam 24 jam
2. ✅ Klik thumbnail untuk lihat post asli
3. ✅ Check mandatory hashtags & CTA
4. ✅ Approve jika sudah sesuai guideline
5. ✅ Reject dengan alasan jelas (via comment/DM)
6. ✅ Monitor performance metrics real-time

### **Dashboard Monitoring**

1. ✅ Check daily untuk pending posts
2. ✅ Monitor active campaigns progress
3. ✅ Review engagement trends
4. ✅ Identify top performing influencers
5. ✅ Export reports untuk stakeholder

---

## Troubleshooting

### **Login Issues**

- **Problem**: Tidak bisa login
- **Solution**:
  - Check email & password
  - Clear browser cache
  - Contact admin untuk reset password

### **Image Upload Failed**

- **Problem**: Image tidak ter-upload
- **Solution**:
  - Check file size (max 2MB)
  - Check format (JPG/PNG/WebP)
  - Compress image jika terlalu besar
  - Try different browser

### **AI Generate Tidak Bekerja**

- **Problem**: AI generate error/loading lama
- **Solution**:
  - Check internet connection
  - Pastikan 3 field required terisi
  - Refresh page dan try again
  - Check API quota/limits

### **Performance Metrics Null**

- **Problem**: Like/comment count tampil 0
- **Solution**:
  - Wait 24 jam setelah post (API sync delay)
  - Manual refresh di detail page
  - Check post visibility (public/private)
  - Verify influencer connected account

### **Filter Tidak Bekerja**

- **Problem**: Filter campaign/post tidak apply
- **Solution**:
  - Click "Clear Filters" dulu
  - Try filter satu-satu
  - Refresh page
  - Check browser console untuk error

---

## Keyboard Shortcuts

| Shortcut       | Fungsi                        |
| -------------- | ----------------------------- |
| `Ctrl/Cmd + K` | Open search                   |
| `Ctrl/Cmd + ,` | Open settings                 |
| `Esc`          | Close modal/dialog            |
| `Enter`        | Submit form (focus di button) |
| `Tab`          | Navigate form fields          |

---

## Mobile Responsive

Sistem fully responsive untuk desktop, tablet, dan mobile.

**Breakpoints**:

- Desktop: >= 1024px
- Tablet: 768px - 1023px
- Mobile: < 768px

**Mobile Features**:

- Hamburger menu sidebar
- Touch-friendly buttons
- Swipeable cards
- Bottom navigation
- Optimized table (horizontal scroll)

---

## FAQ

**Q: Apakah bisa bulk approve posts?**
A: Saat ini belum support. Approve harus satu-satu untuk quality control.

**Q: Berapa lama AI generate bekerja?**
A: Rata-rata 5-10 detik, tergantung kompleksitas input.

**Q: Apakah bisa export data campaign?**
A: Ya, akan ada fitur export to CSV/Excel (coming soon).

**Q: Apakah influencer bisa lihat dashboard ini?**
A: Tidak. Ini dashboard khusus admin. Influencer punya app terpisah.

**Q: Bagaimana jika influencer tidak posting?**
A: Sistem akan kirim reminder otomatis. Admin bisa manual follow up via contact info.

**Q: Apakah performance metrics real-time?**
A: Hampir real-time. Sync dari Instagram/TikTok API setiap 1-6 jam.

---

## Support & Contact

Jika ada pertanyaan atau issue, hubungi:

📧 **Email**: support@syahdigital.com
💬 **WhatsApp**: +62 812-3456-7890
🌐 **Website**: www.syahdigital.com

**Operating Hours**:
Senin - Jumat: 09:00 - 18:00 WIB
Sabtu: 09:00 - 13:00 WIB

---

**Document Version**: 1.0.0
**Last Updated**: 3 Desember 2025
**Created by**: AI Assistant & Development Team
