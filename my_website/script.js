// Replace placeholders in the page and wire up product links
(function(){
  const YOUR_NAME = 'YOUR_NAME';
  const YOUR_IR_ID = 'YOUR_IR_ID'; // e.g. ?rep=123456 OR &affiliateId=...
  const PHONE_NUMBER = 'PHONE_NUMBER'; // e.g. 919999888777 (no +)
  const QNET_PRODUCT_LINK_BASE = 'https://www.qnet.net/shop/product?name='; // replace if you have a different structure
  const FORM_ENDPOINT = 'FORM_ENDPOINT'; // also set in lead.html

  // insert name & year
  document.querySelectorAll('#ir-name, #ir-name-2').forEach(n => n.textContent = YOUR_NAME);
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  document.getElementById('year2') && (document.getElementById('year2').textContent = new Date().getFullYear());
  document.getElementById('year3') && (document.getElementById('year3').textContent = new Date().getFullYear());

  // WhatsApp link
  const waText = encodeURIComponent(`Hi ${YOUR_NAME}, I have a question about QNet products.`);
  const waLink = PHONE_NUMBER ? `https://wa.me/${PHONE_NUMBER}?text=${waText}` : '#';
  const waEl = document.getElementById('whatsapp-link');
  if(waEl) waEl.href = waLink;

  // homepage hero Order via QNet button - link to products page
  const heroOrder = document.getElementById('buy-now-hero');
  if(heroOrder) heroOrder.href = 'products.html';

  // product CTA buttons wiring
  const productButtons = document.querySelectorAll('[data-product]');
  productButtons.forEach(btn => {
    btn.addEventListener('click', function(e){
      e.preventDefault();
      const product = encodeURIComponent(btn.getAttribute('data-product') || '');
      // Build QNet link: product name + your IR identifier appended
      // IMPORTANT: replace YOUR_IR_ID with the real referral query string required by your country/QNet
      const link = `${QNET_PRODUCT_LINK_BASE}${product}${YOUR_IR_ID ? (YOUR_IR_ID.startsWith('?') ? '&' : '?') + YOUR_IR_ID : ''}`;
      window.open(link, '_blank');
    });
  });

  // set referral hidden field on lead form
  const referralField = document.getElementById('referral-field');
  if(referralField) referralField.value = YOUR_IR_ID;

  // If you used FORM_ENDPOINT placeholder in the lead.html file,
  // please replace it with your real Formspree or backend endpoint.
})();
