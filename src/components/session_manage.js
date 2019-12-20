import * as Auth   from './auth';

export default class SessionManager {
  static myInstance = null;
  static shared() {
    if (SessionManager.myInstance == null) {
        SessionManager.myInstance = new SessionManager();
    }

    return this.myInstance;
  }
  getAuthorizationHeader = () => {
    if(!Auth.getImpersonFlag()){
      return {
        headers: {
          'Authorization': 'Bearer ' + Auth.getUserToken(),
          'Content-Type': 'application/json',
        }
      };
    }else{
      return {
        headers: {
          'Authorization': 'Bearer ' + Auth.getImpersonUserToken(),
          'Content-Type': 'application/json',
        }
      };
    }
   
  };
}
