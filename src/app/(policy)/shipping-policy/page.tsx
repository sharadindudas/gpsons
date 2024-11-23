import { shippingPolicies } from "@/utils/constants";
import PaymentMethods from "@/components/common/PaymentMethods";

const ShippingPolicy = () => {
  return (
    <div className="w-4/5 mx-auto py-14">
      <h2 className="text-2xl font-bold mb-1">Shipping Policy</h2>
      <p className="text-sm text-color-6 mb-3">Our Shipping policy.</p>
      <ul className="flex flex-col gap-3">
        {shippingPolicies?.map((policy) => (
          <li key={policy.id}>
            <h3 className="capitalize text-lg font-semibold mb-1">
              {policy.heading}
            </h3>
            <p className="text-black/60 text-sm">{policy.para}</p>
          </li>
        ))}
      </ul>
      <PaymentMethods />
    </div>
  );
};

export default ShippingPolicy;
