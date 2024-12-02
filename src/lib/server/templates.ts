import { ORIGIN } from '$env/static/private'

export class EmailTemplate {
	constructor(
		public entries: [string, string][],
		public formTitle: string,
		public siteData?: {
			banner?: string | null
			siteUrl?: string | null
			favicon?: string | null
		}
	) {}

	toString() {
		return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    ${this.head}
<body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #ffffff00;" bgcolor="#ffffff">
 <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #ffffff00;" bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
  <tr>
   <td align="center" valign="top">
    <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
     <tr>
      <td style="padding: 0px 0px 0px 0px;" align="left" valign="top">
       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Transactional 8 -->
          
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td style="padding: 11px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w520-padding-30-30-30-30 pc-w620-padding-35-35-35-35" style="padding: 40px 40px 40px 40px; background-color: #ffffff00;" bgcolor="#ffffff">



                ${
									this.siteData?.banner
										? `
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td valign="top">
                   <img src="${this.siteData.banner}" width="520" height="auto" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 100%; height: auto; border-radius: 8px 8px 8px 8px; border: 0;" />
                  </td>
                 </tr>
                </table>
                    `
										: ''
								}
                


                ${
									this.siteData?.siteUrl
										? `
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td style="padding: 16px 0px 0px 0px; ">
                   <table class="pc-width-hug pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; border-spacing: 0;">
                    <tbody>
                     <tr>
                      <td align="left" valign="top" style="padding: 0px 16px 0px 0px;">
                       <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                           <tr>
                            <td valign="top" align="left">
                             <div class="pc-font-alt pc-w620-fontSize-30 pc-w620-lineHeight-133pc" style="line-height: 128%; letter-spacing: -0.6px; font-family: Arial, Helvetica, sans-serif; font-size: 36px; font-weight: 800; font-variant-ligatures: normal; color: #151515; text-align: left; text-align-last: left;">
                              <div><span>${this.siteData?.siteUrl.replace('https://', '')}</span>
                              </div>
                             </div>
                            </td>
                           </tr>
                          </table>
                         </td>
                        </tr>
                       </table>
                      </td>

                      ${
												this.siteData?.favicon && !this.siteData?.favicon.includes('.svg')
													? `<td align="center" valign="middle" style="padding: 0px 0px 0px 0px;">
                       <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                         <td align="left" valign="top">
                          <a class="pc-font-alt" href="${this.siteData.siteUrl}" target="_blank" style="text-decoration: none;">
                           <img src="${this.siteData.favicon}" class="" width="32" height="32" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 32px; height: 32px;" alt="" />
                          </a>
                         </td>
                        </tr>
                       </table>
                      </td>`
													: ''
											}

                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                </table>
                    `
										: ''
								}



                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 32px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt pc-w620-fontSize-18 pc-w620-lineHeight-156pc" style="line-height: 150%; letter-spacing: -0.4px; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-weight: normal; font-variant-ligatures: normal; color: #94a3b8; text-align: left; text-align-last: left;">
                       <div><span style="color: rgb(148, 163, 184);">${this.formTitle}</span>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>



                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px; ">
                   <table class="pc-width-fill pc-w620-tableCollapsed-0" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; width: 100%;">
                    <tbody>

                     ${this.entries
												.map(
													([label, value], i, arr) => `
                        <tr bgcolor="transparent" style="background-color: transparent;">
                      <td width="116" align="left" valign="top" style="padding: 12px 32px 12px 0px;${i !== arr.length - 1 ? 'border-bottom: 2px solid #94a3b8;' : ''}">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                        <tr>
                         <td valign="top" align="left">
                          <div class="pc-font-alt" style="line-height: 163%; letter-spacing: -0.2px; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; font-variant-ligatures: normal; color: #151515; text-align: left; text-align-last: left;">
                           <div><span style="font-weight: 700;font-style: normal; white-space: nowrap;">${label}</span>
                           </div>
                          </div>
                         </td>
                        </tr>
                       </table>
                      </td>
                      <td align="left" valign="top" style="padding: 12px 0px 12px 0px;${i !== arr.length - 1 ? 'border-bottom: 2px solid #94a3b8;' : ''}">
                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                        <tr>
                         <td valign="top" align="left">
                          <div class="pc-font-alt" style="line-height: 163%; letter-spacing: -0.2px; font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: normal; font-variant-ligatures: normal; color: #475569; text-align: left; text-align-last: left;">
                           <div><span style="color: #475569;">${value}</span>
                           </div>
                          </div>
                         </td>
                        </tr>
                       </table>
                      </td>
                     </tr>
                        `
												)
												.join('\n')}
                    </tbody>
                   </table>
                  </td>
                 </tr>
                </table>


                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td valign="top" style="padding: 64px 0px 0px 0px;">
                   <img src="${ORIGIN}/fichar-imago.png" width="104" height="auto" alt="" style="display: block; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 20%; height: auto; border-radius: 8px 8px 8px 8px; border: 0;" />
                  </td>
                 </tr>
                </table>


               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>


          <!-- END MODULE: Transactional 8 -->
         </td>
        </tr>
       </table>
      </td>
     </tr>
    </table>
   </td>
  </tr>
 </table>
 <!-- Fix for Gmail on iOS -->
 <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 </div>
</body>

</html>
`
	}

	private head = `

<head>
 <meta charset="UTF-8" />
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <!--[if !mso]><!-- -->
 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <!--<![endif]-->
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <meta name="format-detection" content="telephone=no" />
 <meta name="format-detection" content="date=no" />
 <meta name="format-detection" content="address=no" />
 <meta name="format-detection" content="email=no" />
 <meta name="x-apple-disable-message-reformatting" />
 <title>New Submission Fich.ar Template</title>
 <style>
 html,
         body {
             margin: 0 !important;
             padding: 0 !important;
             min-height: 100% !important;
             width: 100% !important;
             -webkit-font-smoothing: antialiased;
         }
 
         * {
             -ms-text-size-adjust: 100%;
         }
 
         #outlook a {
             padding: 0;
         }
 
