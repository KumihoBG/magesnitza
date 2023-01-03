// const qr = require("qrcode");

// const {
//   sendPurchaseConfirmationEmail,
//   sendPurchaseDeliveredStatusEmail,
// } = require("./emailSender");
// const { getProductById } = require("../services/productService");
// const { getParameterByParameterKey } = require("../services/parameterService");

// const purchaseConfirmation = async (newPurchase) => {
//   const name = newPurchase.buyer.name;
//   const userEmail = newPurchase.buyer.email;
//   const phone = newPurchase.buyer.phone;
//   const address = `${newPurchase.buyer.address.street} ${newPurchase.buyer.address.number}, ${newPurchase.buyer.address.zip} ${newPurchase.buyer.address.city}`;
//   const purchaseVS = newPurchase.purchaseVS;
//   const products = newPurchase.products;
//   const delivery = newPurchase.deliveryMethod.deliveryMethodPrice;
//   const paymentMethod = newPurchase.paymentMethod.paymentMethodPrice;
//   const method = newPurchase.paymentMethod.paymentMethodType;
//   const deliveryMethod = newPurchase.deliveryMethod.deliveryMethodType;
//   const today = new Date();

//   let totalPrice = 0;
//   let totalVat = 0;
//   let productsList = [];

//   await Promise.all(
//     products?.map(async (product) => {
//       const productId = product.productId;

//       try {
//         const productDetails = await getProductById(productId);

//         const currentProduct = { ...productDetails, count: product.count };
//         const price = productDetails.price * product.count;
//         const vat = Number(productDetails.vat) * product.count;
//         totalPrice += price;
//         totalVat += vat;

//         productsList.push(currentProduct);
//       } catch (err) {
//         console.log(err.message);
//       }

//       return productsList;
//     })
//   );

//   const companyDetails = await getParameterByParameterKey("company");
//   const companyBankAccount = companyDetails.parameterValue.companyBankAccount;
//   const companyIBAN = companyDetails.parameterValue.companyIBAN;
//   const total = totalPrice + totalVat + Number(delivery);
//   const curDate = new Date(today.setDate(today.getDate()));
//   const dueDate = curDate.toISOString().slice(0, 10);
//   const qrCodeInfo = `SPD*1.0*ACC:${companyIBAN}*AM:${total}.00*CC:CZK*PT:IP*X-VS:${purchaseVS}**DT:${dueDate}*MSG:Za nákup z oblíbené appky FireAlarm.cz :)`;

//   qr.toDataURL(qrCodeInfo, { errorCorrectionLevel: "M" }, (err, QRCode) => {
//     if (err) return console.log("Error occurred");

//     sendPurchaseConfirmationEmail(
//       name,
//       userEmail,
//       phone,
//       address,
//       purchaseVS,
//       delivery,
//       paymentMethod,
//       productsList,
//       totalPrice,
//       totalVat,
//       total,
//       QRCode,
//       companyDetails,
//       method,
//       deliveryMethod,
//       companyBankAccount
//     );
//   });
// };

// const purchaseStatusDelivered = async (purchaseDelivered) => {
//   const name = purchaseDelivered.buyer.name;
//   const userEmail = purchaseDelivered.buyer.email;
//   const phone = purchaseDelivered.buyer.phone;
//   const address = `${purchaseDelivered.buyer.address.street} ${purchaseDelivered.buyer.address.number}, ${purchaseDelivered.buyer.address.zip} ${purchaseDelivered.buyer.address.city}`;
//   const purchaseVS = purchaseDelivered.purchaseVS;
//   const purchaseStatus = purchaseDelivered.purchaseStatus;
//   const purchaseDate = purchaseDelivered.date.toISOString().slice(0, 10);
//   const products = purchaseDelivered.products;
//   const delivery = purchaseDelivered.deliveryMethod.deliveryMethodPrice;
//   const paymentMethod = purchaseDelivered.paymentMethod.paymentMethodPrice;
//   const method = purchaseDelivered.paymentMethod.paymentMethodType;
//   const deliveryMethod = purchaseDelivered.deliveryMethod.deliveryMethodType;
//   const today = new Date();

//   let totalPrice = 0;
//   let totalVat = 0;
//   let productsList = [];

//   await Promise.all(
//     products?.map(async (product) => {
//       const productId = product.productId;

//       try {
//         const productDetails = await getProductById(productId);

//         const currentProduct = { ...productDetails, count: product.count };
//         const price = productDetails.price * product.count;
//         const vat = Number(productDetails.vat) * product.count;
//         totalPrice += price;
//         totalVat += vat;

//         productsList.push(currentProduct);
//       } catch (err) {
//         console.log(err.message);
//       }

//       return productsList;
//     })
//   );

//   const companyDetails = await getParameterByParameterKey("company");
//   const companyBankAccount = companyDetails.parameterValue.companyBankAccount;
//   const companyIBAN = companyDetails.parameterValue.companyIBAN;
//   const total = totalPrice + totalVat + Number(delivery);
//   const curDate = new Date(today.setDate(today.getDate()));
//   const dueDate = curDate.toISOString().slice(0, 10);
//   const qrCodeInfo = `SPD*1.0*ACC:${companyIBAN}*AM:${total}.00*CC:CZK*PT:IP*X-VS:${purchaseVS}**DT:${dueDate}*MSG:Za nákup z oblíbené appky FireAlarm.cz :)`;

//   qr.toDataURL(qrCodeInfo, { errorCorrectionLevel: "M" }, (err, QRCode) => {
//     if (err) return console.log("Error occurred");

//     sendPurchaseDeliveredStatusEmail(
//       name,
//       userEmail,
//       phone,
//       address,
//       purchaseVS,
//       delivery,
//       paymentMethod,
//       purchaseStatus,
//       purchaseDate,
//       productsList,
//       totalPrice,
//       totalVat,
//       total,
//       QRCode,
//       companyDetails,
//       method,
//       deliveryMethod,
//       companyBankAccount
//     );
//   });
// };
// module.exports = {
//   purchaseConfirmation,
//   purchaseStatusDelivered,
// };
