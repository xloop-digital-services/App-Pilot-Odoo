import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useChat } from "../../hooks/useChat";
import avatarlogo from "../../assets/avatarScarf.png";
import avatarHairLogo from "../../assets/avatarHair.png";
import avatarRed from "../../assets/avatarRedLogo.png";
import avatarBig from "../../assets/avatarScarfBig.png";
import avatarNoScarfBig from "../../assets/avatarBig.png";
import avatarRedBig from "../../assets/avatarRedBig.png";
import avatarFGenz from "../../assets/avatarFGenzBig.png";
import avatarFGenzLogo from "../../assets/avatarFGenzLogo.png";
import avatarMGenz from "../../assets/avatarMGenzBig.png";
import avatarMGenzLogo from "../../assets/avatarMGenzLogo.png";
import avatarFFormal from "../../assets/avatarFformalBig.png";
import avatarFFormalLogo from "../../assets/avatarFFormalLogo.png";
import avatarMFormal from "../../assets/avatarMFormalBig.png";
import avatarMFormalLogo from "../../assets/avatarMFormalLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

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
    if(selectedAvatar)
      setShowAvatar(selectedAvatar);
    setVisible(false)
  };

  // let bgColorClass = "";
  // switch (type) {
  //   case "info":
  //     bgColorClass = "bg-blue-500 hover:bg-blue-700";
  //     break;
  //   default:
  //     bgColorClass = "bg-gray-500 hover:bg-gray-700";
  // }

  return (
    <>
      <Button
        type="info"
        onClick={showModal}
        className={`text-white font-semibold rounded-full h-[37px] w-[37px] shadow-md bg-bg-avatar hover:shadow-lg hover:bg-bg-primary hover:text-bg-avatar hover:outline-black focus:outline-none   hover:border-none`}
        // style={{ border: "black 1px solid"}}
      >
        <FontAwesomeIcon icon={faUserTie}  className="text-xl -ml-1.5"/>
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
            justifyContent: "space-around",
          }}
        >
          
          {/* <Button className="h-20 " onClick={() => setSelectedAvatar("black-scarf")}>
            <img src={avatarlogo} alt="avatarscarf" width="50px" />
          </Button> */}
          <Button className="h-20" onClick={() => setSelectedAvatar("black")}>
            <img src={avatarHairLogo} alt="avatarHair" width="50px" />
          </Button>
          {/* <Button className="h-20" onClick={() => setSelectedAvatar("red")}>
            <img src={avatarRed} alt="avatarRed" width="50px" />
          </Button> */}
          <Button className="h-20" onClick={() => setSelectedAvatar("avatar-fformal")}>
            <img src={avatarFFormalLogo} alt="avatarFformal" width="60px" />
          </Button>
          <Button className="h-20" onClick={() => setSelectedAvatar("avatar-fgenz")}>
            <img src={avatarFGenzLogo} alt="avatarFgenz" width="60px" />
          </Button>
          {/* <Button className="h-20" onClick={() => setSelectedAvatar("avatar-mgenz")}>
            <img src={avatarMGenzLogo} alt="avatarMgenz" width="60px" />
          </Button>
          <Button className="h-20" onClick={() => setSelectedAvatar("avatar-mformal")}>
            <img src={avatarMFormalLogo} alt="avatarMformal" width="60px" />
          </Button> */}
          
          
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {/* {selectedAvatar === "black-scarf" && <img src={avatarBig} />} */}
          {selectedAvatar === "black" && <img src={avatarNoScarfBig} />}
          {/* {selectedAvatar === "red" && <img src={avatarRedBig} />} */}
          {selectedAvatar === "avatar-fformal" && <img src={avatarFFormal} />}
          {selectedAvatar === "avatar-fgenz" && <img src={avatarFGenz} />}
          {selectedAvatar === "avatar-mformal" && <img src={avatarMFormal} />}
          {selectedAvatar === "avatar-mgenz" && <img src={avatarMGenz} />}
        </div>
        <Button type="info" onClick={handleApplyAvatar} style={{ border:"solid black 1px", width:"100%", marginTop:"10px", fontSize:"18px",textAlign:"center", padding:"3px" }}>
          Apply
        </Button>
      </Modal>
    </>
  );
};

export default CustomModal;
