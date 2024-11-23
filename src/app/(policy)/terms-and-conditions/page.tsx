import { termsAndConditions } from "@/utils/constants";
import PaymentMethods from "@/components/common/PaymentMethods";

const TermsandCondition = () => {
  return (
    <div className="w-4/5 mx-auto py-14">
      <h2 className="text-2xl font-bold mb-1">Terms & Conditions</h2>
      <p className="text-sm text-color-6 mb-3">
        Our term and conditions are specified as follows.
      </p>
      {termsAndConditions?.map((condition) => (
        <div key={condition.id}>
          <h4 className="capitalize text-lg font-semibold mb-1">
            {condition.heading}
          </h4>
          <p className="mb-3 text-color-6 text-sm">{condition.para}</p>
        </div>
      ))}
      <PaymentMethods />
    </div>
  );
};

export default TermsandCondition;
