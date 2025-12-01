# Dokumentasi Sistem Influencer Marketing Platform

## Platform Manajemen Kampanye Influencer Terintegrasi dengan AI

---

## 🎯 VISI & POSITIONING

**Platform ini dirancang untuk menjadi solusi influencer marketing yang 10x lebih powerful dari kompetitor seperti nolimit.id**, dengan menggabungkan kekuatan:

- ✨ **AI-Powered Campaign Strategy** - Saran kampanye otomatis berbasis AI
- 🔗 **Native Social Media Integration** - Koneksi langsung ke Instagram & TikTok
- 📊 **Real-time Analytics & Tracking** - Dashboard analitik komprehensif
- 🎯 **Smart Targeting & Matching** - Pencocokan influencer otomatis berdasarkan data

---

## 🏗️ ARSITEKTUR SISTEM

### **Tiga Komponen Utama:**

#### 1. **Admin Dashboard (Agency Panel)** - Frontend ini

Platform web untuk brand/agency mengelola kampanye dan influencer

- URL: `https://agency.stpi.co.id` (atau domain custom)
- Tech Stack: React + TypeScript + Vite + Tailwind CSS
- API Base: `https://relay-agency.stpi.co.id/api`

#### 2. **Influencer Mobile/Web App** (Terpisah)

Aplikasi untuk influencer yang terhubung ke social media mereka

- Koneksi Instagram OAuth
- Koneksi TikTok OAuth
- Submit konten untuk kampanye
- Tracking performance real-time

#### 3. **Backend API + AI Engine**

Server yang menghandle:

- OAuth flow Instagram & TikTok
- AI campaign suggestion engine
- Analytics aggregation
- Post approval workflow

---

## 📱 SISTEM INFLUENCER APP (Mobile/Web)

### **Cara Kerja Koneksi Social Media:**

#### **Instagram Integration**

```
Flow Koneksi:
1. Influencer login ke app
2. Klik "Connect Instagram"
3. Redirect ke Instagram OAuth
4. User authorize akses ke profile & metrics
5. Backend simpan access_token + refresh_token
6. Sistem fetch follower count, engagement rate, posts
7. Auto-sync setiap 24 jam

Data yang Diambil:
- Profile info (username, avatar, bio)
- Total followers
- Media posts (images/videos)
- Engagement metrics (likes, comments, reach)
- Stories insights
```

#### **TikTok Integration**

```
Flow Koneksi:
1. Influencer login ke app
2. Klik "Connect TikTok"
3. Redirect ke TikTok Login Kit OAuth
4. User authorize akses
5. Backend simpan open_id, access_token, refresh_token
6. Sistem fetch user info & video stats
7. Auto-sync metrics

Data yang Diambil:
- Display name, username, avatar
- Total followers
- Video list dengan views/likes/comments
- Engagement rate
- Trending content analysis
```

### **Fitur Influencer App:**

1. **Dashboard Kampanye**

   - List kampanye yang tersedia (sesuai kategori influencer)
   - Status apply/diterima/selesai
   - Deadline tracking
   - Revenue summary

2. **Submit Konten**

   - Upload draft konten sebelum posting
   - Preview campaign requirements (hashtags, CTA, dll)
   - Submit link post setelah publish di Instagram/TikTok
   - Auto-fetch post metrics via API

3. **Performance Analytics**

   - Total earnings
   - Campaign history
   - Engagement rate trend
   - Leaderboard ranking

4. **Notifikasi**
   - Campaign approval
   - Post submission approved/rejected
   - Payment status
   - New campaign match

---

## 🎨 ADMIN DASHBOARD (Agency Panel) - Sistem Ini

### **Module 1: Authentication**

```
Routes:
- /login       → Login admin/brand
- /signin      → Alternative sign in page
- /signup      → Registration untuk brand baru

Features:
- JWT authentication
- Protected routes
- Role-based access (admin vs brand manager)
```

### **Module 2: Dashboard & Analytics**

```
Route: /

Features:
✅ Overview Metrics
  - Total influencers registered
  - Active campaigns count
  - Pending posts for approval
  - Total campaigns (draft + active + completed)

✅ Engagement Chart
  - Time-series data (daily/weekly/monthly)
  - Total engagement, likes, comments, reach
  - Average engagement per post
  - Filterable by date range

✅ Influencer Leaderboard
  - Top performers berdasarkan:
    * Total points (gamification)
    * Total engagement
    * Total posts
    * Average engagement rate
  - Kategori influencer
  - Sortable & filterable

Teknologi:
- Chart.js / Recharts untuk visualisasi
- Real-time data dari backend API
- Export to Excel/PDF
```

### **Module 3: Campaign Management**

