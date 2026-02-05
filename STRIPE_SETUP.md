# Stripe Payment Integration Setup

## Current Implementation

The site uses **Stripe Payment Links** for a simple, secure payment solution that works without a backend server.

## Setup Instructions

### Step 1: Create a Stripe Payment Link

1. Log into your Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to: **Products** → **Payment Links** → **Create Payment Link**
3. Configure the payment:
   - **Product Name**: Series 01: Biennial Institutional License
   - **Price**: $990.00 AUD (including GST)
   - **Payment Type**: One-time payment
   - **Description**: Full Unlimited Access to the Cullen, Blackman, & Coburn Trilogy. Complete Years 9–12 Teacher Resource Packs. 24-Month School-Wide Site License.
4. Under **After payment**, set:
   - **Success URL**: `https://anthology.greenturtleproductions.com.au/success.html`
   - **Cancel URL**: `https://anthology.greenturtleproductions.com.au/`
5. Copy the Payment Link URL (format: `https://buy.stripe.com/xxxxx`)

### Step 2: Update stripe-payment.js

1. Open `stripe-payment.js`
2. Replace `YOUR_PAYMENT_LINK_ID` with your actual Stripe Payment Link URL:
   ```javascript
   const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_ACTUAL_LINK_ID';
   ```

### Step 3: Create Success Page (Optional)

Create `success.html` with a thank you message for successful payments.

## Alternative: Backend Integration (Future)

If you want to use Stripe Checkout Sessions (requires backend):

1. Create a server endpoint that creates a Checkout Session
2. Use the Stripe API with your secret key (from .env)
3. Update `stripe-payment.js` to call your endpoint instead

## Current Configuration

- **Email**: admin@greenturtleproductions.com.au
- **Payment Amount**: $990 AUD (including GST)
- **Payment Type**: One-time payment
- **License Term**: 24 months

## Testing

Use Stripe Test Mode:
- Test Payment Link: Use test mode in Stripe Dashboard
- Test Card: 4242 4242 4242 4242
- Any future expiry date and CVC
