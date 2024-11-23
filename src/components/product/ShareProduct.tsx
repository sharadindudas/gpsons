import { IProduct } from "@/types/types";
import { useMemo } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "lucide-react";
import toast from "react-hot-toast";

interface ShareProductProps {
  selectedProduct: IProduct;
}

const ShareProduct = ({ selectedProduct }: ShareProductProps) => {
  function useShareUrl() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return useMemo(() => {
      if (typeof window === "undefined") {
        return "";
      }

      const origin = window.location.origin;
      const path = pathname;
      const query = searchParams.toString();

      return `${origin}${path}${query ? `?${query}` : ""}`;
    }, [pathname, searchParams]);
  }
  const shareUrl = useShareUrl();
  const shareTitle = `Check out this ${selectedProduct?.title}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link is copied successfully");
    } catch (err) {
      toast.error("Failed to copy the link");
    }
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger>
          <Image
            src="/assets/share-btn.svg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-lg"
            alt="share-btn"
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto flex items-center gap-4">
          <FacebookShareButton url={shareUrl} title={shareTitle}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <button
            onClick={handleCopyLink}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
          >
            <Link />
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ShareProduct;
