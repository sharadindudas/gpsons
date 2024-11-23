"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaymentMethods from "@/components/common/PaymentMethods";

const Faqs = () => {
  return (
    <div className="w-4/5 mx-auto py-14">
      <h2 className="text-2xl font-bold mb-1">Frequently Asked Questions</h2>
      <p className="text-sm text-color-6 mb-3">
        Get the latest insights and trends on buying and selling online
        products.
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base font-semibold">
            How do I place an order?
          </AccordionTrigger>
          <AccordionContent>
            To place an order, simply browse our products, select the items you
            want, and add them to your cart. Proceed to checkout, provide your
            shipping and payment information, and confirm your order.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base font-semibold">
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent>
            We accept credit/debit cards, and other payment methods through HDFC
            bank payment portal.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-base font-semibold">
            How long will it take to receive my order?
          </AccordionTrigger>
          <AccordionContent>
            Delivery times vary based on your location and shipping method.
            Please refer to our Shipping and Delivery Policy for estimated
            delivery times.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-base font-semibold">
            What should i do if i have a problem with my order?
          </AccordionTrigger>
          <AccordionContent>
            If you encounter any issues with your order, please contact our
            customer support team through the contact information provided on
            our website.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <PaymentMethods />
    </div>
  );
};

export default Faqs;
