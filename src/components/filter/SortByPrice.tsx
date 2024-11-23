import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BiSortAlt2 } from "react-icons/bi";

interface Props {
  sortPrice: string;
  setSortPrice: (value: string) => void;
}

const SortByPrice = ({ sortPrice, setSortPrice }: Props) => {
  return (
    <Select value={sortPrice} onValueChange={setSortPrice}>
      <SelectTrigger className="w-[270px] border-none bg-transparent text-base">
        <div className="flex items-center text-color-4">
          <BiSortAlt2 className="text-xl" />
          <span className="font-normal">Sort By:</span>
          <span className="ml-2 text-black/50">
            <SelectValue placeholder="Price: High to Low" />
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="font-poppins text-center">
          <SelectItem value="High to Low">Price: High to Low</SelectItem>
          <SelectItem value="Low to High">Price: Low to High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortByPrice;