```
Routes:
- /campaigns           → List semua kampanye
- /campaigns/create    → Buat kampanye baru ⭐ AI-POWERED
- /campaigns/:id       → Detail kampanye
- /campaigns/:id/edit  → Edit kampanye

Features Utama:

📋 Campaign List
  - Filter by status (draft/upcoming/active/expired)
  - Search by name/product
  - Sort by date
  - Pagination
  - Status indicators

✨ AI-Powered Campaign Creation (DIFERENSIASI UTAMA!)
  Workflow:
  1. Brand input:
     - Product name
     - Campaign name
     - Campaign goal (misal: "Meningkatkan awareness produk skincare di Gen Z")

  2. Klik tombol "✨ Auto-Fill with AI"

  3. AI Engine (backend) analyze & generate:
     ✅ Deskripsi kampanye yang compelling
     ✅ Campaign goal refined (lebih spesifik & terukur)
     ✅ KPI Target (contoh: "100K impressions, 5K engagements, 2% conversion")
     ✅ Key Messages (array of selling points)
     ✅ Mandatory Hashtags (trending + brand hashtags)
     ✅ Call-to-Action suggestions
     ✅ Platform Deliverables:
        - Instagram: 3 feed posts, 5 stories (60-90 detik)
        - TikTok: 2 videos (15-60 detik)
     ✅ Content Rules & Guidelines

  4. Brand dapat edit hasil AI sebelum save

  5. System auto-match influencer berdasarkan:
     - Kategori kampanye vs kategori influencer
     - Follower count vs budget
     - Engagement rate history
     - Past performance in similar campaigns

  API Endpoint: POST /api/ai/campaign/brief
  Request:
  {
    "product_name": "Glowing Serum X",
    "campaign_name": "Glow Your Way Campaign",
    "campaign_goal": "Awareness produk baru di target market 18-25 tahun"
  }

  Response:
  {
    "description": "...",
    "campaign_goal_refined": "...",
    "kpi_target": "...",
    "key_messages": ["...", "..."],
    "mandatory_hashtags": ["#GlowYourWay", "#GlowingSerum"],
    "mandatory_cta": "...",
    "rules": "...",
    "platform_deliverables": [
      {
        "platform_name": "instagram",
        "content_format": "video",
        "quantity": 3,
        "min_duration_seconds": 60,
        "max_duration_seconds": 90,
        "notes": "..."
      },
      ...
    ]
  }

🎯 Smart Targeting
  - Auto-suggest influencer yang match
  - Filter by category, followers, engagement rate
  - Budget calculator per influencer tier
  - Batch invite influencers

📊 Campaign Monitoring
  - Live campaign dashboard
  - Submitted posts dari influencer
  - Approval workflow (approve/reject dengan catatan)
  - Performance tracking real-time
  - ROI calculator

💰 Budget & Compensation
  - Set compensation per tier/platform
  - Content usage rights
  - Payment tracking
```

### **Module 4: Influencer Management**

```
Routes:
- /influencers           → List influencer database
- /influencers/create    → Invite influencer baru
- /influencers/:id       → Profile detail
- /influencers/:id/edit  → Edit data influencer
- /influencer-categories → Manage kategori influencer

Features:

👥 Influencer Database
  - Comprehensive profile:
    * Name, email, contact
    * Instagram: username, avatar, followers, access token status
    * TikTok: username, avatar, followers, token status
    * Categories (Beauty, Fashion, Tech, Food, Travel, etc.)
    * Total points (dari campaign performance)
    * Blacklist status

  - Advanced Filters:
    * Platform (Instagram/TikTok/Both)
    * Category
    * Min/max followers
    * Engagement rate range
    * Availability status
    * Search by name/username

  - Sort options:
    * By points (gamification)
    * By followers
    * By engagement rate
    * By join date

📸 Social Media Preview
  - Avatar dari Instagram/TikTok
  - Link langsung ke profile
  - Follower count auto-update
  - Last sync timestamp
  - Tooltip showing display name

📧 Invite System
  - Send invitation email
  - Auto-generate temporary password
  - Onboarding checklist
  - Welcome bonus points

🏷️ Kategori Management
  - CRUD categories
  - Multi-category per influencer
  - Category-based auto-matching untuk campaign
```

### **Module 5: Post Management**

```
Route: /posts

Features:

📝 Post Submission Review
  - List semua konten yang disubmit influencer
  - Filter by:
    * Campaign
    * Influencer name
    * Platform (Instagram/TikTok)
    * Status (pending/approved/rejected)

  - Preview:
    * Thumbnail/video preview
    * Caption text
    * Hashtags check (mandatory vs actual)
    * CTA check
    * Brand guidelines compliance

✅ Approval Workflow
  - Approve post → update status + trigger payment
  - Reject post → feedback note to influencer
  - Request revision → status "needs_revision"

  - Bulk actions:
    * Approve multiple posts
    * Export report

📈 Post Analytics
  - Engagement metrics (fetched from Instagram/TikTok API):
    * Likes, comments, shares, saves
    * Reach, impressions
    * Video views, watch time
  - Auto-refresh setiap 6 jam
  - Trend comparison vs influencer average
  - Campaign aggregate metrics
```

