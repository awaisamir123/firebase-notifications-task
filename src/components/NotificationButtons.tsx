import React from "react";
import { useNotification } from "../contexts/NotificationContext";
import { Button, Container } from "react-bootstrap";

const NotificationSystem: React.FC = () => {
  const { addNotification } = useNotification();


  return (
    <Container className="container">
    <h2>Send Notifications</h2>
    <div className="button-group">
      <Button onClick={() => addNotification("Notification From Button 1")}>Button 1</Button>
      <Button onClick={() => addNotification("Notification From Button 2")}>Button 2</Button>
      <Button onClick={() => addNotification("Notification From Button 3")}>Button 3</Button>
    </div>
  </Container>
  );
};

export default NotificationSystem;
