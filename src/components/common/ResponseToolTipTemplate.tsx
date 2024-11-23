"use client";

import { Tooltip } from "react-tooltip";
import { Check, CircleX } from "lucide-react";

interface Props {
  message: string | undefined;
  success: boolean;
}

const ResponseToolTipTemplate = ({ message, success }: Props) => {
  return (
    <>
      {success ? (
        <Check
          className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 cursor-pointer"
          data-tooltip-id="responseTooltip"
          data-tooltip-content={message}
        />
      ) : (
        <CircleX
          className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 cursor-pointer"
          data-tooltip-id="responseTooltip"
          data-tooltip-content={message}
        />
      )}
      <Tooltip
        id="responseTooltip"
        className="z-10 absolute max-w-xs break-words bg-gray-800 text-white text-sm p-2 rounded"
      />
    </>
  );
};

export default ResponseToolTipTemplate;
