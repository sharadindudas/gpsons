import Link from "next/link";
import PaymentMethods from "@/components/common/PaymentMethods";

const ReturnPolicy = () => {
  return (
    <div className="w-4/5 mx-auto py-14">
      <h2 className="text-2xl font-bold mb-1">Return and Refund Policy</h2>
      <p className="text-sm text-black/60 mb-3">
        Thank you for shopping at Gourangapaul. If you are not completely
        satisfied with your purchase, please review our Return and Refund Policy
        mentioned as below.
      </p>
      <ul className="space-y-4">
        <li>
          <h3 className="capitalize text-lg font-semibold mb-1">Definitions</h3>
          <ul className="text-black/60 text-sm">
            <li className="flex gap-x-2 items-center">
              <span className="font-semibold">Company:</span>{" "}
              <p>Gouranga Paul Group, 14F/1E Dum Dum Road, Kolkata-700030.</p>
            </li>
            <li className="flex gap-x-2 items-center">
              <span className="font-semibold">Goods:</span>{" "}
              <p>Items offered for sale on our website.</p>
            </li>
            <li className="flex gap-x-2 items-center">
              <span className="font-semibold">Service:</span>{" "}
              <p>Our website, accessible at https://gourangapaul.com.</p>
            </li>
            <li className="flex gap-x-2 items-center">
              <span className="font-semibold">You:</span>{" "}
              <p>
                The individual or legal entity accessing or using our Service.
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="capitalize text-lg font-semibold mb-1">
            Order Cancellation
          </h3>
          <p className="text-black/60 text-sm">
            You may cancel your Order within 48 hours without providing a
            reason. To cancel, please contact us with a clear statement via{" "}
            <Link href="mailto:info@gourangapaul.com" className="font-semibold">
              info@gourangapaul.com
            </Link>
            . If you have already paid, we will refund your amount to the
            original payment method once we confirm your cancellation. You will
            not incur any fees for this reimbursement.
          </p>
        </li>
        <li>
          <h3 className="capitalize text-lg font-semibold mb-1">
            Return Policy
          </h3>
          <p className="text-sm text-black/60">
            Due to the nature of our products being skin-tight garments, returns
            are not accepted for the following reasons:
          </p>
          <ul className="text-black/60 text-sm py-2">
            <li>
              The supply of Goods made to your specifications or personalized.
            </li>
            <li>
              Goods unsuitable for return due to their nature, such as those
              that deteriorate rapidly or have passed their expiry date.
            </li>
            <li>
              Goods that are not suitable for return due to health protection or
              hygiene reasons and were unsealed after delivery.
            </li>
            <li>
              Goods that have been inseparably mixed with other items after
              delivery.
            </li>
          </ul>
          <p className="text-sm text-black/60">
            Please ensure your size is confirmed using our “HOW TO MEASURE YOUR
            SIZE” guide before placing your order. We can only adjust products
            to a smaller size, not a larger one.
          </p>
        </li>
        <li>
          <h3 className="capitalize text-lg font-semibold mb-1">Refunds</h3>
          <p className="text-black/60 text-sm">
            Only regular-priced Goods are eligible for refunds. Goods on sale
            are not refundable. This exclusion may not apply if prohibited by
            applicable law.
          </p>
        </li>
        <li>
          <h3 className="capitalize text-lg font-semibold mb-1">Contact us</h3>
          <p className="text-black/60 text-sm">
            If you have any questions about our Return and Refund Policy, please
            contact us at{" "}
            <Link href="mailto:info@gourangapaul.com" className="font-semibold">
              info@gourangapaul.com
            </Link>
            . Thank you for your understanding and for shopping with
            Gourangapaul.
          </p>
        </li>
      </ul>
      <PaymentMethods />
    </div>
  );
};

export default ReturnPolicy;
