import { Tooltip } from "react-tooltip";

const Exclamation = (props) => {
  const { htmlContent } = props;
  const uniqueId = Math.random().toString(36).substr(2, 9);
  return (
    <>
      <a data-tooltip-id={`my-tooltip_${uniqueId}`}>?</a>
      <Tooltip id={`my-tooltip_${uniqueId}`} html={htmlContent}></Tooltip>
    </>
  );
};
export default Exclamation;
