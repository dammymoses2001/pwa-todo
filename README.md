# Todo PWA - Progressive Web App

A modern, offline-capable Todo application built with React, Vite, and Progressive Web App (PWA) technologies. This app works seamlessly both online and offline, providing a native app-like experience in the browser.

## 🚀 Features

- ✅ **Offline Support** - Works without internet connection
- 📱 **PWA Capabilities** - Installable on mobile and desktop
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🎨 **Modern UI** - Styled with Tailwind CSS
- 🔄 **Auto-Updates** - Automatic service worker updates
- 💾 **Smart Caching** - Intelligent caching strategies for different resource types
- 🌐 **Cross-Platform** - Works on all modern browsers and devices

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 5.0.0
- **PWA Plugin**: vite-plugin-pwa 1.0.0
- **Styling**: Tailwind CSS 3.3.0
- **Service Worker**: Workbox (via vite-plugin-pwa)
- **Language**: JavaScript/JSX

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-pwa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔧 PWA Configuration

The PWA is configured in `vite.config.js` with the following features:

### Service Worker Strategy
- Uses `generateSW` strategy for automatic service worker generation
- Automatic registration and updates
- Development mode enabled for testing

### Caching Strategies
- **Static Assets**: Cache-first strategy for JS, CSS, HTML files
- **Images**: Cache-first with 30-day expiration
- **API Calls**: Network-first with cache fallback
- **Runtime Caching**: Intelligent caching for different resource types

### Manifest Configuration
- **Name**: Todo PWA
- **Short Name**: TodoPWA
- **Display**: Standalone (native app-like experience)
- **Theme Color**: #646cff
- **Background Color**: #ffffff
- **Start URL**: /
- **Icon**: Uses Vite's default SVG icon

## 📱 PWA Features

### Offline Functionality
The app continues to work when offline by:
- Caching all essential resources during the first visit
- Serving cached content when network is unavailable
- Providing offline indicators and status updates

### Installation
Users can install the app:
1. **Desktop**: Click the install button in the browser's address bar
2. **Mobile**: Use "Add to Home Screen" from the browser menu
3. **Chrome**: Look for the install prompt or use the three-dot menu

### Auto-Updates
The app automatically:
- Checks for new versions
- Downloads updates in the background
- Prompts users to refresh when updates are available

## 🗂️ Project Structure

```
todo-pwa/
├── public/
│   ├── vite.svg           # App icon
│   └── ...
├── src/
│   ├── components/        # React components
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point with PWA setup
│   └── index.css         # Tailwind CSS imports
├── vite.config.js        # Vite and PWA configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🧪 Testing PWA Functionality

### Testing Offline Behavior
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Serve the built files**:
   ```bash
   npx serve dist
   ```

3. **Test offline functionality**:
   - Open the app in your browser
   - Open Developer Tools → Application tab
   - Check "Offline" in the Service Workers section
   - Refresh the page - it should still work!

### Testing Installation
1. Open the app in Chrome/Edge
2. Look for the install button in the address bar
3. Click to install the PWA
4. The app will be added to your applications

## 🔍 Development Tips

### Debugging Service Worker
- Use Chrome DevTools → Application → Service Workers
- Check the Console for service worker logs
- Use the "Update on reload" option during development

### Cache Management
- Clear cache from Application → Storage → Clear Storage
- Use "Bypass for network" during development
- Check cached resources in Application → Cache Storage

### PWA Audit
- Use Lighthouse in Chrome DevTools
- Check PWA score and recommendations
- Ensure all PWA criteria are met

## 🚀 Deployment

### Building for Production
```bash
npm run build
```

This creates a `dist/` folder with:
- Optimized and minified assets
- Generated service worker
- Web app manifest
- All necessary PWA files

### Hosting Requirements
- Must be served over HTTPS (except localhost)
- Server should support service worker files
- Proper MIME types for manifest and service worker

### Recommended Hosting Platforms
- **Netlify**: Automatic PWA optimization
- **Vercel**: Built-in PWA support
- **GitHub Pages**: Works with proper configuration
- **Firebase Hosting**: Excellent PWA support

## 🎯 Usage

1. **Add Todos**: Create new todo items
2. **Mark Complete**: Check off completed tasks
3. **Work Offline**: Continue using the app without internet
4. **Install**: Add to home screen for native app experience
5. **Auto-Sync**: Data syncs when connection is restored

## 🐛 Troubleshooting

### Common Issues

**App doesn't work offline**
- Ensure the app is built with `npm run build`
- Check that service worker is registered in DevTools
- Verify cache is populated in Application → Cache Storage

**Service worker not updating**
- Clear browser cache and storage
- Use "Update on reload" in DevTools
- Check for console errors

**PWA not installable**
- Ensure manifest.json is properly configured
- Check Lighthouse PWA audit
- Verify HTTPS (required for PWA)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test PWA functionality
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [Vite PWA Plugin Documentation](https://vite-pwa-org.netlify.app/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [PWA Best Practices](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

Built with ❤️ using React, Vite, and PWA technologies.