         .ReadMsgBody,
         .ExternalClass {
             width: 100%;
         }
 
         .ExternalClass,
         .ExternalClass p,
         .ExternalClass td,
         .ExternalClass div,
         .ExternalClass span,
         .ExternalClass font {
             line-height: 100%;
         }
 
         table,
         td,
         th {
             mso-table-lspace: 0 !important;
             mso-table-rspace: 0 !important;
             border-collapse: collapse;
         }
 
         u + .body table, u + .body td, u + .body th {
             will-change: transform;
         }
 
         body, td, th, p, div, li, a, span {
             -webkit-text-size-adjust: 100%;
             -ms-text-size-adjust: 100%;
             mso-line-height-rule: exactly;
         }
 
         img {
             border: 0;
             outline: 0;
             line-height: 100%;
             text-decoration: none;
             -ms-interpolation-mode: bicubic;
         }
 
         a[x-apple-data-detectors] {
             color: inherit !important;
             text-decoration: none !important;
         }
 
         .pc-gmail-fix {
             display: none;
             display: none !important;
         }
 
         .body .pc-project-body {
             background-color: transparent !important;
         }
 
         @media (min-width: 621px) {
             .pc-lg-hide {
                 display: none;
             } 
 
             .pc-lg-bg-img-hide {
                 background-image: none !important;
             }
         }
 </style>
 <style>
 @media (max-width: 620px) {
 .pc-project-body {min-width: 0px !important;}
 .pc-project-container {width: 100% !important;}
 .pc-sm-hide {display: none !important;}
 .pc-sm-bg-img-hide {background-image: none !important;}
 .pc-w620-fontSize-30 {font-size: 30px !important;}
 .pc-w620-lineHeight-133pc {line-height: 133% !important;}
 .pc-w620-fontSize-18 {font-size: 18px !important;}
 .pc-w620-lineHeight-156pc {line-height: 156% !important;}
 table.pc-w620-spacing-0-0-0-0 {margin: 0px 0px 0px 0px !important;}
 td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin: 0 !important;padding: 0px 0px 0px 0px !important;}
 .pc-w620-padding-35-35-35-35 {padding: 35px 35px 35px 35px !important;}
 
 .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
 .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
 .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
 .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;margin-left: 0 !important;}
 .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
 .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
 .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
 .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
 
 .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
 
 .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
 .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
 .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
 .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
 .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
 .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
 }
 @media (max-width: 520px) {
 .pc-w520-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
 }
 </style>
 <!--[if mso]>
    <style type="text/css">
        .pc-font-alt {
            font-family: Arial, Helvetica, sans-serif !important;
        }
    </style>
    <![endif]-->
 <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
</head>`
}