### **Module 6: User Profile**

```
Route: /profile

Features:
- Admin profile settings
- Change password
- Notification preferences
- API key management (untuk integrasi)
- Activity log
```

---

## 🤖 AI ENGINE - COMPETITIVE ADVANTAGE

### **Campaign Strategy AI**

```
Model: GPT-4 / Claude 3 (atau custom fine-tuned model)

Input Context:
- Product name & type
- Target audience
- Campaign goal
- Budget range (optional)
- Historical campaign data (untuk learning)

AI Tasks:
1. Generate compelling campaign description
2. Refine vague goals menjadi SMART goals
3. Suggest realistic KPI based on industry benchmarks
4. Create key messages yang resonate dengan target market
5. Recommend optimal hashtag mix (trending + niche + branded)
6. Suggest content format & platform mix
7. Estimate deliverable quantity based on budget

Training Data:
- Past successful campaigns
- Industry benchmarks (engagement rates per niche)
- Trending topics & hashtags
- Platform algorithm preferences (Instagram vs TikTok)
```

### **Smart Influencer Matching AI**

```
Algorithm:
- Content analysis (influencer past posts vs campaign theme)
- Audience demographic matching
- Engagement rate prediction
- Budget optimization (best ROI per tier)
- Collaboration history score

Output:
- Ranked list of recommended influencers
- Match score (0-100%)
- Estimated reach & engagement
- Suggested compensation
```

---

## 📊 DATA FLOW ARCHITECTURE

### **Campaign Creation Flow (dengan AI)**

```
1. Brand inputs basic info → Frontend
2. Frontend sends to Backend AI endpoint
3. Backend calls OpenAI/Claude API dengan prompt engineering
4. AI generates campaign strategy JSON
5. Backend validates & enhances dengan data historis
6. Frontend displays editable AI suggestions
7. Brand reviews & adjusts
8. Submit final campaign
9. Backend triggers influencer matching algorithm
10. Recommended influencers notified di app mereka
```

### **Post Submission & Approval Flow**

```
1. Influencer publishes post di Instagram/TikTok
2. Influencer submits post URL di app mereka
3. Backend fetches post via Instagram Graph API / TikTok API
4. Extract:
   - Media files
   - Caption
   - Hashtags
   - Initial metrics (likes, comments)
5. Store di database dengan status "pending"
6. Admin dapat review di /posts
7. Approve/Reject action
8. Notification ke influencer
9. Jika approved → trigger payment process
10. Auto-fetch updated metrics setiap 6 jam selama 7 hari
```

### **Analytics Aggregation**

```
Real-time Pipeline:
1. Cron job setiap 6 jam
2. Fetch latest metrics dari Instagram/TikTok API untuk semua approved posts
3. Update database:
   - Post level metrics
   - Influencer aggregate stats
   - Campaign total performance
4. Calculate derived metrics:
   - Engagement rate
   - ROI (reach/budget)
   - Viral coefficient
5. Update leaderboard rankings
6. Trigger alerts jika performance anomaly (viral post, underperforming campaign)
```

---

## 🔐 KEAMANAN & PRIVACY

### **OAuth Token Management**

```
Best Practices:
✅ Encrypt access tokens di database
✅ Store refresh tokens secara terpisah
✅ Auto-refresh before expiration
✅ Revoke tokens on influencer disconnect
✅ Audit log setiap API call ke social media
✅ Rate limiting untuk API calls
```

### **Data Privacy Compliance**

```
GDPR/Privacy Ready:
- Influencer consent untuk data usage
- Right to disconnect & delete data
- Transparent data usage policy
- Anonymized analytics untuk agregat
- Secure API communication (HTTPS only)
```

---

## 🚀 DIFFERENTIATOR vs NOLIMIT.ID

### **1. AI-Powered Campaign Creation**

❌ **Nolimit.id**: Manual input semua campaign details
✅ **Platform Kita**: AI auto-generate strategy dengan 1 klik

### **2. Native Social Media Integration**

❌ **Nolimit.id**: Manual tracking, influencer copy-paste metrics
✅ **Platform Kita**: Auto-sync Instagram & TikTok via OAuth, real-time metrics

### **3. Smart Matching Algorithm**

❌ **Nolimit.id**: Manual search & invite
✅ **Platform Kita**: AI recommend best-fit influencers + match score

### **4. Advanced Analytics**

❌ **Nolimit.id**: Basic reporting
✅ **Platform Kita**: Real-time dashboard, predictive analytics, ROI calculator

