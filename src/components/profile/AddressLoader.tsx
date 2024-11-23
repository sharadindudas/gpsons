import { Skeleton } from "@/components/ui/skeleton";

const AddressLoader = () => {
  return (
    <div className="grid grid-cols-2 gap-8 my-8">
      <div>
        <Skeleton className="rounded-lg w-full h-[170px] aspect-square" />
      </div>
      <div>
        <Skeleton className="rounded-lg w-full h-[170px] aspect-square" />
      </div>
      <div>
        <Skeleton className="rounded-lg w-full h-[170px] aspect-square" />
      </div>
      <div>
        <Skeleton className="rounded-lg w-full h-[170px] aspect-square" />
      </div>
    </div>
  );
};

export default AddressLoader;
