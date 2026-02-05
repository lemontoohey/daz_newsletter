/**
 * Stripe Payment Handler
 * Handles "Activate School Enrollment" button clicks
 */

(function() {
    'use strict';

    // Stripe Payment Link - Replace with your actual Stripe Payment Link URL
    // To create: Stripe Dashboard > Products > Payment Links > Create Payment Link
    // Set price to $990 AUD, one-time payment
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID';

    document.addEventListener('DOMContentLoaded', function() {
        // Find all "Activate School Enrollment" buttons
        const enrollmentButtons = document.querySelectorAll('.btn-pricing-primary');
        
        enrollmentButtons.forEach(function(button) {
            // Check if this is the enrollment button (not other primary buttons)
            if (button.textContent.trim().includes('Activate School Enrollment') || 
                button.textContent.trim().includes('Enrollment')) {
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Redirect to Stripe Payment Link
                    if (STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID') {
                        window.location.href = STRIPE_PAYMENT_LINK;
                    } else {
                        // Fallback: Show alert if payment link not configured
                        alert('Payment link not configured. Please contact support.');
                        console.error('Stripe Payment Link not configured. Please update stripe-payment.js with your Payment Link URL.');
                    }
                });
            }
        });
    });
})();
