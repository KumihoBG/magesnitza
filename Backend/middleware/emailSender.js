const nodemailer = require("nodemailer");
const pug = require("pug");

require("dotenv").config({ path: "variables.env" });

const { MAIL_USER, MAIL_PASS, MAIL_ADDRESS, SITE_ROUTE_PROD, SITE_ROUTE_DEV } =
  process.env;
const today = new Date();
const date = today.toISOString().slice(0, 10);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const siteLink =
  process.env.NODE_ENV === "production" ? SITE_ROUTE_PROD : SITE_ROUTE_DEV;

const sendEmail = (options) => {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
};

const transporterOptions = (userEmail, subject, pugOptions) => ({
  from: MAIL_ADDRESS,
  to: userEmail,
  subject,
  attachDataUrls: true,
  html: pug.renderFile("views/emailTemplate.pug", pugOptions),
});
const transporterPurchaseDeliveredOptions = (
  userEmail,
  subject,
  pugOptions
) => ({
  from: MAIL_ADDRESS,
  to: userEmail,
  subject,
  attachDataUrls: true,
  html: pug.renderFile("views/emailStatusDeliveredTemplate.pug", pugOptions),
});

const getInvitationSubject = (purchaseVS) =>
  `FireAlarm - Informace o vaší objednávce číslo ${purchaseVS}`;
const getInvitationHeading = (purchaseVS) => `Objednávka: ${purchaseVS}`;
const getPurchaseDeliveredInvitationHeading = (purchaseVS) =>
  `Faktura číslo: ${purchaseVS}`;

const sendPurchaseConfirmationEmail = (
  name,
  userEmail,
  phone,
  address,
  purchaseVS,
  delivery,
  paymentMethod,
  productsList,
  totalPrice,
  totalVat,
  total,
  QRCode,
  companyDetails,
  method,
  deliveryMethod,
  companyBankAccount
) => {
  const subject = getInvitationSubject(purchaseVS);
  const companyName = companyDetails.parameterValue.companyName;
  const companyVAT = companyDetails.parameterValue.companyVAT;
  const companyPhone = companyDetails.parameterValue.companyPhone;
  const companyStreet = companyDetails.parameterValue.companyStreet;
  const companyNumber = companyDetails.parameterValue.companyNumber;
  const companyCity = companyDetails.parameterValue.companyCity;
  const companyZip = companyDetails.parameterValue.companyZip;
  const companyMail = companyDetails.parameterValue.companyMail;
  const checkPaymentMethod = method === "Bankovní převod";

  const informBuyer = {
    heading: getInvitationHeading(purchaseVS),
    textInfo: `děkujeme za vaši objednávku číslo "${purchaseVS} ze dne ${date}.`,
    details: "Zde zasíláme přehled vašeho nákupu:",
    totalAmount: checkPaymentMethod ? `Částka: ${total} Kč` : null,
    accountDetails: checkPaymentMethod ? `Účet: ${companyBankAccount}` : null,
    vs: checkPaymentMethod ? `VS: ${purchaseVS}` : null,
    purchaseVS,
    name,
    userEmail,
    phone,
    address,
    delivery: `${delivery} Kč`,
    paymentMethod: `${paymentMethod} Kč`,
    method: `"${method}"`,
    deliveryMethod: `"${deliveryMethod}"`,
    productsList,
    totalPrice: `${totalPrice} Kč`,
    totalVat: `${totalVat} Kč`,
    total: `${total} Kč`,
    QRCode,
    companyName,
    companyVAT,
    companyPhone,
    companyStreet,
    companyNumber,
    companyCity,
    companyZip,
    companyMail,
    companyBankAccount,
    checkPaymentMethod,
    paymentInfo: checkPaymentMethod
      ? "Uhraďte, prosíme, Vaši objednávku do 3 dnů, jinak bude stornována."
      : null,
  };

  const optionsTransporter = transporterOptions(
    userEmail,
    subject,
    informBuyer
  );
  sendEmail(optionsTransporter);
};

const sendPurchaseDeliveredStatusEmail = (
  name,
  userEmail,
  phone,
  address,
  purchaseVS,
  delivery,
  paymentMethod,
  purchaseStatus,
  purchaseDate,
  productsList,
  totalPrice,
  totalVat,
  total,
  QRCode,
  companyDetails,
  method,
  deliveryMethod,
  companyBankAccount
) => {
  const subject = `Děkujeme za Váš nákup: Daňový doklad k objednávce číslo ${purchaseVS}`;
  const companyName = companyDetails.parameterValue.companyName;
  const companyVAT = companyDetails.parameterValue.companyVAT;
  const companyPhone = companyDetails.parameterValue.companyPhone;
  const companyStreet = companyDetails.parameterValue.companyStreet;
  const companyNumber = companyDetails.parameterValue.companyNumber;
  const companyCity = companyDetails.parameterValue.companyCity;
  const companyZip = companyDetails.parameterValue.companyZip;
  const companyMail = companyDetails.parameterValue.companyMail;
  const today = new Date().toISOString().slice(0, 10);
  const checkPaymentMethod = method === "Bankovní převod";

  const informBuyer = {
    heading: getPurchaseDeliveredInvitationHeading(purchaseVS),
    dateOfPurchase: `Datum objednávky ${purchaseDate}`,
    accountantDate: `Datum uskutečnění zdanitelného plnění: ${today}`,
    changeStateDate: `Datum vystavení: ${today}`,
    totalAmount: checkPaymentMethod ? `Částka: ${total} Kč` : null,
    accountDetails: checkPaymentMethod ? `Účet: ${companyBankAccount}` : null,
    vs: checkPaymentMethod ? `VS: ${purchaseVS}` : null,
    purchaseVS,
    name,
    userEmail,
    phone,
    address,
    purchaseStatus,
    purchaseDate,
    delivery: `${delivery} Kč`,
    paymentMethod: `${paymentMethod} Kč`,
    method: `"${method}"`,
    deliveryMethod: `"${deliveryMethod}"`,
    productsList,
    totalPrice: `${totalPrice} Kč`,
    totalVat: `${totalVat} Kč`,
    total: `${total} Kč`,
    QRCode,
    companyName,
    companyVAT,
    companyPhone,
    companyStreet,
    companyNumber,
    companyCity,
    companyZip,
    companyMail,
    companyBankAccount,
    checkPaymentMethod,
    paymentInfo: checkPaymentMethod
      ? "Uhraďte, prosíme, Vaši objednávku do 3 dnů, jinak bude stornována."
      : null,
  };

  const optionsTransporter = transporterPurchaseDeliveredOptions(
    userEmail,
    subject,
    informBuyer
  );
  sendEmail(optionsTransporter);
};

const forgottenPassOptions = (email, subject, pugOptions) => ({
  from: MAIL_ADDRESS,
  to: email,
  subject,
  html: pug.renderFile("views/forgottenPassEmailTemplate.pug", pugOptions),
});

const sendEmailForgotPassword = (email, userId) => {
  const subject = "Zapomenuté heslo";
  const forgotPasswordTemplateOptions = {
    heading: "Změna hesla",
    textInfo: "Pro změnu vašeho hesla kliknete na odkaz níže.",
    link: `${siteLink}/change-password/${userId}`,
  };

  const optionsTransporter = forgottenPassOptions(
    email,
    subject,
    forgotPasswordTemplateOptions
  );
  sendEmail(optionsTransporter);
};

module.exports = {
  sendPurchaseConfirmationEmail,
  sendPurchaseDeliveredStatusEmail,
  sendEmailForgotPassword,
};
