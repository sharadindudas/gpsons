"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  params: {
    status: "success" | "failed";
  };
}

const PaymentPage = ({ params: { status } }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = () => {
      const paymentStatus = ["success", "failed"];
      if (!paymentStatus.includes(status)) {
        router.push("/checkout");
      }
    };
    checkPaymentStatus();
  }, [router, status]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins tracking-tight">
      <div className="max-w-[485px] rounded-xl bg-color-3/5 border border-black/40 relative flex flex-col justify-center px-10 w-full pt-5 pb-7">
        <button className="absolute top-3 right-3">
          <Image
            src="/assets/close-btn.svg"
            width={44}
            height={44}
            alt="close-btn"
          />
        </button>
        <div className="w-32 h-32 mx-auto">
          {status == "success" ? (
            <Image
              src="/assets/success-icon.png"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full"
              alt="success-icon"
            />
          ) : (
            <Image
              src="/assets/failed-icon.png"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full"
              alt="success-icon"
            />
          )}
        </div>
        <h2 className="mt-2 text-black text-[20px] font-semibold text-center">
          {status === "success" ? <>Payment Success!</> : <>Payment Failed!</>}
        </h2>
        <div className="my-8 space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span>Reference Number</span>
            <span>00001</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Date</span>
            <span>Mar 22, 2023</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Time</span>
            <span>07:30 AM</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Payment Method</span>
            <span>Online</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Amount</span>
            <span>INR 1,000.00</span>
          </div>
        </div>
        <div className="w-full text-sm">
          <button className="flex gap-2 items-center justify-center border border-[#DEDEDE] rounded-md w-full h-12">
            <div>
              <Image
                src="/assets/download.svg"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full"
                alt="download-btn"
              />
            </div>
            <span>Get PDF Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
