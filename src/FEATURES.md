# Sheet Music E-Commerce Platform Features

## Pages Implemented

### 1. Homepage
- **Desktop**: Clean hero section, 5-column grid of recently updated products, feature cards
- **Mobile**: Vertical scrollable product cards, responsive hero section, sticky navigation

### 2. Product List Page
- **Desktop**: 3-4 column grid layout, sidebar filters for category and difficulty
- **Mobile**: 2-column grid, bottom drawer filter modal, touch-friendly controls

### 3. Product Detail Page
- **Desktop**: Two-column layout with blurred preview image and product info, embedded YouTube player
- **Mobile**: Stacked layout with sticky bottom purchase bar (44x44px touch-friendly buttons)

### 4. Shopping Cart
- **Desktop & Mobile**: Responsive cart items with quantity controls, order summary sidebar, remove items functionality

### 5. Checkout & Payment
- **Multi-step process**: Cart Review → Payment → Complete
- **Payment Methods**:
  - Credit/Debit Card (with form fields)
  - Bank Transfer (무통장입금) with bank selection
  - Virtual Account (가상계좌)
  - Naver Pay (green branded button)
  - Kakao Pay (yellow branded button)
  - Toss Pay (blue branded button)
  - PayPal
- **Mobile**: Simplified checkout flow, collapsible sections, large touch-friendly buttons
- **Desktop**: Multi-step indicator, sidebar order summary

### 6. Payment Processing
- Full-screen modal with loading animation
- Redirect notices for external payment methods
- "Do not close" warning

### 7. Order Confirmation
- Success animation with confetti effect
- Download buttons for purchased PDFs
- Order summary with order number
- Email confirmation notice
- Quick actions: Go to Downloads, Continue Shopping

### 8. Admin Dashboard
- **Desktop**: Table view with sortable columns, stats cards
- **Mobile**: Card-based layout with bottom tab navigation
- Order management with payment status filters
- Stats: Total Revenue, Orders, Pending, Customers
- Order actions: View Details, Send Receipt, Process Refund
- Status badges: Completed (green), Pending (yellow), Failed (red), Processing (blue), Refunded (gray)

### 9. User Account
- Purchase history with download buttons
- Payment method management
- Order receipts/invoices
- Re-download functionality for purchased items
- Payment status indicators

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: Mobile (320-768px), Tablet (768-1024px), Desktop (1024px+)
- Touch-friendly buttons (minimum 44x44px on mobile)
- Sticky bottom navigation on mobile
- Hamburger menu for mobile navigation

### Payment System UI
- Multiple Korean payment methods (Naver, Kakao, Toss)
- International options (PayPal, Credit Card)
- Bank transfer with virtual account support
- Security badges (SSL, PG사 logos)
- Terms and conditions checkbox
- Clear payment flow with progress indicators

### Shopping Features
- Add to cart functionality
- Quantity adjustment
- Cart persistence (via React state)
- Price calculations
- Instant checkout option

### Design
- Clean, minimalist aesthetic
- Music-themed icons and styling
- Trust signals throughout checkout
- Clear CTAs and visual hierarchy
- Loading states and animations
- Error-free payment flow UI

### Korean Market Features
- Price display in KRW (₩)
- Korean payment methods prominently displayed
- Bank transfer (무통장입금) support
- Virtual account (가상계좌) option
- 24-hour deposit deadline notices

## Mock Data
- 10 sample sheet music products
- 3 sample orders with different payment statuses
- Product categories: Classical, Contemporary, Jazz, Pop
- Difficulty levels: Beginner, Intermediate, Advanced, Expert

## Technology Stack
- React with TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons
- Motion (Framer Motion) for animations
- Context API for state management
