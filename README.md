# 🚀 OSON — Til O‘rganish Platformasi (Hackathon 2026)

> **OSON — Learn English. Play. Speak.**  
> 13–18 yoshdagi o‘quvchilar uchun ingliz tilini qiziqarli, gamifikatsiya qilingan va sun’iy intellekt (AI) yordamida o‘rganish imkonini beruvchi zamonaviy platforma.

---

## 🌟 Asosiy Imkoniyatlar (Features Overview)

### 1. 🎯 CEFR Bo‘yicha Level Tizimi (A1 — C2)
* **A1 Beginner, A2 Elementary, B1 Intermediate, B2 Upper-Intermediate, C1 Advanced, C2 Proficiency**
* Har bir daraja uchun maxsus kurslar, mavzular va interaktiv darslar (So‘zlar, Grammatika, Tinglash, Test, Speaking).
* **Level Final Certification Exam:** Har bir daraja yakunida 80%+ natija ko‘rsatilganda keyingi daraja ochiladi, +100 XP va sertifikat nishoni beriladi.

### 2. 🎙️ AI Speaking Studio (WOW Feature)
* Web Speech API orqali real-time nutqni yozib olish va matnga aylantirish (Speech-to-Text).
* Jonli audio to‘lqin (waveform animation) va sekundomer.
* **AI Scoring Radar:**
  - **Overall Score** (masalan: 92/100)
  - **Pronunciation** (Talaffuz)
  - **Fluency** (Nutq ravonligi)
  - **Grammar** (Grammatik tuzilish)
  - **Vocabulary** (So‘z boyligi)
* Model javobni Native inglizcha audio (TTS) orqali tinglash imkoniyati.

### 3. 🤖 AI Tutor Jonli Muloqot (Interactive Dialogue)
* **6 ta real hayotiy stsenariy:**
  - ☕ London Kafesida buyurtma berish (Cozy London Cafe)
  - 🛫 Xalqaro Aeroportda ro‘yxatdan o‘tish (Airport Check-in)
  - 🏨 Nyu-York mehmonxonasida (Hotel Reception)
  - 💼 IT amaliyot suhbati (Tech Internship Interview)
  - 🎓 Xalqaro maktabda ilk kun (First Day at School)
  - 💬 Ingliz do‘st bilan kundalik erkin suhbat (Casual Chat)
* AI javoblarini ovozli tinglash (TTS).
* Nutqdagi noaniqliklarni aniqlash va **"💡 Tip: Better way to say this"** tavsiyalari.
* Tezkor javob variantlari (Quick suggested replies).

### 4. 🧠 Spaced Repetition (SRS) Flashcards
* 3D Card Flip animatsiyasi (Inglizcha so‘z, transkripsiya, part of speech -> O‘zbekcha ma’nosi, misol gaplar).
* Native audio talaffuz.
* **5 bosqichli Leitner interval takrorlash:**
  - 🔄 Qayta (10 min)
  - ⚡ Qiyin (1 day)
  - 👍 Yaxshi (3 days)
  - 🌟 Oson (7 days)

### 5. 🎮 To‘liq Gamifikatsiya (XP, Streak, Achievements, Leaderboard)
* **XP Dvigateli:** Har bir dars (+10-20 XP), Quiz (+30 XP), Speaking (+40 XP), AI Tutor (+30 XP), Daily Challenge (+50 XP), Level Test (+100 XP).
* **7 Kunlik Streak Kalendari:** Olov animatsiyalari va uzluksizlik motivatsiyasi.
* **8+ Yutuq Medallari:** First Step, 7 Day Warrior, Confident Speaker, Speed Master, Vocabulary King, Top 10 Champion, Level Conqueror.
* **Global Leaderboard:** Haftalik va umumiy reyting, Top 3 shohsupa (Podium) va o‘quvchining joriy o‘rni.

### 6. 🗺️ OSON Xaritasi (Leaflet & OpenStreetMap)
* Toshkent va Samarqanddagi 5 ta zamonaviy filiallar:
  - 🏢 OSON Central Flagship Campus (Amir Temur ko‘chasi)
  - 🚀 OSON Youth Innovation Hub (Oybek)
  - 💡 OSON Chilonzor Smart Branch
  - 🎓 OSON Mirzo Ulug‘bek Hub
  - 🏛️ OSON Samarkand Regional Center
* Filial tafsilotlari: ish vaqti, telefon, yo‘nalishlar va Google Maps navigatsiyasi.

### 7. 👥 3 Xil Rol Boshqaruvi (USER, DOCTOR, ADMIN)
* **USER (O‘quvchi):** To‘liq o‘rganish ekotizimi, profil tahrirlash, statistika.
* **DOCTOR (Psixolog / Mutaxassis):** O‘quvchilarning psixologik holati, nutq to‘sig‘i, motivatsiyasi va o‘qish odatlarini tahlil qilish, konsultatsiya xulosalari yozish.
* **ADMIN (Boshqaruv):** Foydalanuvchilarni bloklash/faollashtirish, rollarni almashtirish, Kurslar, So‘zlar, Test savollari va Lokatsiyalarni to‘liq CMS orqali boshqarish.
* **⚡ Quick Role Switcher:** Hackathon hakamlari uchun yuqori menyuda 1-bosish orqali rollarni almashtirish imkoniyati mavjud!

