import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full">
      <LoaderCircle size={50} className="animate-spin text-black" />
    </div>
  );
};

export default Loader;
