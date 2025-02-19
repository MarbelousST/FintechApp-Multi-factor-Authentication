import React from "react";
import "./index.css"; // Importamos los estilos

const MainCard: React.FC = () => {
  return (
    <div className="main-card">
      <div className="card-left">
        <h1 className="card-title">Obtén tu Crédito Empresarial de hasta <strong>$10 millones</strong></h1>
        <ul className="block-list">
          <li>Con garantía</li>
          <li>3 millones sin garantía en 72 horas</li>
        </ul>
      </div>
      <div className="card-right">
        <video className="flex-center" width="455" height="100%" autoPlay={true} loop={true} muted={true} playsInline>
          <source src="https://creze.com/wp-content/uploads/2024/07/prototipo-animation-con-licen-hevc-safari-hevc-safari.mp4" type="video/mp4; codecs=&quot;hvc1&quot;"/>
          <source src="https://creze.com/wp-content/uploads/2024/09/prototipo-animation-con-licen-vp9-chrome.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default MainCard;