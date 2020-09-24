import axios from 'axios';
import * as actionTypes from './actionTypes'

export const authStart = ()=>{

    return {
        type:actionTypes.AUTH_START
    }
       
}

export const authSuccess = (token,mobile) =>{

    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        mobile:mobile

    }

}

export const authFail = (error)=>{

    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }

}

export const logout = ()=>{

    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const auth = (mobile,password)=>{

    return dispatch =>{

            dispatch(authStart());

            const authData = {

                mobile:mobile,
                password:password
            }

            var url = 'http://localhost:443/login/index?data='+JSON.stringify(authData);

            axios.post(url,{
				"headers":{
					"content-type":"application/x-www-form-urlencoded"
				}
			}).then(response=>{

                const apiResponse = response.data;
               if(apiResponse==true){
                    dispatch(authSuccess(password,mobile));
               }
               else{
                    const redirectMsg = {};
                    redirectMsg.msg_text = "Invalid User id or password";
                    dispatch(authFail(redirectMsg));
               }



            }).catch(err=>{
                console.log(err);
                dispatch(authFail())

            })

    }


}