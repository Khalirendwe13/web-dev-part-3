# TODO: Remove HTML Form Elements and Handle with Pure JS

## Steps to Complete

- [x] Edit pages/contact.html: Replace <form id="contact-form"> with <div id="contact-form">, remove 'required' attributes from inputs, change <button type="submit"> to <button id="submit-contact">
- [x] Edit pages/enquire.html: Replace <form id="enquiry-form"> with <div id="enquiry-form">, remove 'required' attributes from inputs, change <button type="submit"> to <button id="submit-enquiry">
- [x] Edit pages/testimonials.html: Replace newsletter <form id="newsletter-form"> with <div id="newsletter-form">, remove 'required' attribute from input, change <button type="submit"> to <button id="submit-newsletter">
- [x] Edit pages/news.html: Replace newsletter <form id="newsletter-form"> with <div id="newsletter-form">, remove 'required' attribute from input, change <button type="submit"> to <button id="submit-newsletter">
- [ ] Edit js/script.js: Update validateFormEnhanced to accept container and formType, query inputs within container. Update handleFormSubmitEnhanced to accept container. Update handleNewsletterSubmit to accept container. In DOMContentLoaded, add click listeners to buttons calling handlers with containers, remove form submit listeners, update input listeners to use divs.
- [ ] Test: Open pages in browser, fill forms, submit to verify JS validation and submission work without HTML attributes.
