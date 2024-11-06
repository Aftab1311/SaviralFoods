import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="px-4 md:px-20 mt-28 mb-10 font-poppins">
      <h1 className="text-2xl font-bold mb-4 uppercase">Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-1 text-sm">
          At Saviral Foods, we offer a straightforward 5-day return or replacement policy. You have 5 days
          after receiving your item to request a return or replacement. After 5 days from the date of delivery,
          we unfortunately cannot offer a refund or replacement.
        </p>
        <p className="mt-1 text-sm">
          Please refer to the product description or details page to check if a product is eligible for return
          or replacement. Products eligible for replacement are not eligible for a return and refund.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">5-Day Policy</h2>
        <p className="mt-1 text-sm">
          To initiate a return or replacement, please provide all required photos or videos of the product
          within 5 days of delivery. Our team will review the visuals provided and decide on your request accordingly.
          Make sure to include all necessary information, as incomplete information may delay or cancel your request.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Replacement</h2>
        <p className="mt-1 text-sm">
          We are happy to offer a replacement if:
          <ul className="list-disc list-inside">
            <li>You received a damaged or defective item.</li>
            <li>The package was lost in transit (for prepaid orders).</li>
            <li>You received an incorrect item.</li>
          </ul>
          Once approved, a courier partner will pick up the item within 2 business days. After inspection, we’ll ship a replacement
          if the claim is valid. If there is a discrepancy, you may be eligible for a partial refund.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Return</h2>
        <p className="mt-1 text-sm">
          Not all products are eligible for returns. To be eligible, the item must be unused, in its original packaging,
          and include a receipt or proof of purchase. If eligible, we’ll send you instructions for the return process.
          For areas outside our courier zones, you may need to self-ship to our office. Items returned without prior approval
          will not be accepted.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Exceptions / Non-returnable / Non-replaceable Products</h2>
        <p className="mt-1 text-sm">
          The following items are not eligible for return, refund, or replacement:
          <ul className="list-disc list-inside">
            <li>Products damaged or missing parts due to customer handling.</li>
            <li>Products received in good condition but no longer wanted by the customer.</li>
            <li>Items that stopped working due to misuse or improper handling after delivery.</li>
            <li>Any product returned after 5 days of delivery.</li>
            <li>Products sent as replacements.</li>
            <li>Items marked "non-returnable" on the product page.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Refunds</h2>
        <p className="mt-1 text-sm">
          Once we receive and inspect the returned item, we’ll notify you of the approval status. Approved refunds will be issued to
          your original payment method. Please allow 3-5 business days for the refund to appear. If it doesn’t, please contact us at:
          <a href="mailto:support@saviralfoods.com" className="text-blue-600"> support@saviralfoods.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Invalid Reasons for Return and Refunds</h2>
        <p className="mt-1 text-sm">
          The following reasons are not valid for return or refund requests:
          <ul className="list-disc list-inside">
            <li>Buyer changes their mind after the purchase.</li>
            <li>Buyer should be confident in the purchase decision before placing an order.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Cancellation</h2>
        <p className="mt-1 text-sm">
          If you wish to cancel an order, please contact us immediately. Cancellations are only possible if requested before
          the order has shipped. Once shipped, we cannot cancel or refund the order.
        </p>
      </section>

      <p className="mt-6 text-sm">
        For any questions, contact us at:
        <a href="mailto:support@saviralfoods.com" className="text-blue-600"> support@saviralfoods.com</a>.
      </p>
    </div>
  );
};

export default RefundPolicy;
