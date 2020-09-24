import React,{component} from 'react';
import {  BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import {connect} from 'react-redux';
import Input from '../UI/Input/Input';
import * as actions from '../../store/actions/index';

class login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
                        controls : {

                            mobile:{
                                        elementType:'input',
                                        elementConfig:{
                                            type:'text',
                                            placeholder:'Enter Mobile Number',
                                            label:'Mobile'
                                            
                                        },
                                        value:'',
                                        validation:{
                                            required:true
                                        },
                                        valid:false,
                                        touched:false


                            },
                            password:{

                                elementType:'input',
                                        elementConfig:{
                                            type:'password',
                                            placeholder:'Password',
                                            label:'password'
                                            
                                        },
                                        value:'',
                                        validation:{
                                            required:true
                                        },
                                        valid:false,
                                        touched:false
                            }

                        },
                        formIsValid:false



        }
    }
    checkValidity(value,rules){

        let isValid = true;
        if(rules.required){

            isValid = value.trim() !== '' && isValid;
        }
        if(rules.isEmail){
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test(value) && isValid;

        }
        return isValid;
}

    inputChangedHandler = (event,controlName)=>{

        const updatedControls = {

			...this.state.controls,
			[controlName]:{
				...this.state.controls[controlName],
				value:event.target.value,
				valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
				touched:true
			}
		}

		let formIsValid = true;
		for(let inputIdentifier in updatedControls){

			formIsValid = updatedControls[inputIdentifier].valid && formIsValid
		}

		this.setState({controls:updatedControls,formIsValid:formIsValid});


    }

    submitHandler = (event) =>{
		event.preventDefault();
        this.props.onAuth(this.state.controls.mobile.value,this.state.controls.password.value);
        
       

		
	}


    render(){

        

        const formElementsArray = [];

        for(let key in this.state.controls){
            formElementsArray.push({

                id:key,
                config:this.state.controls[key]

                 }
               
            )
        }

        let Form  = formElementsArray.map(formElement=>(

                <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shoudValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}

                />

        ))

        return(
            <div>

                <form onSubmit={this.submitHandler} > 
                
                {Form}

                <button
                    disabled={!this.state.formIsValid}
                        className="btn btn-primary">
                        
                        Sign In
                    </button>
                </form>
                
                    {/* <div className="form-group">
                                <label for="your_name" className="icon"><i class="fas fa-user"></i></label>
                                <input type="text" name="mobile" id="number" placeholder="Mobile Number" />
                            </div>
                            <div className="form-group">
                                <label for="your_pin" className="icon"><i class="fas fa-unlock-alt"></i></label>
                                <input type="password" name="your_pin" id="your_pin" placeholder="Password" />
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="rememberme" />
                                <label className="custom-control-label f_size_14" for="rememberme">Remember me</label>
                            </div>
                                <div className="form-group mt-4">
                                <button className="btn   btn-primary"><i class="fas fa-sign-in-alt mr-1"></i> Sign In</button>
                                </div>
                                <div className="form-group extranal_link">
                                <a href="#" className="mr-5" data-toggle="modal" data-target="#register_modal" data-dismiss="modal"><i class="fas fa-user-edit"></i> Create an account</a>
                                <a href="#"><i className="fas fa-eye"></i> Forgot Password</a>
                                </div> */}

            </div>


        )
    }


}

const mapStateToProps = state =>{

    console.log(state);

    return {

        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null

    }

}

const mapDispatchToProps = dispatch=>{
    return {
        
        onAuth : (mobile,password)=>dispatch(actions.auth(mobile,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(login)
