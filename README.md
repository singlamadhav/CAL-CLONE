# 🚀 Cal.com Clone (Full-Stack Scheduling App)

A minimal **Cal.com-inspired scheduling application** built with modern full-stack technologies.
Create events, manage availability, and allow others to book time slots seamlessly.

---

## ✨ Features

* 📅 Create and manage event types
* ⏱ Set availability (day & time slots)
* 🔗 Public booking page (`/book/[slug]`)
* 🧑 Booking form (name + email)
* 🚫 Prevent double booking
* 📋 Booking dashboard (view & cancel)
* ⚡ Auto slot generation based on availability

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** PostgreSQL
* **ORM:** Prisma

---

## 📁 Project Structure

```
cal-clone/
├── app/
│   ├── page.js
│   ├── dashboard/
│   ├── bookings/
│   ├── book/[slug]/
│   └── api/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── lib/
├── package.json
├── tailwind.config.js
```

---

## ⚙️ Setup (Local Development)

### 1. Clone repo

```bash
git clone https://github.com/your-username/cal-clone.git
cd cal-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

Create `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/calclone"
```

### 4. Setup database

```bash
npx prisma db push
node prisma/seed.js
```

### 5. Run app

```bash
npm run dev
```

👉 Open: http://localhost:3000

---

## 🌐 Deployment (Render)

### 1. Create PostgreSQL database on Render

### 2. Create Web Service

### 3. Add Environment Variable:

```env
DATABASE_URL=your_render_internal_db_url
NODE_ENV=production
```

### 4. Build Command:

```bash
npm install --include=dev && npx prisma generate && npx prisma db push && node prisma/seed.js && npm run build
```

### 5. Start Command:

```bash
npm start
```

---

## 🔗 Live Demo

👉 https://cal-clone-1-e89g.onrender.com

---



## 🚧 Future Improvements

* 🔐 Authentication (Google OAuth)
* 💳 Stripe payments
* 🌍 Timezone support
* 📧 Email notifications
* 📊 Analytics dashboard

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
