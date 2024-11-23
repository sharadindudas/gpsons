"use client";

import { FaExclamationCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const ToolTipTemplate = ({ errMsg }: { errMsg: string | undefined }) => {
  return (
    <>
      <FaExclamationCircle
        className="text-red-600"
        data-tooltip-id="errorTooltip"
        data-tooltip-content={errMsg}
      />

      <Tooltip
        id="errorTooltip"
        className="z-10 absolute max-w-xs break-words bg-gray-800 text-white text-sm p-2 rounded"
      />
    </>
  );
};

export default ToolTipTemplate;
