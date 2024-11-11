export const verifyCodeTemplate = (verifyCode: string) => {
  return `
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
      "
    >
      <div 
        style="
          width: 500px;
          height: fit-content;
          border-radius: 10px;
          box-shadow: 0px 0px 10px 5px #bfbfbf;
          overflow: hidden;
        "
      >
        <div 
          style="
            font-size: 32px;
            font-weight: 700;
            text-align: center;
            background-color: #131a26;
            color: #e7e7e7;
            height: 120px;
            line-height: 120px;
          "
        >
          KHub: Your Verify Code
        </div>
        <div
          style="
            padding: 16px 32px;
            color: #131a26;
            /* font-weight: 700; */
          "
        >
          <div>We have received your application to sign up on our website.If it is not you, please ignore this email.</div>
          <div
            style="
              margin-top: 16px;
            "
          >The verify code is:</div>
        </div>
        <div
          style="
            font-size: 32px;
            font-weight: 700;
            color: #4caf50;
            background-color: #beff9e;
            text-align: center;
            margin: 0 32px;
            padding: 16px 0;
          "
        >
          ${verifyCode}
        </div>
        <div 
          style="
            /* font-weight: 700; */
            /* text-align: center; */
            background-color: #131a26;
            color: #e7e7e7;
            height: 32px;
            line-height: 16px;
            margin-top: 32px;
            padding: 32px;
          "
        >
          <div>The email was sent by KHub. Do not reply.</div>
          <div><a href="${process.env.SITE_LINK}">Explore</a> our website.</div>
        </div>
      </div>
    </div>
  `
}