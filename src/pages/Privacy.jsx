import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="px-4 md:px-20 mt-28 mb-10 font-poppins">
      <h1 className="text-2xl font-bold mb-4 uppercase">Privacy Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-1 text-sm">
          At Saviral Foods, we value your privacy. This Privacy Policy describes how we collect,
          use, disclose, and protect your information when you visit our website 
          <a href="https://saviralfoods.in/" className="text-blue-600"> https://saviralfoods.in/</a> (the “Site”) or make purchases through it. 
          By accessing our Site, you agree to the practices outlined in this Privacy Policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <p className="mt-1 text-sm">
          <strong>Personal Information:</strong> We may collect personal details such as your name, email address, 
          phone number, and shipping/billing address when you interact with our Site or place an order.
        </p>
        <p className="mt-1 text-sm">
          <strong>Payment Information:</strong> Your credit or debit card information is securely processed 
          through our third-party payment provider.
        </p>
        <p className="mt-1 text-sm">
          <strong>Usage Information:</strong> We automatically collect data like IP address, browser type, 
          pages visited, and usage patterns to help improve our Site.
        </p>
        <p className="mt-1 text-sm">
          <strong>Cookies and Tracking Technologies:</strong> We use cookies to track activity on our Site 
          and enhance your experience. You can adjust your cookie preferences in browser settings, though 
          some features may not function correctly if cookies are disabled.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">How We Use Your Information</h2>
        <p className="mt-1 text-sm">
          We use the information we collect to:
          <ul className="list-disc list-inside">
            <li>Process and fulfill orders</li>
            <li>Communicate about orders, new products, and promotions</li>
            <li>Enhance your experience on our Site</li>
            <li>Conduct analytics and monitor site performance</li>
            <li>Detect and prevent fraud or illegal activities</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">How We Share Your Information</h2>
        <p className="mt-1 text-sm">
          We do not sell or rent your personal information. We may share information with:
          <ul className="list-disc list-inside">
            <li>Service providers (e.g., payment processors, shipping companies) who help us operate our business</li>
            <li>Public authorities, if legally required or in response to valid requests</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Data Security</h2>
        <p className="mt-1 text-sm">
          We implement security measures to protect your data, but no online transmission or storage is entirely secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Your Privacy Choices</h2>
        <p className="mt-1 text-sm">
          <strong>Access and Update Information:</strong> You can request access, updates, or deletion of 
          your personal information by contacting us.
        </p>
        <p className="mt-1 text-sm">
          <strong>Opt-Out of Communications:</strong> You may opt out of promotional emails by following 
          unsubscribe instructions in our emails or contacting us directly. Essential communications related to transactions will continue.
        </p>
        <p className="mt-1 text-sm">
          <strong>Cookie Preferences:</strong> You may disable cookies in your browser, though this may affect your experience on our Site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Children’s Privacy</h2>
        <p className="mt-1 text-sm">
          Our Site is not intended for children under 16. If we discover that we have inadvertently collected information from a child, 
          we will promptly delete it.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Changes to This Privacy Policy</h2>
        <p className="mt-1 text-sm">
          We may update this Privacy Policy periodically. Any changes will be posted on this page. 
          Please review it regularly for updates.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p className="mt-1 text-sm">
          For questions or concerns about this Privacy Policy, contact us at:
          <br />
          Saviral Foods, Shop no. B-3, Bankey Bihari Sharnam, Raj Nagar Extension, Ghaziabad, Uttar Pradesh, India
          <br />
          or via email at <a href="mailto:saviralfoods@gmail.com" className="text-blue-600">saviralfoods@gmail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
