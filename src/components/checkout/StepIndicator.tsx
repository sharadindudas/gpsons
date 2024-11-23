import { useAppSelector } from "@/store/hooks";

const StepIndicator = () => {
  const currentStep = useAppSelector((state) => state.checkout.currentStep);
  const steps = ["Shipping Address", "Billing Address", "OTP Verification"];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index + 1 <= currentStep
                ? "bg-color-3/50 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>
          <span className="ml-2">{step}</span>
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-16 mx-2 ${
                index + 1 < currentStep ? "bg-color-3/50" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