### **5. Gamification & Leaderboard**

❌ **Nolimit.id**: Flat list
✅ **Platform Kita**: Points system, ranking, badges untuk motivasi influencer

### **6. Modern UX/UI**

❌ **Nolimit.id**: Older design
✅ **Platform Kita**: Modern minimalist design, responsive, dark mode, smooth animations

---

## 📈 SCALABILITY & PERFORMANCE

### **Tech Stack Advantages**

```
Frontend:
- React 18 (concurrent rendering)
- Vite (fast build & HMR)
- TypeScript (type safety)
- Tailwind CSS (optimized bundle)
- Code splitting per route

Backend (assumed):
- Laravel/Node.js + Redis caching
- PostgreSQL untuk relational data
- MongoDB untuk analytics time-series
- Queue system untuk background jobs (metrics sync)
- CDN untuk media files

Infrastructure:
- Docker containers
- Kubernetes untuk orchestration
- Auto-scaling based on traffic
- Load balancer
- Monitoring (Sentry, New Relic)
```

---

## 💡 REVENUE MODEL

### **1. Subscription Tiers untuk Brand/Agency**

```
Starter: Rp 2 juta/bulan
- 5 active campaigns
- 50 influencer invites
- Basic analytics
- Email support

Professional: Rp 5 juta/bulan
- Unlimited campaigns
- Unlimited influencers
- AI campaign generator
- Advanced analytics
- Priority support
- API access

Enterprise: Custom pricing
- White-label option
- Dedicated account manager
- Custom integrations
- SLA guarantee
```

### **2. Commission dari Influencer**

```
- 10% platform fee dari setiap payment influencer
- Atau subscription fee untuk influencer:
  - Free tier: 15% commission
  - Pro tier (Rp 99rb/bulan): 5% commission + premium features
```

### **3. Premium Features**

```
- AI campaign generator (unlock setelah trial)
- Advanced audience insights
- Competitor analysis
- Custom reports
- Priority influencer placement
```

---

## 🎯 TARGET MARKET

### **Primary: Brand & Marketing Agency**

- E-commerce brands (fashion, beauty, F&B)
- Startup yang ingin scale awareness
- Digital marketing agency
- Corporate dengan budget influencer marketing

### **Secondary: Influencers**

- Micro influencers (10K-100K followers)
- Nano influencers (1K-10K) untuk authentic engagement
- Macro influencers (100K+) untuk reach campaigns

### **Geographic**

- Indonesia (primary)
- SEA expansion (Malaysia, Singapore, Thailand)

---

## 🛠️ ROADMAP DEVELOPMENT

### **Phase 1: MVP (Current)**

✅ Admin dashboard
✅ Campaign CRUD
✅ Influencer management
✅ Post approval workflow
✅ Basic analytics

### **Phase 2: AI Integration (Next 2 months)**

- AI campaign generator
- Smart influencer matching
- Predictive analytics
- Sentiment analysis untuk posts

### **Phase 3: Mobile App (Month 3-4)**

- React Native/Flutter app untuk influencer
- Instagram/TikTok OAuth integration
- Push notifications
- In-app messaging

### **Phase 4: Advanced Features (Month 5-6)**

- Video content AI analysis (brand safety check)
- Automated payment gateway integration
- Contract & legal document generator
- Multi-brand management for agencies

### **Phase 5: Scale (Month 7-12)**

- YouTube integration
- Shopee/Tokopedia affiliate tracking
- WhatsApp Business API integration
- Multi-language support
- International expansion

---

## 📞 CONTACT & DEMO

**For Business Inquiries:**

- Website: [Akan dibuat]
- Email: hello@[yourdomain].com
- Demo Request: Schedule via calendar link

**Tech Stack:**

- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Backend: Laravel 11 / Node.js + Express
- Database: PostgreSQL + Redis
- Cloud: AWS / GCP
- AI: OpenAI GPT-4 API

---

## 🎨 BRAND POSITIONING STATEMENT

**"Platform Influencer Marketing Pertama di Indonesia yang Menggunakan AI untuk Campaign Strategy, dengan Native Instagram & TikTok Integration untuk Real-Time Analytics — Membuat Influencer Marketing 10x Lebih Efisien dan Terukur"**

### **Tagline Ideas:**

1. "AI-Powered Influencer Marketing Made Simple"
2. "Smart Campaigns, Real Results"
3. "Where AI Meets Influence"
4. "Campaign Otomatis, Impact Maksimal"
5. "Influencer Marketing, Redefined by AI"

---

**Dokumen ini dapat digunakan untuk:**

- Pitch deck ke investor
- Sales presentation ke brand/agency
- Developer onboarding guide
- Product roadmap planning
- Marketing content creation

**Last Updated:** 1 Desember 2025
**Version:** 1.0
