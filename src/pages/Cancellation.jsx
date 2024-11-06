import React from 'react';

const CancellationReturnRefundPolicy = () => {
  return (
    <div className="px-4 md:px-20 mt-28 mb-10 font-poppins">
      <h1 className="text-2xl font-bold mb-4 uppercase">Cancellation, Return & Refund Policy</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-1 text-sm">
          Saviral Foods is committed to offering a hassle-free and secure experience. We provide a 7-day
          return or replacement policy, which means you have 7 days after receiving your item to request
          a return or replacement. If 7 days have passed since the date of delivery (including the date of
          delivery), we regret to inform you that a refund or replacement is no longer available.
        </p>
        <p className="mt-1 text-sm">
          Please refer to each product’s description to understand its specific return or replacement
          eligibility. Products eligible for a replacement policy are not eligible for a return or refund.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">7-Day Policy</h2>
        <p className="mt-1 text-sm">
          To initiate a return or replacement, please send all required photos or videos of the product
          within 7 days of delivery. For example, if you received the product on 01/01/2021, the last date
          to request a return or replacement would be 07/01/2021 by 11:59 PM.
        </p>
        <p className="mt-1 text-sm">
          Once we receive your request and photos or videos, our technical team will review them and
          determine if your request meets our policy. Please note that visual proof and all required information
          are necessary for processing a return or replacement request. Requests with incomplete or partial
          information cannot be processed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Replacement</h2>
        <p className="mt-1 text-sm">
          We are happy to offer an exchange in the following cases:
          <ul className="list-disc list-inside">
            <li>You received items that are damaged or defective.</li>
            <li>The package was lost in transit due to carrier error (if the order was prepaid).</li>
            <li>You received an incorrect item that does not match your order.</li>
            <li>You wish to exchange the item for the same product.</li>
          </ul>
        </p>
        <p className="mt-1 text-sm">
          Once our technical team approves your replacement request, a courier partner will arrange
          pickup within 2 business days. Upon receipt at Saviral Foods, our experts will review the
          returned product. If the claim is accurate, we will immediately ship a new product as a
          replacement. However, if the actual condition differs from the claim, only a partial refund may be
          offered, with visual proof provided.
        </p>
        <p className="mt-1 text-sm">
          Please note, replacements are only approved for manufacturing defects or physical damage
          upon delivery. In such cases, the customer must provide an unboxing video of the product.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Return</h2>
        <p className="mt-1 text-sm">
          Not all products on the Saviral Foods website are eligible for returns. Refer to the respective
          product page to confirm whether a product is covered by a return or replacement policy.
        </p>
        <p className="mt-1 text-sm">
          Products eligible for the replacement policy are not eligible for return or refund, and items
          marked “non-returnable” cannot be returned. To be eligible for a return, items must be in the same
          condition as received, unworn or unused, with tags, and in the original packaging. Proof of purchase
          is also required.
        </p>
        <p className="mt-1 text-sm">
          To start a return, please contact us at <a href="mailto:support@saviralfoods.com" className="text-blue-600">support@saviralfoods.com</a>. If your return is accepted, we
          will provide instructions on how to return the item. We offer reverse pickup for most locations
          in India. For areas where reverse pickup is unavailable, customers will need to self-ship the items
          to our office. Products sent back without prior approval will not be eligible for refund or replacement.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Non-returnable/Non-replaceable Products</h2>
        <p className="mt-1 text-sm">
          The following items are not eligible for return, refund, or replacement:
          <ul className="list-disc list-inside">
            <li>Products damaged or with missing parts due to customer error.</li>
            <li>Products received in good/working condition that the customer no longer wants or finds ineffective.</li>
            <li>Products received in good/working condition but stopped functioning after use.</li>
            <li>Products damaged due to customer mishandling.</li>
            <li>Any product returned after 7 days of delivery.</li>
            <li>Products marked as “non-returnable” on the product detail page.</li>
          </ul>
          Saviral Foods reserves the right to change the eligibility of products under this policy without prior notice.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Refunds</h2>
        <p className="mt-1 text-sm">
          Once we receive and inspect your return, we will notify you of approval or rejection of the
          refund. If approved, your refund will be processed to the original payment method. Please allow
          3-5 business days for the refund to appear on your statement. If more than 5 business days
          have passed and you have not received your refund, please contact us at:
          <a href="mailto:support@saviralfoods.com" className="text-blue-600"> support@saviralfoods.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Invalid Reasons for Return and Refunds</h2>
        <p className="mt-1 text-sm">
          We cannot accept returns or refunds if:
          <ul className="list-disc list-inside">
            <li>The customer no longer wants the item after ordering.</li>
            <li>The customer is not confident about the product’s price or utility before ordering.</li>
          </ul>
          Please make sure you wish to proceed with the purchase before confirming the order.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Cancellation</h2>
        <p className="mt-1 text-sm">
          If you wish to cancel your order, please contact us promptly. A refund can only be provided if
          cancellation is requested before the order has shipped. Once an order has shipped, it cannot be
          canceled, and no refund can be provided.
        </p>
      </section>

      <p className="mt-6 text-sm">
        For any further questions, feel free to contact us at:
        <a href="mailto:support@saviralfoods.com" className="text-blue-600"> support@saviralfoods.com</a>.
      </p>
    </div>
  );
};

export default CancellationReturnRefundPolicy;
