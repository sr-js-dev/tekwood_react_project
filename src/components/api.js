const BASEURL = 'https://brandnewkey.sohosted-vps.nl:44402';
export default {
    Login: `${BASEURL}/api/Login/Login`,
    GetUserData: `${BASEURL}/api/users/searchUser`,
    PostUserData: `${BASEURL}/api/users/Create`,
    GetUserDataById: `${BASEURL}/api/users/GetById/`,
    PostUserUpdate: `${BASEURL}/api/users/Update/`,
    DeactivateUser: `${BASEURL}/api/users/DeactivateUser/`,
    PostSetting: `${BASEURL}/api/Settings`,
    GetSettingData: `${BASEURL}/api/Settings`,
    PostSisowData: `${BASEURL}/api/Sisow`,
  };