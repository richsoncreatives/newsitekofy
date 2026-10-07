import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const contactPath = path.join(rootDir, 'contact.html');
let content = fs.readFileSync(contactPath, 'utf8');

// 1. Replace the <form ... </form> tag
const formOldRegex = /<form class="space-y-6 border border-border bg-linen p-8 md:p-10">[\s\S]*?<\/form>/i;

const newFormHtml = `<form id="unifiedInquiryForm" action="https://formsubmit.co/richson20@gmail.com" method="POST" class="space-y-6 border border-border bg-linen p-8 md:p-10">
  <input type="hidden" name="_subject" value="New Inquiry - Eric Richson Darko Archive">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_template" value="table">
  <div class=max-w-3xl>
    <p class="eyebrow mb-4">Unified Inquiry Form</p>
    <h2 class="font-display text-3xl font-semibold leading-tight text-obsidian md:text-[2.5rem]">Place an order or book a consultation.</h2>
  </div>
  <div>
    <label class=eyebrow>Name</label>
    <input required type="text" name="name" id="inquiryName" class="mt-2 w-full border-b border-border py-2 outline-none focus:border-maritime" placeholder="Your full name" value="">
  </div>
  <div>
    <label class=eyebrow>Email</label>
    <input required type="email" name="email" id="inquiryEmail" class="mt-2 w-full border-b border-border py-2 outline-none focus:border-maritime" placeholder="your.email@example.com" value="">
  </div>
  <div>
    <label class=eyebrow>Inquiry Category</label>
    <select name="category" id="inquiryCategory" class="mt-2 w-full border-b border-border bg-linen py-2 outline-none focus:border-maritime">
      <option selected value="Book Order via MoMo / OmniBSIC">Book Order via MoMo / OmniBSIC</option>
      <option value="Publishing Consultation">Publishing Consultation</option>
      <option value="Richson Creatives Tech / Brand Retainer">Richson Creatives Tech / Brand Retainer</option>
      <option value="Counseling / Speaking Engagement">Counseling / Speaking Engagement</option>
    </select>
  </div>
  <div>
    <label class=eyebrow>Payment Reference (optional)</label>
    <input type="text" name="payment_reference" id="inquiryPaymentRef" placeholder="MoMo / OmniBSIC transaction ref" class="mt-2 w-full border-b border-border py-2 outline-none focus:border-maritime" value="">
  </div>
  <div>
    <label class=eyebrow>Message / Brief</label>
    <textarea rows="4" required name="message" id="inquiryMessage" placeholder="Provide brief details on your consultation requirements or book order delivery address..." class="mt-2 w-full resize-none border-b border-border py-2 outline-none focus:border-maritime"></textarea>
  </div>
  <button type="submit" id="inquirySubmitBtn" class="btn-navy w-full cursor-pointer flex items-center justify-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send h-4 w-4">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
      <path d="m21.854 2.147-10.94 10.939"></path>
    </svg>
    Submit Inquiry
  </button>
</form>`;

if (formOldRegex.test(content)) {
  content = content.replace(formOldRegex, newFormHtml);
  console.log("Replaced form HTML successfully.");
} else {
  // If id is already unifiedInquiryForm, check if already updated
  if (content.includes('id="unifiedInquiryForm"')) {
    console.log("Form HTML already updated.");
  } else {
    console.error("Could not find form regex in contact.html");
  }
}

// 2. Replace the contact form submit handler in script
const oldScriptStart = content.indexOf("// 5. Interactive handling for contact form");
const oldScriptEnd = content.indexOf("if (document.readyState === 'loading')");

if (oldScriptStart !== -1 && oldScriptEnd !== -1) {
  const newScript = `// 5. Interactive handling for contact form in contact.html: Real email delivery to richson20@gmail.com
    const contactForm = document.getElementById('unifiedInquiryForm') || document.querySelector('form.space-y-6');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending to richson20@gmail.com...';
        }

        const nameVal = (document.getElementById('inquiryName') || contactForm.querySelector('input[name="name"]') || {}).value || 'Inquirer';
        const emailVal = (document.getElementById('inquiryEmail') || contactForm.querySelector('input[name="email"]') || {}).value || '';
        const categoryVal = (document.getElementById('inquiryCategory') || contactForm.querySelector('select[name="category"]') || {}).value || 'General Inquiry';
        const paymentVal = (document.getElementById('inquiryPaymentRef') || contactForm.querySelector('input[name="payment_reference"]') || {}).value || 'None';
        const messageVal = (document.getElementById('inquiryMessage') || contactForm.querySelector('textarea[name="message"]') || {}).value || '';

        const formData = {
          Name: nameVal,
          Email: emailVal,
          "Inquiry Category": categoryVal,
          "Payment Reference": paymentVal,
          Message: messageVal,
          _subject: "New Website Inquiry from " + nameVal + " [" + categoryVal + "]",
          _captcha: "false",
          _template: "table"
        };

        fetch('https://formsubmit.co/ajax/richson20@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(result) {
          const isActivationNotice = result && result.message && result.message.toLowerCase().includes('activation');
          contactForm.innerHTML = \`
            <div style="padding: 2.5rem; text-align: center; background: #ffffff; border: 1px solid #c5a059; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
              <div style="width: 3.25rem; height: 3.25rem; margin: 0 auto 1.25rem; border-radius: 50%; background: #0f2b46; color: #c5a059; display: flex; align-items: center; justify-content: center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style="font-family: Georgia, serif; font-size: 1.5rem; font-weight: 700; color: #0f2b46; margin-bottom: 0.5rem;">Inquiry Dispatched to Inbox</h3>
              <p style="font-size: 0.95rem; color: #374151; line-height: 1.6; max-width: 520px; margin: 0 auto 1.25rem;">
                Thank you, <strong>\${nameVal}</strong>! Your message and brief have been transmitted directly to Eric Richson Darko's inbox (<strong>richson20@gmail.com</strong>).
              </p>
              \${isActivationNotice ? \`
                <div style="background: #fffbeb; border: 1px solid #f59e0b; padding: 0.85rem 1rem; border-radius: 4px; font-size: 0.85rem; color: #92400e; margin: 1rem auto 1.5rem; max-width: 520px; text-align: left;">
                  <strong>One-Time Setup Note:</strong> FormSubmit has sent a quick activation confirmation to <strong>richson20@gmail.com</strong>. Please check your inbox and click "Activate Form" once to complete authorization.
                </div>
              \` : ''}
              <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;">
                <a href="/index.html" class="btn-navy" style="text-decoration: none; padding: 0.65rem 1.25rem;">Return to Home</a>
                <a href="https://wa.me/233262685856?text=\${encodeURIComponent('Hello Pastor Eric, I just submitted an inquiry on your website: ' + categoryVal + ' - Name: ' + nameVal)}" target="_blank" class="btn-outline" style="text-decoration: none; padding: 0.65rem 1.25rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                  <span>Direct WhatsApp Escalation</span> ↗
                </a>
              </div>
            </div>
          \`;
        })
        .catch(function(err) {
          console.warn('Direct AJAX send failed, submitting standard form fallback...', err);
          contactForm.submit();
        });
      });
    }
  }
  `;
  content = content.slice(0, oldScriptStart) + newScript + content.slice(oldScriptEnd);
  console.log("Replaced script successfully.");
} else {
  console.error("Could not find script markers:", { oldScriptStart, oldScriptEnd });
}

fs.writeFileSync(contactPath, content, 'utf8');
console.log("Updated contact.html successfully.");
