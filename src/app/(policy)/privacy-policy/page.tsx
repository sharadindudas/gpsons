import { privacyPolicies } from "@/utils/constants";
import PaymentMethods from "@/components/common/PaymentMethods";

const PrivacyPolicy = () => {
  return (
    <div className="w-4/5 mx-auto py-14">
      <h2 className="text-2xl font-bold mb-1">Privacy Policy</h2>
      <p className="text-sm text-color-6 mb-3">
        By visiting the Platform, providing your information or availing our
        product/service, you expressly agree to be bound by the terms and
        conditions of this Privacy Policy, the Terms of Use and the applicable
        service/product terms and conditions.
      </p>
      {privacyPolicies?.map((policy) => (
        <div key={policy.id}>
          <h4 className="capitalize text-lg font-semibold mb-1">
            {policy.heading}
          </h4>
          <p className="mb-3 text-color-6 text-sm">
            <span className="dropcap">G</span>
            {policy.para}
          </p>
        </div>
      ))}
      <PaymentMethods />
    </div>
  );
};

export default PrivacyPolicy;
