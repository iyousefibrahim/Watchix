# Watchix

Watchix is a modern movies & TV shows platform built with Angular v19 and powered by The Movie Database (TMDB) API. The app features a fully responsive UI, language support, reusable components, clean state management with Angular Signals, and performance optimizations — all wrapped in a sleek interface using daisyUI and Tailwind CSS.

## 🚀 Features

### 🔧 Core Functionality
- Browse **Trending**, **Popular**, **Top Rated**, **Upcoming**, and **Latest** Movies & TV Shows.
- Multilingual support (**English / Arabic**) using `ngx-translate`.
- Search functionality with instant results.
- View trailers using embedded YouTube videos.
- Smooth page navigation with **routing** and **lazy loading**.

### 🎨 UI/UX
- Built using **Angular v19** + **daisyUI** + **Tailwind CSS**.
- Responsive design with dark mode support.
- Skeleton loaders for smooth content loading.
- Modular & reusable UI components.

### 🌍 Internationalization (i18n)
- Language switcher with instant toggle using `ngx-translate`.
- Interceptor-based automatic `language` query param injection for TMDB API.

### 🧠 Angular Signals
- Used `@angular/core` Signals for state management instead of traditional services.
- Input Signals (`input()`) used for better component communication.

### 🛠 Interceptors
- Global language interceptor to dynamically inject the `language` param into each request.

## 🧪 Technologies Used

### 🖥 Frontend
- Angular v19
- Angular Signals + Input Signals
- Tailwind CSS + daisyUI
- ngx-translate (for i18n)
- TMDB API

## 📌 Notes

- All data is fetched from the public TMDB API.
- Trailers are embedded via YouTube; fallback to poster if not available.
- Language-aware data is fetched using TMDB’s `language` query param.

---