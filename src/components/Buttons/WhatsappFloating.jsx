import React from "react";

function WhatsappFloating() {
  return (
    <div>
      <style>
        {`
            .float{
                position:fixed;
                width:60px;
                height:60px;
                bottom:40px;
                right:40px;
                background-color:#25d366;
                color:#FFF;
                border-radius:50px;
                text-align:center;
            font-size:30px;
                box-shadow: 2px 2px 3px #999;
            z-index:100;
            }

            .my-float{
                margin-top:16px;
            }
            `}
      </style>
      <a
        href="https://api.whatsapp.com/send?phone=62895330095205&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202."
        className="float"
        target="_blank"
      >
        <i className="fa-brands fa-whatsapp my-float"></i>
      </a>
    </div>
  );
}

export default WhatsappFloating;
