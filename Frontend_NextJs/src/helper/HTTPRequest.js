import axios, { AxiosRequestConfig } from "axios";
// import { CommonActions } from '@react-navigation/native';
// import { asyncStorageKeys, CommonResource } from '../helper/CommonResource';

import jstz from "jstz";
// import { BASE_URL, VERSION } ;
import { BASE_URL, VERSION } from "./ApiUrls/page";
const timezone = jstz.determine();
// const getData = async () => {
//     try {
//         let localData =
//     } catch (error) {

//     }
// }

const handleLanguage = () => {
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    // Access localStorage
    if (!localStorage || localStorage.i18nextLng == "dn") {
      return "dn";
    } else {
      return "en";
    }
  }
}
const handleToken = () => {
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    // Access localStorage
    if (localStorage.token) {
      return localStorage?.token
    } else {
      return "";
    }
  }
}
export default class Http {
  static axios = axios.create({
    baseURL: BASE_URL + VERSION, //base url enter here
    headers: {
      "Content-Type": "application/json",
      timeZone: timezone.name(),
      appLanguage: handleLanguage() == "dn" ? "danish" : "english",
      deviceType: "web",
      language: handleLanguage(),
      deviceId: handleToken()
    },
  });

  static Applinking = async () => { };

  static logout = () => { };

  static getToken = async () => {
    let sessionToken = localStorage.token;
    // let guestToken = await getData(asyncStorageKeys.guestToken);
    let guestToken = localStorage.guestToken;

    if (sessionToken) {
      // console.log("my token session token", sessionToken);
      return {
        "x-auth": sessionToken,
      };
    } else if (guestToken) {
      // console.log("my guest token", guestToken);
      return {
        guestToken: guestToken,
      };
    } else {
      return null;
    }
  };

  static async get(url, body, config = AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      // const token = localStorage.token;
      const _body = body ? body : {};
      const latestConfig = token ? { headers: token, params: _body } : config;
      const response = await Http.axios.get(url, latestConfig);
      // if (response.data.code == 102) {
      //     Alert.alert(
      //         "New version available",
      //         "Please, update app to new version to continue order",
      //         [
      //             { text: "UPDATE", onPress: () => Http.Applinking() }
      //         ],
      //         { cancelable: false }
      //     );
      // } else if (response.data.code == 100) {
      //     return await Http.AsyncAlert(url, latestConfig)
      // }''
      // else if (response.data.code == 345) {

      // } else {
      //     return response.data;
      // }

      if (response.data.code === 123) {
        // window.location.reload()

        return response.data
      }
      else if (response.data.code === 345) {
        localStorage.clear();
        // location.reload();
        // return response.data
      }
      else if (response.data.code === 403) {
        localStorage.clear();
        window.location.href = "/";
        // return response.data
      }
      else {
        return response.data;
      }
    } catch (err) {
      console.log("get catch error****", err.response, url);
      // Http.handleErrors(err);
      return Promise.reject(err);
    }
  }

  static async post(url, body, config = AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const latestConfig = token ? { headers: token } : config;
      const response = await Http.axios.post(url, body, latestConfig);
      // if (response.data.code == 102) {
      //     Alert.alert(
      //         "New version available",
      //         "Please, update app to new version to continue order",
      //         [
      //             { text: "UPDATE", onPress: () => Http.Applinking() }
      //         ],
      //         { cancelable: false }
      //     );
      // } else if (response.data.code == 100) {
      //     return await Http.AsyncAlertPost(url, body, latestConfig)
      // }
      // else if (response.data.code == 301) {
      //     return await Http.ChangeBranchCart(url, body, latestConfig)
      // } else {
      //     return response.data;
      // }
      if (response.data.code === 123) {
        // guestTokenService()
        // window.location.reload()

        return response.data

      } else if (response.data.code === 403) {
        if (response?.data?.message == "Your account has been deactivated, For further details contact  your business owner  or iinsty support team."
          || response?.data?.message == "Your account  deactivated by admin"
          || "Din konto er blevet deaktiveret af admin"
          || "Din konto er blevet deaktiveret. Kontakt din virksomhedsejer eller iinstys supportteam for yderligere oplysninger."
        ) {
          return response.data
        } else {
          localStorage.clear();
          window.location.href = "/";
        }
        // return response.data
      }

      else if (response.data.code === 345) {
        localStorage.clear();
        // location.reload()
        return response.data;
      } else {
        return response.data;
      }
    } catch (err) {
      console.log("api error", err.response);
      // Http.handleErrors(err);
      return Promise.reject(err);
    }
  }

  static async patch(url, body, config = AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const latestConfig = token ? { headers: token } : config;
      const response = await Http.axios.patch(url, body, latestConfig);
      if (response) {
        return response.data;
      }
    } catch (err) {
      // Http.handleErrors(err);
      return Promise.reject(err);
    }
  }

  static async delete(url, config = AxiosRequestConfig) {
    try {
      const token = await Http.getToken();
      const latestConfig = token ? { headers: token } : config;
      const response = await Http.axios.delete(url, latestConfig);
      if (response) {
        return response.data;
      } else if (response.data?.code === 403) {
        localStorage.clear();
        window.location.href = "/";
        // return response.data
      }
    } catch (err) {
      // Http.handleErrors(err);
      return Promise.reject(err);
    }
  }

  static handleErrors(error) {
    if (error.response) {
      const message = error.response.data.message;
      const errorMessage = message
        ? message
        : "Something Went Wrong, Please Try Again";
      if (Platform.OS === "android") {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      } else {
        Alert.alert("Error", errorMessage);
      }
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Something Went Wrong", ToastAndroid.LONG);
      } else {
        Alert.alert("Something Went Wrong");
      }
    }
  }
}
