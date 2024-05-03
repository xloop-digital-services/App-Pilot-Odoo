import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useChat } from "../../hooks/useChat";
import avatarlogo from "../../assets/avatarScarf.png";
import avatarHairLogo from "../../assets/avatarHair.png";
import avatarRed from "../../assets/avatarRedLogo.png";
import avatarBig from "../../assets/avatarScarfBig.png";
import avatarNoScarfBig from "../../assets/avatarBig.png";
import avatarRedBig from "../../assets/avatarRedBig.png";

const CustomModal = ({ title, buttonName }) => {
  const [visible, setVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const { showAvatar, setShowAvatar } = useChat();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleApplyAvatar = () => {
      setShowAvatar(selectedAvatar);
  };

  return (
    <>
      <Button
        type="info"
        onClick={showModal}
        style={{ border: "black 1px solid" }}
      >
        {buttonName}
      </Button>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button className="h-20 " onClick={() => setSelectedAvatar("black-scarf")}>
            <img src={avatarlogo} alt="avatarscarf" width="50px" />
          </Button>
          <Button className="h-20" onClick={() => setSelectedAvatar("black")}>
            <img src={avatarHairLogo} alt="avatarHair" width="50px" />
          </Button>
          <Button className="h-20" onClick={() => setSelectedAvatar("red")}>
            <img src={avatarRed} alt="avatarRed" width="50px" />
          </Button>
          
          <Button type="info" onClick={handleApplyAvatar} style={{ border:"solid black 1px" }}>
          Apply
        </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {selectedAvatar === "black-scarf" && <img src={avatarBig} />}
          {selectedAvatar === "black" && <img src={avatarNoScarfBig} />}
          {selectedAvatar === "red" && <img src={avatarRedBig} />}
        </div>
        
      </Modal>
    </>
  );
};

export default CustomModal;
