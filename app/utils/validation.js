import * as yup from 'yup';
import React from 'react';
// import moment from 'moment';

export const RenderError = (error = false) => {
  if (error) return <div className="text-red-600 mt-1 text-12">{error}</div>;
};

const emailRegx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

export const emailValidation = yup.object({
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegx, 'Please enter valid email.'),
});

export const passwordValidation = yup.object({
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegx,
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
    ),
});
export const addCreditValidation = yup.object().shape({
  transactionCode: yup.string().required('Please enter password'),
  credit: yup
    .number()
    .typeError('Please enter a valid number')
    .required('Please enter credit reference')
    .min(0, 'Credit cannot be negative'),
});
export const addUserValidation = yup.object().shape({
  username: yup
    .string()
    .required('Please enter username')
    .matches(/^\S*$/, 'Spaces are not allowed in username'),
  fullname: yup.string().required('Please enter full name'),
  city: yup.string().required('Please enter city'),
  ap: yup.string().required('Please enter comission'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be a 10-digit number')
    .required('Please enter phone number'),
  transactionCode: yup.string().required('Please enter master password'),
  creditAmount: yup.string().required('Please enter opening balance'),
  password: yup
    .string()
    .required('Please enter password')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('password')], 'Passwords not matched'),
});
export const changePasswordValidation = yup.object().shape({
  // transactionCode: yup.string().required('Please enter master password'),
  oldPassword: yup.string().required('Please enter old password'),
  newPassword: yup.string().required('Please enter password'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('newPassword')], 'Passwords not matched'),
});

export const adminChangePasswordValidation = yup.object().shape({
  oldPassword: yup.string().required('Please enter old password'),
  newPassword: yup.string().required('Please enter password'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('newPassword')], 'Passwords not matched'),
});

export const changePasswordUserValidation = yup.object().shape({
  masterpassword: yup.string().required('Please enter master password'),
  userPassword: yup.string().required('Please enter new password'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('userPassword')], 'Passwords not matched'),
});
export const depositAdminValidation = yup.object().shape({
  creditAmount: yup.string().required('Please enter deposit amount'),
  transactionCode: yup.string().required('Please enter master password'),
});
export const withdrawAdminValidation = yup.object().shape({
  withdrawAmount: yup.string().required('Please enter deposit amount'),
  transactionCode: yup.string().required('Please enter master password'),
});
export const addBalanceValidation = yup.object().shape({
  amount: yup.string().required('Please enter amount'),
  remark: yup.string().required('Please enter remark'),
  transactionCode: yup.string().required('Please enter master password'),
});
export const loginValidation = yup.object().shape({
  username: yup.string().required('Please enter email address'),
  password: yup.string().required('Please enter password'),
});
export const addQrValidation = yup.object().shape({
  image: yup.string().required('Please Select image'),
  qrtype: yup.string().required('Please Select QR Type'),
  upi: yup.string().required('Please enter Upi ID'),
});
export const addMobileValidation = yup.object().shape({
  mobileNo: yup.string().required('Please enter mobile number'),
});
export const rejectionValidation = yup.object().shape({
  reason: yup.string().required('Please enter rejection reason'),
});
export const statusChangeValidation = yup.object().shape({
  transactionCode: yup.string().required('Please enter your password'),
  betLock: yup.boolean().oneOf([true, false], 'select any one status'),
  userLock: yup.boolean().oneOf([true, false], 'select any one status'),
});

export const forgotPasswordValidation = yup.object().shape({
  phoneNumber: yup.string().required('Please enter phone number'),
});
export const verificationCodeValidation = yup.object().shape({
  mobile: yup.string().required('Please enter phone number'),
  code: yup
    .string()
    .required('Please enter verification code')
    .matches(/^\d{4}$/, 'Verification code must be have 4 digits'),
  password: yup
    .string()
    .required('Please enter password')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please enter confirm password')
    .oneOf([yup.ref('password')], 'Passwords not matched'),
});

export const registerValidation = yup.object().shape({
  phoneNumber: yup.number().required('Please enter phone number'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegx,
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
    ),
  condition: yup
    .boolean()
    .oneOf([true], 'Please accept the Terms and Conditions'),
});
export const depositValidation = yup.object().shape({
  paymentMethod: yup.string().required('Please select payment method'),
  utr: yup.string().required('Please enter UTR ID'),
  img: yup.string().required('Please select image'),
  amount: yup.string().required('Please enter amount'),
  condition: yup
    .boolean()
    .oneOf([true], 'Please accept the Terms and Conditions'),
});

export const withdrawValidation = yup.object().shape({
  amount: yup.string().required('Please enter amount'),
});
export const addAccountValidation = yup.object().shape({
  bankName: yup.string().required('Please select bank name'),
  ifscCode: yup.string().required('Please enter IFSC code'),
  accountType: yup.string().required('Please select type'),
  accountNumber: yup.string().required('Please enter account number'),
  acountholdername: yup.string().required('Please enter account holder name'),
});

export const addUpiValidation = yup.object().shape({
  upiName: yup.string().required('Please enter name'),
  upiId: yup.string().required('Please enter UPI id'),
});

export const betPlaceValidation = yup.object().shape({
  stake: yup
    .number()
    .min(0, 'Amount must be greater than 0')
    .required('Please enter bet amount'),
});

export const updateProfileValidation = yup.object().shape({
  email: yup.string().matches(emailRegx, 'Please enter valid email'),
  firstname: yup.string().required('Please enter first name'),
  lastname: yup.string().required('Please enter last name'),
});

export const updateUserProfileValidation = yup.object().shape({
  email: yup.string().matches(emailRegx, 'Please enter valid email'),
  firstname: yup.string(),
  lastname: yup.string(),
  country: yup.string(),
  dialcode: yup.string(),
  mobile: yup.string(),
  password: yup
    .string()
    .matches(
      passwordRegx,
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
    ),
});

export const createUserValidate = yup.object().shape({
  mobile: yup.string().required('Please enter phone number'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegx,
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
    ),
  amount: yup.string().required('Please enter credit amount'),
});

export const editUser = yup.object().shape({
  mobile: yup.string().required('Please enter phone number'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegx,
      'password must be eight characters including one uppercase letter, one special character and alphanumeric characters',
    ),
});

export const addBalance = yup.object().shape({
  balance: yup.string().required('Please enter balance amount'),
});
export const changeMobileValidation = yup.object().shape({
  password: yup.string().required('Please enter your password'),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be a 10-digit number')
    .required('Please enter a Mobile number'),
});

export const settelementValidation = yup.object().shape({
  remark: yup.string().required('Please enter remark'),
  transactionCode: yup.string().required('Please enter Transaction Code'),
});
