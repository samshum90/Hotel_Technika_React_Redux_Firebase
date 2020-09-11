import React from "react";

import { MessageItem } from "./MessageItem";

const MessageList = ({
  authUser,
  messages,
  onRemoveMessage,
  onEditMessage,
}) => (
  <ul>
    {messages.map((message) => (
      <MessageItem
        key={message.uid}
        authUser={authUser}
        message={message}
        onRemoveMessage={onRemoveMessage}
        onEditMessage={onEditMessage}
      />
    ))}
  </ul>
);

export default MessageList;