---

## 💻 Loyihani Ishga Tushirish (Quick Start)

```bash
git clone https://github.com/aabduraximov2127-art/hackaton-1.git
cd hackaton-1
npm install
npm run dev
```

Brauzerda oching: **`http://localhost:5173`**

### Telegram bot (ixtiyoriy):
```bash
cp .env.example .env
# .env ichida TELEGRAM_BOT_TOKEN ni qo‘ying
npm run bot
```

### Ishlab chiqarish versiyasini yig‘ish:
```bash
npm run build
```

---

## ⚡ Hackathon Demo Qadamlari (Demo Walkthrough)

1. **Kirish / Demo Hisoblar:**
   - Yuqori o‘ng burchakdagi **Rol tugmasi** yoki **"Kirish"** oynasidan foydalaning:
     - 👦 **O‘quvchi:** `jasur@oson.uz` / `password123` (Jasur Aliyev, A2 Level, 850 XP)
     - 👩‍⚕️ **Doctor:** `doctor@oson.uz` (Dr. Nilufar Qodirova)
     - 🛡️ **Admin:** `admin@oson.uz` (OSON Administrator)
2. **Ro‘yxatdan o‘tish va Email Verification:**
   - Yangi o‘quvchi ma’lumotlarini kiriting va 6 xonali tasdiqlash kodi orqali kiring.
3. **Kurs & Dars:**
   - Kurslar bo‘limiga kiring -> Mavzuni tanlang -> So‘zlar (TTS tinglash), Grammatika, Audio dialogni bajaring.
4. **Interaktiv Quiz:**
   - 5 ta savolli testni yeching, izohlarni ko‘ring, XP va natija oynasida konfetti oling!
5. **Speaking Studio (WOW Feature):**
   - Mavzu tanlang, mikrofonda inglizcha gapiring -> AI sizga talaffuz, ravonlik va grammatika ballarini darhol hisoblab beradi!
6. **AI Tutor:**
   - London kafesi stsenariysida ovqat buyurtma qiling, AI javoblarini audio eshiting va maslahatlar oling.
  

8. **Reyting & Xarita:**
   - Leaderboardda o‘rningizni ko‘ring va Toshkent/Samarqanddagi OSON filiallarini interaktiv xaritada oching.
  
- Authentication
- Permissions
- Input validation
- Rate limiting
- CORS
- CSRF
- Error leakage
- Sensitive information leakage

---

# 12. SECRET DETECTION

AI quyidagilarni source code ichidan qidiradi:

- API keys
- Passwords
- Secret keys
- Database credentials
- JWT secrets
- SMTP passwords

Topilsa:

CRITICAL

.env ishlatilishi kerak.

---

# 13. FRONTEND

Tekshirish:

- TypeScript errors
- API error handling
- Loading states
- Empty states
- Responsive layout
- Unauthorized pages
- Token handling
- Sensitive data exposure

---

# 14. CODE QUALITY

AI quyidagilarni tekshiradi:

- DRY
- SOLID
- Reusable components
- Clear naming
- Separation of concerns
- Duplicate code
- Large functions
- Large components
- Dead code

Faqat LOW/MEDIUM darajadagi muammolar asosiy buildni bloklamaydi.

---

# 15. BLOCKING RULE

Build faqat quyidagi holatlarda BLOCK qilinadi:

- CRITICAL security issue
- HIGH authentication issue
- HIGH authorization issue
- Critical data corruption
- Main feature completely broken

LOW va oddiy MEDIUM muammolar:

WARNING

sifatida chiqariladi.

---

# 16. FALSE POSITIVEGA MUNOSABAT

AI:

"Menimcha bu xato"

degan holatni avtomatik BLOCK qilmasligi kerak.

Agar evidence yetarli bo‘lmasa:

REVIEW

beriladi.

AI hech qachon muammoni yashirmaydi.

---

# 17. CODE REVIEW PRINCIPLE

AI quyidagi prinsipga amal qiladi:

1. Evidence first
2. Severity second
3. Fix suggestion third

AI taxminni fact sifatida ko‘rsatmasligi kerak.

---

# 18. FINAL REPORT

Review oxirida:

Total issues: X

Critical: X
High: X
Medium: X
Low: X
Review: X

Final status:

PASS
yoki

WARNING
yoki

BLOCK

---

# 19. PASS

Agar:

Critical = 0
High = 0

bo‘lsa:

PASS

Medium va Low mavjud bo‘lishi mumkin.

Ular reportda ko‘rsatiladi.

---

# 20. FINAL PRINCIPLE

OSON AI Code Reviewer:

Xatoni yashirmaydi.

Xatoni ataylab o'tkazib yubormaydi.

Lekin har bir kichik warning sababli loyihani BLOCK ham qilmaydi.

Asosiy prinsip:

REAL BUG → REPORT

CRITICAL BUG → BLOCK

MINOR BUG → WARNING

UNCERTAIN → REVIEW

NO ISSUE → PASS

---

> **“Oson — English learning should not feel like homework. Learn. Play. Speak. Level up.”**
