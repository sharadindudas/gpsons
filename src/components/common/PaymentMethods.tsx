import Image from "next/image";

const PaymentMethods = () => {
  return (
    <div className="flex items-center gap-x-7 pt-10">
      <Image
        src="/assets/payment-img1.png"
        width={219}
        height={74}
        priority
        alt="payment-img"
      />
      <Image
        src="/assets/payment-img2.png"
        width={262}
        height={74}
        priority
        alt="payment-img"
      />
    </div>
  );
};

export default PaymentMethods;
