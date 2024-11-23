import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { ApiResponse, IOrder } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/providers/AuthProvider";
import { CheckoutProvider } from "@/providers/CheckoutProvider";
import { resetCheckoutState } from "@/store/slices/checkoutSlice";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const TermsAndConditionsForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { token, user } = AuthProvider();
  const { shippingAddress, billingAddress } = CheckoutProvider();

  const [accepted, setAccepted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isAddressComplete = useMemo(() => {
    return shippingAddress && billingAddress && shippingAddress.isVerified;
  }, [shippingAddress, billingAddress]);

  const handleTermsAndConditions = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    try {
      const orderResponse = await axiosInstance.post<ApiResponse<IOrder>>(
        `/api/v2/checkout/order/add`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            billing_address: billingAddress?.addressid,
            shipping_address: shippingAddress?.addressid,
          },
        }
      );
      if (orderResponse.data.success) {
        const orderid = orderResponse.data.data?.orderid as string;
        const paymentResponse = await axiosInstance.get<ApiResponse<string>>(
          `/api/v2/checkout/payment/request`,
          {
            params: {
              orderid,
              userid: user.userid,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (paymentResponse.data.success) {
          toast.success("Order is placed successfully");
          router.push(paymentResponse.data.data as string);
          dispatch(resetCheckoutState());
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data.message);
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="authBtn"
          disabled={!isAddressComplete}
          className="w-[154px] h-11 bg-color-3/40 rounded-md font-semibold capitalize"
        >
          Place Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-8 font-poppins tracking-tight">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            <DialogDescription>Terms and Conditions</DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[75vh] rounded-md p-5">
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur. Scelerisque sed orci sed
            nisl pulvinar pretium dolor. Eget cras diam amet quis arcu.
            Tristique elementum in id posuere ultricies. Ligula vitae vitae eget
            sed bibendum aenean. Posuere elit imperdiet penatibus venenatis
            tempus viverra elementum egestas diam. Vitae leo donec habitasse
            laoreet diam egestas pretium ipsum aliquam. Maecenas aenean
            scelerisque felis commodo euismod purus pellentesque. Non justo
            cursus viverra cras nibh. Condimentum commodo id mauris donec
            ultrices nunc purus faucibus. Vel venenatis felis potenti ac. Sed in
            sed nisi quam posuere quis amet mattis commodo. Viverra dignissim
            ultricies ac pharetra. Lectus amet sollicitudin arcu euismod orci.
            In tincidunt elit tempor ultricies. Lorem ipsum dolor sit amet
            consectetur. Scelerisque sed orci sed nisl pulvinar pretium dolor.
            Eget cras diam amet quis arcu. Tristique elementum in id posuere
            ultricies. Ligula vitae vitae eget sed bibendum aenean. Posuere elit
            imperdiet penatibus venenatis tempus viverra elementum egestas diam.
            Vitae leo donec habitasse laoreet diam egestas pretium ipsum
            aliquam. Maecenas aenean scelerisque felis commodo euismod purus
            pellentesque. Non justo cursus viverra cras nibh. Condimentum
            commodo id mauris donec ultrices nunc purus faucibus. Vel venenatis
            felis potenti ac. Sed in sed nisi quam posuere quis amet mattis
            commodo. Viverra dignissim ultricies ac pharetra. Lectus amet
            sollicitudin arcu euismod orci. In tincidunt elit tempor ultricies.
            Lorem ipsum dolor sit amet consectetur. Scelerisque sed orci sed
            nisl pulvinar pretium dolor. Eget cras diam amet quis arcu.
            Tristique elementum in id posuere ultricies. Ligula vitae vitae eget
            sed bibendum aenean. Posuere elit imperdiet penatibus venenatis
            tempus viverra elementum egestas diam. Vitae leo donec habitasse
            laoreet diam egestas pretium ipsum aliquam. Maecenas aenean
            scelerisque felis commodo euismod purus pellentesque. Non justo
            cursus viverra cras nibh. Condimentum commodo id mauris donec
            ultrices nunc purus faucibus. Vel venenatis felis potenti ac. Sed in
            sed nisi quam posuere quis amet mattis commodo. Viverra dignissim
            ultricies ac pharetra. Lectus amet sollicitudin arcu euismod orci.
            In tincidunt elit tempor ultricies. Lorem ipsum dolor sit amet
            consectetur. Scelerisque sed orci sed nisl pulvinar pretium dolor.
            Eget cras diam amet quis arcu. Tristique elementum in id posuere
            ultricies. Ligula vitae vitae eget sed bibendum aenean. Posuere elit
            imperdiet penatibus venenatis tempus viverra elementum egestas diam.
            Vitae leo donec habitasse laoreet diam egestas pretium ipsum
            aliquam. Maecenas aenean scelerisque felis commodo euismod purus
            pellentesque. Non justo cursus viverra cras nibh. Condimentum
            commodo id mauris donec ultrices nunc purus faucibus. Vel venenatis
            felis potenti ac. Sed in sed nisi quam posuere quis amet mattis
            commodo. Viverra dignissim ultricies ac pharetra. Lectus amet
            sollicitudin arcu euismod orci. In tincidunt elit tempor ultricies.
            Lorem ipsum dolor sit amet consectetur. Scelerisque sed orci sed
            nisl pulvinar pretium dolor. Eget cras diam amet quis arcu.
            Tristique elementum in id posuere ultricies. Ligula vitae vitae eget
            sed bibendum aenean. Posuere elit imperdiet penatibus venenatis
            tempus
          </p>
          <form
            noValidate
            onSubmit={handleTermsAndConditions}
            className="mt-5 mb-2 space-y-5"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={accepted}
                onCheckedChange={(checked: boolean) => setAccepted(checked)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By signing up you agree to our Terms and conditions and Privacy
                policy.
              </label>
            </div>
            <div className="flex items-center justify-end">
              <Button
                variant="authBtn"
                disabled={!accepted || isSubmitting}
                className="w-52 h-11 bg-color-3/40 rounded-md font-semibold capitalize"
              >
                {isSubmitting ? <Loader2 /> : <>Continue Place Order</>}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditionsForm;
