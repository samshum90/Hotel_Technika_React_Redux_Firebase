import React, { Component } from "react";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Messages />
  </div>
);

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on("value", (snapshot) => {
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { messages, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading ...</div>}

        <MessageList messages={messages} />
      </div>
    );
  }
}

const MessageList = ({ message }) => (
  <ul>
    {message.map((message) => (
      <MessageItem key={message.uid} message={message} />
    ))}
  </ul>
);

const MessageItem = ({ message }) => (
  <li>
    <strong>{message.userId}</strong> {message.text}
  </li>
);

const Messages = withFirebase(MessagesBase);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
