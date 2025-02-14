const Notification = ({ notification }) => {
  if (!notification.visible) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: notification.type === "success" ? "green" : "red",
  };

  return <div style={style}>{notification.text}</div>;
};

export default Notification;
