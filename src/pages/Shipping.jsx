import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="px-4 md:px-20 mt-28 mb-10 font-poppins">
      <h1 className="text-2xl font-bold mb-4 uppercase">Shipping Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Is Shipping Free?</h2>
        <p className="mt-1 text-sm">
          Yes, we offer free shipping across India for select products. For certain items, shipping charges may apply.
          For international orders, shipping costs are calculated based on the product type and its weight.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">When Will I Receive My Order?</h2>
        <p className="mt-1 text-sm">
          Orders are shipped directly from one of our multiple warehouses across India. We aim to deliver your order
          as swiftly as possible. Please allow an estimated 3-8 business days for your order to arrive within India.
          International shipping typically takes 4-6 weeks due to longer transit times and customs processing. Please note,
          these timeframes are estimates and can vary based on demand.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Can I Track My Order?</h2>
        <p className="mt-1 text-sm">
          Yes, you will receive a tracking number (AWB) within 1-2 days after placing your order. You can track your order
          on our Tracking Page using this AWB number. If you encounter any tracking issues, please contact us at:
          <a href="mailto:support@saviralfoods.com" className="text-blue-600"> support@saviralfoods.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Why Is My Order Being Shipped in Different Packages?</h2>
        <p className="mt-1 text-sm">
          For multi-item orders, items may be shipped from different warehouses based on availability to ensure faster delivery.
          Additionally, if an item is temporarily out of stock, we may ship items separately to avoid delays.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">What Happens if My Order Gets Stuck or Lost in Transit?</h2>
        <p className="mt-1 text-sm">
          All orders are shipped with insured handling. If an order experiences delays, is returned, or becomes lost during transit,
          we apologize. In such cases, we will resend a replacement order with priority shipping, if possible. Please refer to our
          Refund and Return Policy for further information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Will I Be Charged for Customs? (International Orders Only)</h2>
        <p className="mt-1 text-sm">
          Customs fees, import taxes, or other related charges may apply when your order reaches its destination country, determined
          by local customs regulations. Payment of these fees is your responsibility, and we are not liable for any delays caused
          by customs. For more information on these charges, please reach out to your local customs office.
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
