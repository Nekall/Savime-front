interface SignupProps {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export const signUpValidators = ({
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  }: SignupProps) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    let errors = {
      noErrors: true,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
  
    if (email !== "") {
      if (!email.match(regex)) {
        errors.email = "Format of the email is not correct.";
        errors.noErrors = false;
      }
    } else {
      errors.email = "Email cannot be empty.";
      errors.noErrors = false;
    }
  
    if (password !== "") {
      if (password !== confirmPassword) {
        errors.password = "Passwords do not match.";
        errors.noErrors = false;
      }
    } else {
      errors.password = "Password cannot be empty.";
      errors.noErrors = false;
    }
  
    if (firstname === "") {
      errors.firstname = "Firstname cannot be empty.";
      errors.noErrors = false;
    }
  
    if (lastname === "") {
      errors.lastname = "Lastname cannot be empty.";
      errors.noErrors = false;
    }
  
    return errors;
  };

  interface LoginProps {
    email: string,
    password: string,
}
  
  export const loginValidators = ({ email, password }: LoginProps) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    let errors = {
      noErrors: true,
      email: "",
      password: "",
    };
  
    if (email !== "") {
      if (!email.match(regex)) {
        errors.email = "Format of the email is not correct.";
        errors.noErrors = false;
      }
    } else {
      errors.email = "Email cannot be empty.";
      errors.noErrors = false;
    }
  
    if (password === "") {
      errors.password = "Password cannot be empty.";
      errors.noErrors = false;
    }
  
    return errors;
  };