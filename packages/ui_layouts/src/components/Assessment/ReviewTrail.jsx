export const ChatMessage = ({ message, isUser, Msg, data }) => {

  return (
    <div
      className={`d-flex flex-column mb-3 ${
        isUser ? "align-items-end" : "align-items-start"
      }`}
    >
      <div
        // className={`p-2 rounded ${
        //   isUser ? "bg-primary text-white" : "bg-light text-dark"
        // }`}
        
        style={{ maxWidth: "75%" }}
      >
        <div className="text-gray-7">{data.userType} Comment</div>
        {Msg ? <Msg /> : <div>{message.text}</div>}
      </div>
    </div>
  );
};
