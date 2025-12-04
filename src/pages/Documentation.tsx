import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useState } from "react";

export default function Documentation() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("documentation-content");
    if (!element) return;

    try {
      setIsGeneratingPDF(true);

      // Capture the element as canvas with html2canvas-pro (supports oklch)
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: false,
      });

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      // Add image to PDF
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save("Panduan_Pengguna_Influencer_Campaign_Management.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  return (
    <div>
      <PageMeta
        title="Dokumentasi Sistem | Influencer Campaign Management"
        description="Panduan lengkap penggunaan sistem manajemen kampanye influencer"
      />
      <PageBreadcrumb pageTitle="Dokumentasi" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-6 xl:px-10 xl:py-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
              {isGeneratingPDF ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div id="documentation-content" className="documentation-content">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Panduan Pengguna - Influencer Campaign Management System
              </h1>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Daftar Isi
              </h2>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">
                  <a href="#pengenalan-sistem" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Pengenalan Sistem
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#login-autentikasi" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Login & Autentikasi
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#dashboard" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Dashboard
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#menu-campaign" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Menu Campaign
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#menu-influencer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Menu Influencer
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#pengaturan-logout" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Pengaturan & Logout
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#sistem-penghitungan" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Sistem Penghitungan Engagement Rate & Performance Score
                  </a>
                </li>
              </ol>

              <hr className="my-8 border-gray-200 dark:border-gray-700" />

              <h2
                id="pengenalan-sistem"
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Pengenalan Sistem
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Sistem Influencer Campaign Management adalah platform berbasis web yang dirancang untuk memudahkan admin
                dalam mengelola kampanye marketing dengan influencer. Sistem ini menyediakan fitur lengkap mulai dari
                pembuatan kampanye, pengelolaan influencer, hingga monitoring performa posting konten.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Fitur Utama</h3>
              <ul className="list-disc ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">✅ Manajemen Kampanye dengan AI Assistant</li>
                <li className="mb-2">✅ Database Influencer (Instagram & TikTok)</li>
                <li className="mb-2">✅ Monitoring & Approval Post</li>
                <li className="mb-2">✅ Real-time Analytics & Metrics</li>
                <li className="mb-2">✅ Dark Mode Support</li>
              </ul>

              <hr className="my-8 border-gray-200 dark:border-gray-700" />

              <h2
                id="login-autentikasi"
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Login & Autentikasi
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Cara Login</h3>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Buka halaman login sistem</li>
                <li className="mb-2">
                  Masukkan <strong className="font-semibold text-gray-900 dark:text-white">Email</strong> dan{" "}
                  <strong className="font-semibold text-gray-900 dark:text-white">Password</strong>
                </li>
                <li className="mb-2">
                  Klik tombol <strong className="font-semibold text-gray-900 dark:text-white">"Sign In"</strong>
                </li>
                <li className="mb-2">Sistem akan memvalidasi kredensial dan redirect ke Dashboard</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Fitur Keamanan</h3>
              <ul className="list-disc ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Session-based authentication</li>
                <li className="mb-2">Token JWT untuk API requests</li>
                <li className="mb-2">Auto-logout setelah session expired</li>
                <li className="mb-2">Password encryption</li>
              </ul>

              <hr className="my-8 border-gray-200 dark:border-gray-700" />

              <h2
                id="dashboard"
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Dashboard
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Dashboard adalah halaman utama yang menampilkan ringkasan seluruh aktivitas kampanye dan performa
                sistem.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                1. Metrics Cards (Kartu Statistik)
              </h3>

              {/* Screenshot Dashboard */}
              <div className="my-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📸</span> Screenshot Dashboard
                </h4>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                  <img
                    src="/images/screenshot/dashboard.png"
                    alt="Dashboard Screenshot - Metrics Cards dan Analytics"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic text-center">
                  Tampilan Dashboard dengan 5 Metrics Cards, Engagement Chart, dan Leaderboard
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Terdapat 5 kartu statistik utama di bagian atas dashboard:
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Total Influencers</h4>
                  <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>
                      <strong>Fungsi:</strong> Menampilkan jumlah total influencer yang terdaftar dalam sistem
                    </li>
                    <li>
                      <strong>Icon:</strong> Users (biru)
                    </li>
                    <li>
                      <strong>Growth Indicator:</strong> Menampilkan pertumbuhan jumlah influencer dibanding periode
                      sebelumnya
                    </li>
                    <li>
                      <strong>Format:</strong> Angka + persentase pertumbuhan (contoh: +100%)
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Active Campaigns</h4>
                  <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>
                      <strong>Fungsi:</strong> Menampilkan jumlah kampanye yang sedang berjalan
                    </li>
                    <li>
                      <strong>Icon:</strong> Lightning (ungu)
                    </li>
                    <li>
                      <strong>Growth Indicator:</strong> Pertumbuhan kampanye aktif
                    </li>
                    <li>
                      <strong>Manfaat:</strong> Monitoring beban kerja aktif tim
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pending Posts</h4>
                  <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>
                      <strong>Fungsi:</strong> Jumlah posting yang menunggu approval
                    </li>
                    <li>
                      <strong>Icon:</strong> Clock (orange)
                    </li>
                    <li>
                      <strong>Growth Indicator:</strong> Perubahan jumlah pending posts
                    </li>
                    <li>
                      <strong>Action Required:</strong> Segera review jika angka tinggi
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Total Campaigns</h4>
                  <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>
                      <strong>Fungsi:</strong> Total seluruh kampanye (draft + upcoming + active + expired)
                    </li>
                    <li>
                      <strong>Icon:</strong> Briefcase (hijau)
                    </li>
                    <li>
                      <strong>Growth Indicator:</strong> Pertumbuhan total kampanye
                    </li>
                    <li>
                      <strong>Manfaat:</strong> Melihat produktivitas pembuatan kampanye
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Total Engagement</h4>
                  <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>
                      <strong>Fungsi:</strong> Total engagement dari seluruh posting kampanye
                    </li>
                    <li>
                      <strong>Icon:</strong> Heart (pink)
                    </li>
                    <li>
                      <strong>Growth Indicator:</strong> Pertumbuhan engagement
                    </li>
                    <li>
                      <strong>Manfaat:</strong> Mengukur efektivitas kampanye secara keseluruhan
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong className="font-semibold text-gray-900 dark:text-white">Catatan:</strong> Semua metrics
                menampilkan:
              </p>
              <ul className="list-disc ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Angka besar (nilai utama)</li>
                <li className="mb-2">Trend arrow (naik/turun)</li>
                <li className="mb-2">Persentase growth (hijau untuk positif, merah untuk negatif)</li>
                <li className="mb-2">Label "vs last month"</li>
              </ul>

              <hr className="my-8 border-gray-200 dark:border-gray-700" />

              <h2
                id="menu-campaign"
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Menu Campaign
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Menu Campaign mengelola seluruh lifecycle kampanye marketing dari pembuatan hingga monitoring hasil.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Navigasi Campaign</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Terdapat 2 sub-menu:</p>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">
                  <strong>All Campaigns</strong> - List semua kampanye
                </li>
                <li className="mb-2">
                  <strong>Posts</strong> - Monitoring posting influencer
                </li>
              </ol>

              {/* Screenshot Table Campaign */}
              <div className="my-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📸</span> Screenshot: Table Campaign List
                </h4>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                  <img
                    src="/images/screenshot/tableCampaign.png"
                    alt="Table Campaign - List semua campaign dengan status dan metrics"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded border border-green-200 dark:border-green-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong className="text-gray-900 dark:text-white">💡 Penjelasan Kolom Influencer/Post:</strong>
                  </p>
                  <ul className="list-disc ml-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>
                      <strong className="text-gray-900 dark:text-white">Format: "X/Y"</strong>
                    </li>
                    <li>
                      <strong className="text-blue-600 dark:text-blue-400">X</strong> = Jumlah influencer yang di-invite
                      ke campaign
                    </li>
                    <li>
                      <strong className="text-green-600 dark:text-green-400">Y</strong> = Jumlah influencer yang sudah
                      submit post
                    </li>
                    <li>
                      Contoh: <strong className="font-mono">2/1</strong> → 2 influencer diundang, 1 influencer sudah
                      posting
                    </li>
                  </ul>
                </div>
              </div>

              {/* CREATE CAMPAIGN */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                📝 Cara Membuat Campaign Baru (Create)
              </h3>

              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-900 dark:text-blue-300 font-semibold mb-2">
                  💡 Penting: Campaign baru selalu dimulai dengan status{" "}
                  <code className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded">DRAFT</code>
                </p>
              </div>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Langkah-langkah:</h4>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-3">
                <li>
                  <strong className="text-gray-900 dark:text-white">Klik tombol "+ Create Campaign"</strong>
                  <p className="mt-1">Tombol hijau di halaman All Campaigns (kanan atas)</p>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Isi 3 Field Wajib untuk AI Generate:</strong>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>
                      <strong>Campaign Name</strong> - Contoh: "Promo Ramadan 2025"
                    </li>
                    <li>
                      <strong>Product Name</strong> - Contoh: "Hijab Premium Collection"
                    </li>
                    <li>
                      <strong>Campaign Goal</strong> - Contoh: "Meningkatkan brand awareness dan penjualan produk hijab
                      premium selama bulan Ramadan dengan target reach 500K dan engagement rate 5%"
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Klik tombol "🤖 Generate with AI"</strong>
                  <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                    <p className="text-yellow-900 dark:text-yellow-300 text-sm">
                      <strong>Sistem AI akan otomatis mengisi:</strong>
                    </p>
                    <ul className="list-disc ml-6 mt-1 text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
                      <li>Description (deskripsi kampanye yang refined)</li>
                      <li>KPI Target (target pencapaian)</li>
                      <li>Key Messages (3-5 pesan utama)</li>
                      <li>Mandatory Hashtags (#brandname, #product, dll)</li>
                      <li>Mandatory CTA ("Swipe up!", "Link di bio", dll)</li>
                      <li>Rules (aturan kampanye)</li>
                      <li>Platform Deliverables (Instagram Reels, TikTok Video, dll)</li>
                      <li>Target Metrics (reach, engagement, impressions)</li>
                      <li>Bonus Multiplier (default 1.5)</li>
                    </ul>
                  </div>
                  <p className="mt-2 text-sm">⏱️ Proses: 5-10 detik</p>

                  {/* Screenshot Generate AI */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                      <span>📸</span> Screenshot: AI Generate Form Campaign
                    </h5>
                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                      <img
                        src="/images/screenshot/generateAI.png"
                        alt="AI Generate Screenshot - Form otomatis terisi oleh AI"
                        className="w-full h-auto"
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic text-center">
                      AI otomatis mengisi semua field kampanye berdasarkan Campaign Name, Product Name, dan Goal
                    </p>
                  </div>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Review & Edit Hasil AI</strong>
                  <p className="mt-1">Periksa dan sesuaikan field yang di-generate AI sesuai kebutuhan:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Edit key messages jika perlu lebih spesifik</li>
                    <li>Tambah/hapus hashtags</li>
                    <li>Sesuaikan target metrics dengan budget</li>
                    <li>Modifikasi platform deliverables</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Lengkapi Field Lainnya:</strong>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>
                      <strong>Campaign Image:</strong> Upload banner (landscape 19:9 atau portrait 9:19)
                    </li>
                    <li>
                      <strong>Start Date & End Date:</strong> Tentukan periode kampanye
                    </li>
                    <li>
                      <strong>Categories:</strong> Pilih kategori yang relevan
                    </li>
                    <li>
                      <strong>Compensation Type:</strong> Paid/Barter/Hybrid/Affiliate
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Klik "Save as Draft"</strong>
                  <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                    <p className="text-green-900 dark:text-green-300 text-sm">
                      ✅ <strong>Campaign tersimpan dengan status DRAFT</strong>
                    </p>
                    <ul className="list-disc ml-6 mt-1 text-green-800 dark:text-green-300 text-sm">
                      <li>Belum terlihat oleh influencer</li>
                      <li>Bisa diedit kapan saja</li>
                      <li>Belum bisa menerima submission</li>
                    </ul>
                  </div>
                </li>
              </ol>

              {/* EDIT CAMPAIGN */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                ✏️ Cara Edit Campaign (Mengubah Status)
              </h3>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Langkah-langkah:</h4>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-3">
                <li>
                  <strong className="text-gray-900 dark:text-white">Buka Campaign yang Statusnya DRAFT</strong>
                  <p className="mt-1">Dari halaman All Campaigns → Klik tombol Edit (icon pensil) pada campaign</p>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Review Semua Data Campaign</strong>
                  <p className="mt-1">Pastikan semua field sudah terisi dengan benar</p>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Ubah Status menjadi "Upcoming"</strong>
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                    <p className="text-blue-900 dark:text-blue-300 text-sm mb-2">
                      <strong>⚠️ Syarat mengubah status ke UPCOMING:</strong>
                    </p>
                    <ul className="list-disc ml-6 text-blue-800 dark:text-blue-300 text-sm space-y-1">
                      <li>
                        <strong>Start Date harus lebih besar dari hari ini</strong>
                      </li>
                      <li>Contoh: Hari ini 4 Des 2025 → Start date minimal 5 Des 2025</li>
                      <li>Jika start date = hari ini → Status akan langsung jadi ACTIVE</li>
                    </ul>
                  </div>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Klik "Publish Campaign"</strong>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded">
                      <p className="text-purple-900 dark:text-purple-300 text-sm">
                        📅 <strong>Jika Start Date {">"} Hari Ini:</strong> Status ={" "}
                        <code className="px-2 py-1 bg-purple-100 dark:bg-purple-800 rounded">UPCOMING</code>
                      </p>
                      <ul className="list-disc ml-6 mt-1 text-purple-800 dark:text-purple-300 text-sm">
                        <li>Campaign terlihat di list untuk influencer</li>
                        <li>Influencer bisa lihat detail tapi belum bisa submit</li>
                        <li>Countdown menuju start date</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                      <p className="text-green-900 dark:text-green-300 text-sm">
                        🟢 <strong>Jika Start Date = Hari Ini:</strong> Status otomatis ={" "}
                        <code className="px-2 py-1 bg-green-100 dark:bg-green-800 rounded">ACTIVE</code>
                      </p>
                      <ul className="list-disc ml-6 mt-1 text-green-800 dark:text-green-300 text-sm">
                        <li>Campaign langsung aktif</li>
                        <li>Influencer bisa submit/join campaign</li>
                        <li>Post submission dibuka</li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Influencer Menerima Notifikasi</strong>
                  <div className="mt-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded">
                    <p className="text-indigo-900 dark:text-indigo-300 text-sm mb-2">
                      <strong>📧 Setelah status berubah ke UPCOMING:</strong>
                    </p>
                    <ul className="list-disc ml-6 text-indigo-800 dark:text-indigo-300 text-sm space-y-1">
                      <li>
                        <strong>Email Notification:</strong> Influencer yang di-invite akan menerima email berisi detail
                        campaign dan link untuk lihat
                      </li>
                      <li>
                        <strong>In-App Notification:</strong> Notifikasi push di aplikasi influencer (badge merah pada
                        icon notifikasi)
                      </li>
                      <li>
                        <strong>Isi Notifikasi:</strong> "Anda diundang ke campaign [Campaign Name]. Mulai [Start Date].
                        Klik untuk lihat detail."
                      </li>
                      <li>
                        <strong>Action:</strong> Influencer bisa langsung accept/decline invitation
                      </li>
                    </ul>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    💡 <strong>Kapan influencer bisa accept?</strong> Segera setelah status UPCOMING. Mereka bisa
                    prepare konten, tapi belum bisa submit post sampai status berubah ke ACTIVE.
                  </p>
                </li>
              </ol>

              {/* STATUS OTOMATIS */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                🤖 Sistem Otomatis Status Campaign
              </h3>

              <div className="space-y-3 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    1️⃣ DRAFT → UPCOMING (Manual via Edit)
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Admin mengubah status secara manual saat edit campaign. Syarat: Start date {">"} hari ini.
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                    2️⃣ UPCOMING → ACTIVE (Otomatis oleh Sistem)
                  </h4>
                  <p className="text-green-800 dark:text-green-300 text-sm mb-2">
                    <strong>Sistem otomatis mengubah status ke ACTIVE ketika:</strong>
                  </p>
                  <ul className="list-disc ml-6 text-green-800 dark:text-green-300 text-sm space-y-1">
                    <li>Tanggal hari ini = Start Date campaign</li>
                    <li>Cek dilakukan setiap kali user membuka halaman campaign</li>
                    <li>Influencer langsung bisa submit post</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="font-semibold text-red-900 dark:text-red-300 mb-2">
                    3️⃣ ACTIVE → EXPIRED (Otomatis oleh Sistem)
                  </h4>
                  <p className="text-red-800 dark:text-red-300 text-sm mb-2">
                    <strong>Sistem otomatis mengubah status ke EXPIRED ketika:</strong>
                  </p>
                  <ul className="list-disc ml-6 text-red-800 dark:text-red-300 text-sm space-y-1">
                    <li>Tanggal hari ini {">"} End Date campaign</li>
                    <li>Campaign ditutup untuk submission baru</li>
                    <li>Hanya bisa dilihat untuk analisis (read-only)</li>
                  </ul>
                </div>
              </div>

              {/* VIEW CAMPAIGN */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                👁️ Cara Melihat Detail Campaign (View)
              </h3>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Langkah-langkah:</h4>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-3">
                <li>
                  <strong className="text-gray-900 dark:text-white">Dari Halaman All Campaigns</strong>
                  <p className="mt-1">Klik pada row campaign atau tombol View (icon mata)</p>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Informasi yang Ditampilkan:</strong>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">📋 Campaign Info:</p>
                      <ul className="list-disc ml-6 text-sm space-y-1">
                        <li>Campaign Name & Product Name</li>
                        <li>Campaign Image (banner besar)</li>
                        <li>Status Badge (Draft/Upcoming/Active/Expired dengan warna)</li>
                        <li>Start Date & End Date</li>
                        <li>Duration (X hari)</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">🎯 Goals & Metrics:</p>
                      <ul className="list-disc ml-6 text-sm space-y-1">
                        <li>Campaign Goal</li>
                        <li>KPI Target</li>
                        <li>Target Reach, Engagement, Engagement Rate, Impressions</li>
                        <li>Bonus Multiplier</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">📝 Content Guidelines:</p>
                      <ul className="list-disc ml-6 text-sm space-y-1">
                        <li>Key Messages (list pesan utama)</li>
                        <li>Mandatory Hashtags (chips/badges)</li>
                        <li>Mandatory CTA</li>
                        <li>Rules & Guidelines</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">📱 Platform Deliverables:</p>
                      <ul className="list-disc ml-6 text-sm space-y-1">
                        <li>Table: Platform, Format, Quantity, Duration, Notes</li>
                        <li>Contoh: Instagram Reels - 2 video - 30-60 detik</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">👥 Influencers & Posts:</p>
                      <ul className="list-disc ml-6 text-sm space-y-1">
                        <li>Jumlah influencer yang join</li>
                        <li>List influencer dengan status (invited/accepted/rejected)</li>
                        <li>Table posts dengan performance metrics</li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ol>

              {/* INFLUENCER SUBMISSION */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                📤 Influencer Submit Post ke Campaign
              </h3>

              <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <p className="text-purple-900 dark:text-purple-300 font-semibold mb-2">
                  🔐 <strong>Aturan Submission:</strong>
                </p>
                <ul className="list-disc ml-6 text-purple-800 dark:text-purple-300 text-sm space-y-1">
                  <li>
                    Influencer <strong>HANYA bisa submit/join campaign dengan status ACTIVE</strong>
                  </li>
                  <li>Campaign berstatus DRAFT atau UPCOMING tidak bisa menerima submission</li>
                  <li>
                    Submission ditampilkan di menu <strong>Posts</strong>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Flow Influencer:</h4>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Influencer login ke aplikasi influencer (terpisah dari admin)</li>
                <li>Lihat list campaign dengan status ACTIVE</li>
                <li>Klik campaign untuk lihat detail & requirement</li>
                <li>Klik "Join Campaign" untuk daftar</li>
                <li>Buat konten sesuai guideline (hashtags, CTA, deliverables)</li>
                <li>Post konten ke Instagram/TikTok</li>
                <li>Submit link post ke sistem melalui aplikasi influencer</li>
                <li>
                  Post masuk ke menu <strong>Posts</strong> dengan status{" "}
                  <code className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Pending</code>
                </li>
              </ol>

              {/* ADMIN APPROVAL */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                ✅ Admin Review & Approve Post (Menu Posts)
              </h3>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Langkah-langkah:</h4>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-3">
                <li>
                  <strong className="text-gray-900 dark:text-white">Buka Menu "Posts"</strong>
                  <p className="mt-1">Dari sidebar → Campaign → Posts</p>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Lihat Daftar Post dengan Status Pending</strong>
                  <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
                    <p className="text-yellow-900 dark:text-yellow-300 text-sm mb-2">
                      <strong>Kolom yang ditampilkan:</strong>
                    </p>
                    <ul className="list-disc ml-6 text-yellow-800 dark:text-yellow-300 text-sm space-y-1">
                      <li>
                        <strong>Campaign Info:</strong> Thumbnail + nama campaign
                      </li>
                      <li>
                        <strong>Influencer:</strong> Avatar (Instagram/TikTok) + Icon platform + Username + Name
                      </li>
                      <li>
                        <strong>Post:</strong> Thumbnail (clickable) + Caption + Posted time
                      </li>
                      <li>
                        <strong>Performance:</strong> Like, Comment, View, Play, Engagement Rate
                      </li>
                      <li>
                        <strong>Status:</strong> Pending (kuning) / Approved (hijau) / Rejected (merah)
                      </li>
                      <li>
                        <strong>Action:</strong> Dropdown (Pending/Approve/Reject)
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Review Post:</strong>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Klik thumbnail untuk buka post asli di Instagram/TikTok</li>
                    <li>Cek apakah ada mandatory hashtags</li>
                    <li>Cek apakah ada mandatory CTA</li>
                    <li>Cek kesesuaian konten dengan guideline</li>
                    <li>Lihat performance awal (like, comment)</li>
                  </ul>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Approve atau Reject:</strong>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                      <p className="text-green-900 dark:text-green-300 text-sm">
                        ✅ <strong>Jika sesuai:</strong> Pilih "Approve" dari dropdown → Konfirmasi → Status jadi hijau
                      </p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                      <p className="text-red-900 dark:text-red-300 text-sm">
                        ❌ <strong>Jika tidak sesuai:</strong> Pilih "Reject" dari dropdown → Konfirmasi → Status jadi
                        merah → Influencer akan dinotifikasi untuk revisi
                      </p>
                    </div>
                  </div>
                </li>
              </ol>

              <hr className="my-8 border-gray-200 dark:border-gray-700" />

              <h2
                id="menu-influencer"
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Menu Influencer
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Menu untuk mengelola database influencer dan kategori mereka.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Navigasi Influencer</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Terdapat 2 sub-menu:</p>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">
                  <strong>Directory</strong> - Database influencer
                </li>
                <li className="mb-2">
                  <strong>Categories</strong> - Kategori influencer
                </li>
              </ol>

              {/* CREATE INFLUENCER */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                👥 Cara Membuat Influencer Baru (Create)
              </h3>

              {/* Screenshot Create Influencer */}
              <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📸</span> Screenshot: Form Create Influencer
                </h4>
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                  <img
                    src="/images/screenshot/createInfluencer.png"
                    alt="Create Influencer Form - Input data influencer dan pilih kategori"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 italic text-center">
                  Admin hanya mengisi data personal dan memilih kategori. Influencer akan connect akun Instagram/TikTok
                  sendiri.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="text-orange-900 dark:text-orange-300 font-semibold mb-2">
                  ⚠️ Penting: Admin WAJIB membuat akun influencer terlebih dahulu sebelum influencer bisa akses aplikasi
                </p>
                <p className="text-orange-800 dark:text-orange-300 text-sm mt-2">
                  Influencer tidak bisa registrasi sendiri. Hanya admin yang bisa create akun influencer.
                </p>
              </div>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Langkah-langkah:</h4>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300 space-y-3">
                <li>
                  <strong className="text-gray-900 dark:text-white">Klik tombol "+ Add Influencer"</strong>
                  <p className="mt-1">Tombol hijau di halaman Directory (kanan atas)</p>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Isi Data Personal:</strong>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>
                      <strong>Name</strong> (Required) - Nama lengkap influencer
                    </li>
                    <li>
                      <strong>Email</strong> (Required) - Email untuk login ke aplikasi influencer
                    </li>
                    <li>
                      <strong>Phone</strong> (Optional) - Nomor WhatsApp untuk komunikasi
                    </li>
                  </ul>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Pilih Categories (Wajib):</strong>
                  <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded">
                    <p className="text-purple-900 dark:text-purple-300 text-sm mb-2">
                      <strong>📌 Admin memilih kategori sesuai interest/niche influencer:</strong>
                    </p>
                    <ul className="list-disc ml-6 text-purple-800 dark:text-purple-300 text-sm space-y-1">
                      <li>Fashion & Beauty</li>
                      <li>Food & Beverage</li>
                      <li>Technology</li>
                      <li>Lifestyle</li>
                      <li>Health & Fitness</li>
                      <li>Travel</li>
                      <li>Education</li>
                    </ul>
                    <p className="text-purple-800 dark:text-purple-300 text-sm mt-2">
                      💡 Bisa pilih lebih dari 1 kategori (multi-select)
                    </p>
                  </div>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">Klik "Save"</strong>
                  <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                    <p className="text-green-900 dark:text-green-300 text-sm">
                      ✅ <strong>Influencer berhasil dibuat!</strong>
                    </p>
                    <ul className="list-disc ml-6 mt-1 text-green-800 dark:text-green-300 text-sm space-y-1">
                      <li>Email otomatis dikirim ke influencer dengan kredensial login</li>
                      <li>Influencer bisa login ke aplikasi influencer menggunakan email</li>
                      <li>Password default akan diberikan (wajib ganti saat pertama login)</li>
                    </ul>
                  </div>
                </li>

                <li>
                  <strong className="text-gray-900 dark:text-white">
                    Influencer Connect Akun Social Media Sendiri
                  </strong>
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
                    <p className="text-blue-900 dark:text-blue-300 text-sm mb-2">
                      <strong>🔗 Sistem terintegrasi resmi dengan Instagram & TikTok API:</strong>
                    </p>
                    <ul className="list-disc ml-6 text-blue-800 dark:text-blue-300 text-sm space-y-1">
                      <li>
                        <strong>Admin TIDAK perlu mengisi data Instagram/TikTok</strong>
                      </li>
                      <li>
                        Setelah login, influencer akan diminta untuk <strong>Connect Instagram</strong> dan{" "}
                        <strong>Connect TikTok</strong>
                      </li>
                      <li>
                        Proses connect menggunakan <strong>OAuth resmi Instagram/TikTok</strong>
                      </li>
                      <li>Data follower, avatar, username, engagement rate akan otomatis diambil dari API</li>
                      <li>Data selalu update real-time dari platform asli</li>
                    </ul>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    💡 <strong>Keuntungan:</strong> Data akurat, tidak perlu update manual, metrics otomatis sync.
                  </p>
                </li>
              </ol>

              <hr className="my-8 border-gray-200 dark:border-gray-700" />

              <h2
                id="pengaturan-logout"
                className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Pengaturan & Logout
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Theme Toggle</h3>
              <ul className="list-disc ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">
                  <strong>Lokasi:</strong> Header (top right)
                </li>
                <li className="mb-2">
                  <strong>Fungsi:</strong> Switch antara Light Mode dan Dark Mode
                </li>
                <li className="mb-2">
                  <strong>Icon:</strong> ☀️ Sun icon (light mode), 🌙 Moon icon (dark mode)
                </li>
                <li className="mb-2">
                  <strong>Behavior:</strong> Click toggle langsung switch, preference tersimpan di localStorage
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">Logout</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong className="font-semibold text-gray-900 dark:text-white">2 Cara Logout:</strong>
              </p>
              <ol className="list-decimal ml-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">
                  <strong>Via User Dropdown:</strong> Klik avatar/name di header → Pilih "Logout" → Confirmation dialog
                  muncul
                </li>
                <li className="mb-2">
                  <strong>Via Sidebar Footer:</strong> Klik menu "Logout" di sidebar bawah → Confirmation dialog muncul
                </li>
              </ol>

              {/* Weighted Engagement Scoring Section */}
              <h2 id="sistem-penghitungan" className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">
                🎯 Sistem Penghitungan Engagement Rate & Performance Score
              </h2>

              <div className="p-4 mb-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong className="text-blue-600 dark:text-blue-400">📊 Overview:</strong> Sistem menggunakan{" "}
                  <strong>weighted scoring</strong> yang berbeda untuk setiap platform (Instagram & TikTok), karena
                  perilaku engagement di kedua platform memiliki karakteristik yang berbeda.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                ⚖️ Bobot Engagement per Platform
              </h3>

              {/* Instagram Weights */}
              <div className="p-4 mb-6 rounded-lg border-l-4 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
                <h4 className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-3">📸 Instagram Weights</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Instagram users lebih cenderung melakukan <strong>save</strong> untuk konten yang valuable dan{" "}
                  <strong>comment</strong> untuk engagement yang meaningful.
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-3">
                  <ul className="list-none space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      ❤️ <strong>Like:</strong> 1 point (Basic engagement)
                    </li>
                    <li>
                      💬 <strong>Comment:</strong> 3 points (Medium engagement - shows interest)
                    </li>
                    <li>
                      🔖 <strong>Save:</strong> 5 points (High engagement - valuable content)
                    </li>
                    <li>
                      📤 <strong>Share:</strong> 4 points (High engagement - viral potential)
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-mono text-sm">
                  <strong className="text-gray-900 dark:text-white">Formula:</strong>
                  <br />
                  Weighted Engagement (IG) = (likes × 1) + (comments × 3) + (saves × 5) + (shares × 4)
                </div>
                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <strong className="text-yellow-700 dark:text-yellow-400">💡 Contoh:</strong>
                  <br />
                  <span className="text-gray-700 dark:text-gray-300">
                    Post: 1000 likes, 50 comments, 100 saves, 30 shares
                    <br />
                    Weighted = (1000 × 1) + (50 × 3) + (100 × 5) + (30 × 4) = <strong>1,770 points</strong>
                  </span>
                </div>
              </div>

              {/* TikTok Weights */}
              <div className="p-4 mb-6 rounded-lg border-l-4 border-gray-800 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-3">🎵 TikTok Weights</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  TikTok adalah platform viral-first, dimana <strong>share</strong> adalah indikator terkuat untuk
                  konten yang viral dan <strong>comment</strong> lebih umum karena community-driven.
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-3">
                  <ul className="list-none space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      ❤️ <strong>Like:</strong> 1 point (Basic engagement)
                    </li>
                    <li>
                      💬 <strong>Comment:</strong> 2 points (Lower than IG - more common in TikTok)
                    </li>
                    <li>
                      🔖 <strong>Save:</strong> 0 points (TikTok tidak punya fitur save native)
                    </li>
                    <li>
                      📤 <strong>Share:</strong> 6 points (Highest - viral indicator)
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-mono text-sm">
                  <strong className="text-gray-900 dark:text-white">Formula:</strong>
                  <br />
                  Weighted Engagement (TT) = (likes × 1) + (comments × 2) + (shares × 6)
                </div>
                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <strong className="text-yellow-700 dark:text-yellow-400">💡 Contoh:</strong>
                  <br />
                  <span className="text-gray-700 dark:text-gray-300">
                    Post: 5000 likes, 200 comments, 150 shares
                    <br />
                    Weighted = (5000 × 1) + (200 × 2) + (150 × 6) = <strong>6,300 points</strong>
                  </span>
                </div>
              </div>

              {/* Performance Scoring System */}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-8 mb-3">
                🎯 Sistem Performance Score
              </h3>

              <div className="p-4 mb-6 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Performance score dihitung berdasarkan 4 metrik utama dengan <strong>maksimal 100 points</strong>{" "}
                  untuk base score, dan dapat mencapai <strong>150 points</strong> dengan bonus points.
                </p>
              </div>

              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                📊 Komponen Base Score (Max 100 Points)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">1. Reach Score (Max 25)</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Score = min(25, (Actual Reach / Target Reach) × 25)
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded">
                    Contoh: Target 100K, Actual 120K → (120K/100K) × 25 = 30 → <strong>capped at 25</strong>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700">
                  <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    2. Engagement Score (Max 25)
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Score = min(25, (Weighted Engagement / Target Engagement) × 25)
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded">
                    Contoh: Target 5K, Actual 6K → (6K/5K) × 25 = 30 → <strong>capped at 25</strong>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/20 border border-pink-200 dark:border-pink-700">
                  <h5 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">
                    3. Engagement Rate Score (Max 30)
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Score = min(30, (Actual ER / Target ER) × 30)
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded">
                    Contoh: Target 5.0%, Actual 6.5% → (6.5/5.0) × 30 = 39 → <strong>capped at 30</strong>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700">
                  <h5 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                    4. Impressions Score (Max 20)
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Score = min(20, (Actual Impressions / Target Impressions) × 20)
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-2 rounded">
                    Contoh: Target 150K, Actual 180K → (180K/150K) × 20 = 26.67 → <strong>capped at 20</strong>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mb-6">
                <strong className="text-gray-900 dark:text-white">📝 Base Score Total:</strong>
                <br />
                <span className="text-gray-700 dark:text-gray-300">
                  Base Score = Reach (25) + Engagement (25) + ER (30) + Impressions (20) = <strong>100 points</strong>
                </span>
              </div>

              {/* Bonus Points System */}
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🔥 Bonus Points System</h4>

              <div className="p-4 mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Bonus points diberikan ketika influencer <strong>melebihi target</strong> (exceed expectations). Bonus
                  dihitung dengan <strong>multiplier</strong> (default: 1.5x).
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg font-mono text-sm space-y-2">
                  <div>
                    <strong className="text-gray-900 dark:text-white">Reach Bonus:</strong>
                    <br />
                    <span className="text-gray-700 dark:text-gray-300">
                      ((Actual - Target) / Target) × 25 × Multiplier
                    </span>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Engagement Bonus:</strong>
                    <br />
                    <span className="text-gray-700 dark:text-gray-300">
                      ((Actual - Target) / Target) × 25 × Multiplier
                    </span>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">ER Bonus:</strong>
                    <br />
                    <span className="text-gray-700 dark:text-gray-300">
                      ((Actual - Target) / Target) × 30 × Multiplier
                    </span>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-white">Impressions Bonus:</strong>
                    <br />
                    <span className="text-gray-700 dark:text-gray-300">
                      ((Actual - Target) / Target) × 20 × Multiplier
                    </span>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <strong className="text-green-700 dark:text-green-400">💡 Contoh Bonus Calculation:</strong>
                  <br />
                  <span className="text-gray-700 dark:text-gray-300">
                    Target Reach: 100K, Actual: 150K, Multiplier: 1.5
                    <br />
                    Reach Bonus = ((150K - 100K) / 100K) × 25 × 1.5 = 0.5 × 25 × 1.5 = <strong>18.75 points</strong>
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg mb-6">
                <strong className="text-gray-900 dark:text-white">🏆 Total Performance Score:</strong>
                <br />
                <span className="text-gray-700 dark:text-gray-300">
                  Total Score = min(150, Base Score + Total Bonus Points)
                  <br />
                  <em className="text-sm">Range: 0-150 points (Base: 0-100, Bonus: 0-50+, capped at 150 total)</em>
                </span>
              </div>

              {/* Grading System */}
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">🏅 Grading System</h4>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">
                        Grade
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">
                        Score Range
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-bold text-yellow-600 dark:text-yellow-400">S</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">≥120</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        Outstanding - Exceeded all targets significantly
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Exceeded Target 🔥
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400">A</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">90-119</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        Excellent - Met or exceeded targets
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Met Target ✅
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400">B</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">70-89</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Good - Close to targets</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Near Target ⚠️
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-bold text-yellow-600 dark:text-yellow-400">C</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">50-69</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                        Satisfactory - Moderate performance
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                          Below Target ❌
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 font-bold text-orange-600 dark:text-orange-400">D</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">30-49</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Poor - Significantly below targets</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                          Below Target ❌
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-red-600 dark:text-red-400">F</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">&lt;30</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">Fail - Far below expectations</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Below Target ❌
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Complete Example */}
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                📈 Contoh Lengkap Perhitungan
              </h4>

              <div className="p-5 mb-6 rounded-lg border-2 border-indigo-300 dark:border-indigo-700 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                <h5 className="font-bold text-indigo-700 dark:text-indigo-300 mb-4">Scenario: Instagram Campaign</h5>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <strong className="text-gray-900 dark:text-white block mb-2">📋 Campaign Targets:</strong>
                    <ul className="list-disc ml-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Target Reach: 100,000</li>
                      <li>Target Engagement: 5,000</li>
                      <li>Target Engagement Rate: 5.0%</li>
                      <li>Target Impressions: 150,000</li>
                      <li>Bonus Multiplier: 1.5</li>
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <strong className="text-gray-900 dark:text-white block mb-2">📊 Actual Performance:</strong>
                    <ul className="list-disc ml-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Reach: 150,000</li>
                      <li>Likes: 8,000</li>
                      <li>Comments: 300</li>
                      <li>Saves: 400</li>
                      <li>Shares: 200</li>
                      <li>Impressions: 200,000</li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
                    <strong className="text-pink-700 dark:text-pink-300 block mb-2">
                      Step 1: Calculate Weighted Engagement
                    </strong>
                    <div className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                      Weighted = (8000 × 1) + (300 × 3) + (400 × 5) + (200 × 4)
                      <br />= 8000 + 900 + 2000 + 800
                      <br />= <strong className="text-pink-600 dark:text-pink-400">11,700 points</strong>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <strong className="text-purple-700 dark:text-purple-300 block mb-2">
                      Step 2: Calculate Engagement Rate
                    </strong>
                    <div className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                      Total Raw Engagement = 8000 + 300 + 400 + 200 = 8,900
                      <br />
                      Engagement Rate = (8,900 / 150,000) × 100 ={" "}
                      <strong className="text-purple-600 dark:text-purple-400">5.93%</strong>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <strong className="text-blue-700 dark:text-blue-300 block mb-2">
                      Step 3: Calculate Base Score
                    </strong>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <div>Reach Score = (150K / 100K) × 25 = 37.5 → capped at 25</div>
                      <div>Engagement Score = (11.7K / 5K) × 25 = 58.5 → capped at 25</div>
                      <div>ER Score = (5.93 / 5.0) × 30 = 35.58 → capped at 30</div>
                      <div>Impressions Score = (200K / 150K) × 20 = 26.67 → capped at 20</div>
                      <div className="font-bold text-blue-600 dark:text-blue-400 mt-2">
                        Base Score = 25 + 25 + 30 + 20 = 100
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <strong className="text-orange-700 dark:text-orange-300 block mb-2">
                      Step 4: Calculate Bonus Points
                    </strong>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <div>Reach Bonus = ((150K - 100K) / 100K) × 25 × 1.5 = 18.75</div>
                      <div>Engagement Bonus = ((11.7K - 5K) / 5K) × 25 × 1.5 = 50.25</div>
                      <div>ER Bonus = ((5.93 - 5.0) / 5.0) × 30 × 1.5 = 8.37</div>
                      <div>Impressions Bonus = ((200K - 150K) / 150K) × 20 × 1.5 = 6.67</div>
                      <div className="font-bold text-orange-600 dark:text-orange-400 mt-2">
                        Total Bonus = 18.75 + 50.25 + 8.37 + 6.67 = 84.04
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 rounded-lg border-2 border-green-400 dark:border-green-600">
                    <strong className="text-green-800 dark:text-green-300 block mb-2 text-lg">🏆 Final Result:</strong>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <div>
                        Total Score = min(150, 100 + 84.04) = <strong>150 (capped)</strong>
                      </div>
                      <div>
                        Grade = <strong className="text-yellow-600 dark:text-yellow-400">S</strong> (Outstanding)
                      </div>
                      <div>
                        Status = <strong className="text-red-600 dark:text-red-400">Exceeded Target 🔥</strong>
                      </div>
                      <div>Base Score = 100.0</div>
                      <div>Bonus Points = 84.04</div>
                      <div>Achievement Rate = 100%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
                <p>
                  <strong>Document Version:</strong> 1.0.0
                </p>
                <p>
                  <strong>Last Updated:</strong> 3 Desember 2025
                </p>
                <p>
                  <strong>Created by:</strong> Development Team
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
        .documentation-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.875rem;
          }
          
          .documentation-content table th {
            background-color: rgb(248 250 252);
            color: rgb(30 41 59);
            font-weight: 600;
            padding: 0.75rem 1rem;
            text-align: left;
            border: 1px solid rgb(226 232 240);
          }
          
          .dark .documentation-content table th {
            background-color: rgb(30 41 59);
            color: rgb(226 232 240);
            border-color: rgb(51 65 85);
          }
          
          .documentation-content table td {
            padding: 0.75rem 1rem;
            border: 1px solid rgb(226 232 240);
            color: rgb(71 85 105);
          }
          
          .dark .documentation-content table td {
            border-color: rgb(51 65 85);
            color: rgb(203 213 225);
          }
          
          .documentation-content table tbody tr:hover {
            background-color: rgb(248 250 252);
          }
          
          .dark .documentation-content table tbody tr:hover {
            background-color: rgb(30 41 59 / 0.3);
          }
          
          .documentation-content code {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }
          
          .documentation-content pre {
            background-color: rgb(248 250 252);
            border: 1px solid rgb(226 232 240);
            border-radius: 0.5rem;
            padding: 1rem;
            overflow-x: auto;
            margin: 1.5rem 0;
          }
          
          .dark .documentation-content pre {
            background-color: rgb(15 23 42);
            border-color: rgb(51 65 85);
          }
          
          .documentation-content blockquote {
            border-left: 4px solid rgb(59 130 246);
            padding-left: 1rem;
            margin: 1.5rem 0;
            color: rgb(71 85 105);
          }
          
          .dark .documentation-content blockquote {
            border-color: rgb(96 165 250);
            color: rgb(148 163 184);
          }
          
          .documentation-content ul, .documentation-content ol {
            margin: 1rem 0;
            padding-left: 1.5rem;
          }
          
          .documentation-content li {
            margin: 0.5rem 0;
          }
        `}</style>
      </div>
    </div>
  );
}
