# 💊 Multi-Vendor Medicine Selling E-commerce Website - Client

This is the **frontend** of a MERN stack project where multiple vendors can sell medicines online. Built with React, Tailwind CSS, Firebase, Stripe, React Hook Form, TanStack Query, and more.

## 🔗 Live Site: [Visit Now](https://multi-vendor-medicine-e266c.web.app)

(Admin, Seller & User credential info provided below)

---

## 🔥 Key Features (Client Side)

1. Responsive design for mobile, tablet, and desktop (including dashboard)
2. Firebase authentication with Google, GitHub & email/password login
3. Role-based dashboard for Admin, Seller, and User
4. Dynamic slider based on Admin advertisements
5. Category-based medicine filtering and navigation
6. Add-to-cart with quantity control and checkout flow
7. Stripe-based secure payment and PDF invoice generation
8. Realtime Toast and SweetAlert notifications for all actions
9. React Hook Form and TanStack Query integration throughout
10. Environment variables used for Firebase config & API keys

---

## 📁 Technologies Used

- React 19
- TailwindCSS + Daisy UI
- Firebase Auth
- Stripe Payment
- React Hook Form
- React Router v7
- Axios
- TanStack React Query
- SweetAlert2 & React Toastify
- React Data Table, React Print
- Lottie, SwiperJS, and more

---

## 📂 Project Structure

```
📁 src/
├── components/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── store/
└── utils/
```

---

## 🛠️ Run Locally

1. Clone the project

```bash
git clone https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-FajlaRabby24.git
```

---

## 🔐 Environment Variables

Create a `.env` file and add the following Firebase keys:

```env
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_root_api_url=server-site-link
VITE_root_api=root_server_api_url
VITE_CLOUDINARY_CLOUD_NAME=clooudinary_cloude_name
VITE_STRIPE_PUBLIC_KEY=stripe_public_key
VITE_emailjs_server_id=emailjs_server_id
VITE_emailjs_template_id=emailjs_template_id
```
