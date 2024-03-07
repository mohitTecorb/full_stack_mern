import axios from "axios";
import Http from "../HTTPRequest"
import { API_URL, BASE_URL, VERSION  } from "../ApiUrls/page";


// ********************* Signup SERVICE *********************

export const signUpService = async (data:any) => {
    let response = Http.post(API_URL.SIGN_UP, { ...data });
    return response;
  };