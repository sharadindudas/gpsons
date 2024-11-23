import Link from "next/link";

interface AuthTermsAndConditionProps {
  onCloseModal: () => void;
}

const AuthTermsAndCondition = ({
  onCloseModal,
}: AuthTermsAndConditionProps) => {
  return (
    <p className="text-xs mt-3 text-black/60 font-semibold capitalize">
      By proceeding, you agree to Gouranga paul&apos;s{" "}
      <Link
        href="/privacy-policy"
        className="text-blue-400"
        onClick={onCloseModal}
      >
        Privacy Policy
      </Link>{" "}
      And{" "}
      <Link
        href="/terms-and-conditions"
        className="text-blue-400"
        onClick={onCloseModal}
      >
        Terms of Use
      </Link>
    </p>
  );
};

export default AuthTermsAndCondition;
