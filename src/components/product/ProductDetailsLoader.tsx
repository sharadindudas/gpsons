const ProductDetailsLoader = () => {
  return (
    <div className="py-16 px-16 container mx-auto">
      <div className="flex gap-10">
        <div className="w-1/2 flex gap-7">
          <div className="flex flex-col gap-5">
            <div className="bg-gray-300 w-24 h-24 rounded-lg"></div>
            <div className="bg-gray-300 w-24 h-24 rounded-lg"></div>
            <div className="bg-gray-300 w-24 h-24 rounded-lg"></div>
            <div className="bg-gray-300 w-24 h-24 rounded-lg"></div>
          </div>
          <div className="bg-gray-300 animate-pulse rounded-lg w-[500px] h-[500px]"></div>
        </div>
        <div className="w-1/2 space-y-6">
          <div className="space-y-3">
            <div className="bg-gray-300 animate-pulse rounded-lg w-3/4 h-4"></div>
            <div className="bg-gray-300 animate-pulse rounded-lg w-1/2 h-4"></div>
          </div>
          <div className="bg-gray-300 animate-pulse rounded-lg w-36 h-4"></div>
          <div className="bg-gray-300 animate-pulse rounded-lg w-24 h-4"></div>
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 animate-pulse rounded-lg w-10 h-10"></div>
            <div className="bg-gray-300 animate-pulse rounded-lg w-10 h-10"></div>
            <div className="bg-gray-300 animate-pulse rounded-lg w-10 h-10"></div>
            <div className="bg-gray-300 animate-pulse rounded-lg w-10 h-10"></div>
          </div>
          <div className="bg-gray-300 animate-pulse rounded-lg w-28 h-4"></div>
          <div className="flex items-center gap-5">
            <div className="bg-gray-300 animate-pulse rounded-lg w-32 h-10"></div>
            <div className="bg-gray-300 animate-pulse rounded-lg w-32 h-10"></div>
          </div>
          <div className="bg-gray-300 animate-pulse rounded-lg w-36 h-4"></div>
          <div className="bg-gray-300 animate-pulse rounded-lg w-32 h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoader;
