const BASEURL = 'https://qf.tekwoods.nl';
export default {
    Login: `${BASEURL}/api/Login/Login`,
    LoginAs: `${BASEURL}/api/Login/LoginAs/`,
    PostForgotPassEmail: `${BASEURL}/api/Accounts/SendForgotPasswordEmail`,
    PostResetPassword: `${BASEURL}/api/Accounts/ResetPassword`,
    GetUserData: `${BASEURL}/api/users/searchUser`,
    PostUserData: `${BASEURL}/api/users/Create`,
    GetUserDataById: `${BASEURL}/api/users/GetById/`,
    PostUserUpdate: `${BASEURL}/api/users/Update/`,
    DeactivateUser: `${BASEURL}/api/users/DeactivateUser/`,
    PostSetting: `${BASEURL}/api/Settings`,
    GetSettingData: `${BASEURL}/api/Settings`,
    PostSisowData: `${BASEURL}/api/Sisow`,
    PostHundeggerFile: `${BASEURL}/api/hundegger/Upload`,
    GetHundeggerFile: `${BASEURL}/api/hundegger/`,
    CompletePayment: `${BASEURL}/api/hundegger/CompletePayment/`,
    DownLoadFile: `${BASEURL}/api/hundegger/Download/`,
    GetCreditsHistory: `${BASEURL}/api/hundegger/GetCreditHistory`,
    GetCustomerData: `${BASEURL}/api/customers/Search`,
    PostCustomer: `${BASEURL}/api/customers/Create`,
    DeactivateCustomer: `${BASEURL}/api/customers/Deactivate/`,
    PostUpdateCustomer: `${BASEURL}/api/customers/Update/`,
  };
  
  