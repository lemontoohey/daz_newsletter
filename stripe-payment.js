/**
 * Stripe Payment Handler
 * Handles "Purchase Now" button clicks
 */

(function() {
    'use strict';

    // Stripe Payment Link - Replace with your actual Stripe Payment Link URL
    // To create: Stripe Dashboard > Products > Payment Links > Create Payment Link
    // Set price to $990 AUD, one-time payment
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/bJe14n3XGdRYeyU5sWd3i01';

    document.addEventListener('DOMContentLoaded', function() {
        // Find all "Purchase Now" / enrollment buttons
        const enrollmentButtons = document.querySelectorAll('.btn-pricing-primary, #activate-enrollment-btn');
        
        enrollmentButtons.forEach(function(button) {
            if (button.textContent.trim().includes('Purchase Now') || 
                button.textContent.trim().includes('Enrollment') ||
                button.id === 'activate-enrollment-btn') {
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
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
