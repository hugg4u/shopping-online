# B2C Client - Perfume Shop

Frontend client cho hệ thống shopping online, được xây dựng với Next.js 14.

## 🚀 Deployment trên Vercel

### Cấu hình đã sẵn sàng:
- ✅ `vercel.json` - Cấu hình Vercel
- ✅ `next.config.js` - Tối ưu cho Vercel & monorepo
- ✅ `tsconfig.json` - TypeScript paths cho monorepo
- ✅ `env.example` - Environment variables template

### Environment Variables cần thiết:
```env
NEXT_PUBLIC_SITE=CLIENT
NEXT_PUBLIC_API_BASE_URL=https://8080--main--hungpc--hung.coder1.hirogo-dev.com
NEXT_PUBLIC_APP_NAME=Perfume Shop Client
NEXT_PUBLIC_APP_DESCRIPTION=E-commerce platform for perfumes
NEXT_PUBLIC_CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### Deploy qua Vercel Dashboard:

1. **Import Repository**:
   - Truy cập https://vercel.com/dashboard
   - Click "New Project"
   - Import Git repository

2. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `packages/b2c-client`
   - **Build Command**: `yarn build`
   - **Output Directory**: `.next`
   - **Install Command**: `yarn install`

3. **Set Environment Variables** như trên

### Deploy qua CLI:
```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🛠 Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## 📋 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Ant Design
- **State Management**: Zustand + React Query
- **API Client**: Axios

## 🔗 API Integration

Client kết nối với API server tại: `https://8080--main--hungpc--hung.coder1.hirogo-dev.com`

Các endpoint chính:
- Authentication: `/auth/*`
- Products: `/product/*`
- Cart: `/cart/*`
- Orders: `/order/*`
- User: `/user/*`

## 📁 Project Structure

```
packages/b2c-client/
├── components/          # React components
├── pages/              # Next.js pages
├── styles/             # CSS styles
├── types/              # TypeScript types
├── hooks/              # Custom hooks
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── vercel.json         # Vercel deployment config
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
