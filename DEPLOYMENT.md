# EduTrack Deployment Guide

This guide covers deploying EduTrack to various platforms for production use.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Common Issues](#common-issues)

---

## Prerequisites

- MongoDB Atlas account (free tier available)
- Git installed locally
- Node.js v14+ installed
- Account on deployment platform (Render, Heroku, Vercel, or Netlify)

---

## Backend Deployment

### Option 1: Deploy to Render (Recommended - Free Tier)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name:** `edutrack-backend`
     - **Environment:** `Node`
     - **Region:** Choose closest to your users
     - **Branch:** `main`
     - **Root Directory:** `server`
     - **Build Command:** `npm install`
     - **Start Command:** `node index.js`

3. **Add Environment Variables:**
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5001
   NODE_ENV=production
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the deployed URL (e.g., `https://edutrack-backend.onrender.com`)

### Option 2: Deploy to Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app:**
   ```bash
   cd server
   heroku create edutrack-backend
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set MONGO_URI="your_mongodb_connection_string"
   heroku config:set NODE_ENV=production
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 3: Deploy to Railway

1. **Create account** at [railway.app](https://railway.app)
2. **Create new project** from GitHub repository
3. **Configure:**
   - Root directory: `server`
   - Start command: `node index.js`
4. **Add environment variables** in Settings
5. **Deploy** and get your URL

---

## Frontend Deployment

### Option 1: Deploy to Netlify (Recommended)

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Update client/.env:**
   ```env
   REACT_APP_BASE_URL=https://your-backend-url.onrender.com
   ```

3. **Deploy via Netlify CLI:**
   ```bash
   cd client
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod
   ```

4. **Or deploy via Netlify UI:**
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Configure build settings:
     - **Base directory:** `client`
     - **Build command:** `npm run build`
     - **Publish directory:** `client/build`
   - Add environment variable:
     - Key: `REACT_APP_BASE_URL`
     - Value: Your backend URL
   - Click "Deploy site"

5. **The `netlify.toml` is already configured:**
   ```toml
   [build]
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Option 2: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd client
   vercel --prod
   ```

3. **Configure environment variables:**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add `REACT_APP_BASE_URL` with your backend URL

### Option 3: Deploy to GitHub Pages (Static Only)

**Note:** This requires a static backend or serverless functions.

1. **Update `package.json` in client directory:**
   ```json
   {
     "homepage": "https://yourusername.github.io/EduTrack"
   }
   ```

2. **Install gh-pages:**
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts to `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

---

## Environment Variables

### Backend (.env in server/)

```env
# Required
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/edutrack?retryWrites=true&w=majority
PORT=5001
NODE_ENV=production

# Optional
JWT_SECRET=your_super_secret_key_for_production
JWT_EXPIRE=30d
```

### Frontend (.env in client/)

```env
# Required
REACT_APP_BASE_URL=https://your-backend-url.com

# Optional
REACT_APP_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

---

## Database Setup

### MongoDB Atlas Configuration

1. **Create a MongoDB Atlas account:**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create a new cluster:**
   - Choose "Shared" for free tier
   - Select cloud provider and region
   - Click "Create Cluster"

3. **Create database user:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose authentication method (Username & Password)
   - Set username and strong password
   - Grant "Read and write to any database" privileges

4. **Whitelist IP addresses:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development/testing: Add "0.0.0.0/0" (Allow from anywhere)
   - For production: Add specific IPs of your deployment platforms

5. **Get connection string:**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `edutrack` or your preferred name

6. **Seed guest accounts (Optional):**
   ```bash
   cd server
   node seedGuestAccounts.js
   ```

---

## Production Checklist

Before deploying to production, ensure:

### Security
- [ ] All `.env` files are in `.gitignore`
- [ ] No sensitive data in code or commits
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Strong database user password
- [ ] CORS configured properly in backend

### Backend
- [ ] MongoDB connection string updated
- [ ] Environment variables set on hosting platform
- [ ] `NODE_ENV=production` set
- [ ] Error handling implemented
- [ ] Logging configured

### Frontend
- [ ] `REACT_APP_BASE_URL` points to production backend
- [ ] Build succeeds without errors
- [ ] All routes work correctly
- [ ] Images and assets load properly
- [ ] Responsive design tested

### Testing
- [ ] Test all user roles (Admin, Teacher, Student)
- [ ] Test guest login functionality
- [ ] Test CRUD operations
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Check console for errors

### Performance
- [ ] Frontend bundle optimized
- [ ] Images optimized
- [ ] API responses cached where appropriate
- [ ] Database queries optimized with indexes

---

## Common Issues

### Issue: CORS Error

**Solution:** Update CORS configuration in `server/index.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://your-frontend-url.com',
  credentials: true
}));
```

### Issue: MongoDB Connection Timeout

**Solutions:**
1. Check if IP address is whitelisted in MongoDB Atlas
2. Verify connection string is correct
3. Ensure database user has proper permissions
4. Check if cluster is active

### Issue: Build Fails on Netlify/Vercel

**Solutions:**
1. Check build logs for specific errors
2. Ensure all dependencies are in `package.json`
3. Verify Node version compatibility
4. Clear build cache and redeploy

### Issue: Environment Variables Not Working

**Solutions:**
1. Restart the application after adding variables
2. For React: Ensure variables start with `REACT_APP_`
3. Check if variables are set in deployment platform dashboard
4. For local: Check `.env` file exists and is not in `.gitignore`

### Issue: Routes Not Working (404 on Refresh)

**Solution for Netlify:** The `netlify.toml` file should handle this. If not:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Solution for Vercel:** Create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## Monitoring and Maintenance

### Recommended Tools

- **Uptime Monitoring:** UptimeRobot (free)
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics
- **Database Monitoring:** MongoDB Atlas built-in monitoring

### Regular Maintenance

1. **Weekly:**
   - Check application logs for errors
   - Monitor database storage usage
   - Verify all features working

2. **Monthly:**
   - Update dependencies (check for security updates)
   - Review database performance
   - Check disk space and memory usage

3. **Quarterly:**
   - Review and optimize database indexes
   - Analyze and improve slow queries
   - Update documentation

---

## Rollback Strategy

If deployment fails or issues occur:

### Render/Heroku
- Go to deployment history
- Click "Redeploy" on last working version

### Netlify/Vercel
- Go to "Deploys" section
- Find last working deployment
- Click "Publish deploy"

### Manual Rollback
```bash
git revert <commit-hash>
git push origin main
```

---

## Support

For deployment issues:
- Check platform-specific documentation
- Review application logs
- Open issue on GitHub with deployment logs
- Contact platform support

---

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Node.js Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Good luck with your deployment! 🚀**
