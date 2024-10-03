import { useForm, register, handleSubmit } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./App.css";
import "./css/style.css";
import "./fonts/material-icon/css/material-design-iconic-font.min.css";
import { useNavigate } from "react-router-dom";
import signupImages from "./images/signup-image.jpg";

const Login = () => {
  const navigation = useNavigate();

  const schema = yup
    .object()
    .shape({
      email_input: yup
        .string()
        .required("Enter Email ID")
        .email("Enter valid email"),
      password_input: yup
        .string()
        .required("Enter Password")
        .min(4, "Min 4 digit"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const staticCredentials = {
    email: "nitesh@gmail.com",
    password: "nitesh",
  };

  const submit = (data) => {
    // alert("test")

    if (
      data.email_input === staticCredentials.email &&
      data.password_input === staticCredentials.password
    ) {
      navigation("/todo-view");
    } else {
      alert("Credentials Are Wrong");
    }
  };

  return (
    <>
      <div class="main">
        <section class="signup">
          <div class="container">
            <div class="signup-content">
              <div class="signup-form">
                <h2 class="form-title">Login</h2>
                <form onSubmit={handleSubmit(submit)}>
                  <div class="form-group">
                    <label for="name">
                      <i class="zmdi zmdi-account material-icons-name"></i>
                    </label>
                  </div>
                  <div class="form-group">
                    <label for="email">
                      <i class="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="text"
                      name="email_input"
                      id="email_input"
                      placeholder="Your Email"
                      {...register("email_input")}
                    />
                    {errors.email_input?.message && (
                      <p className="Error-Color">
                        {errors.email_input?.message}
                      </p>
                    )}
                  </div>
                  <div class="form-group">
                    <label for="pass">
                      <i class="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="text"
                      name="password_input"
                      id="password_input"
                      placeholder="Password"
                      {...register("password_input")}
                    />
                    {errors.password_input?.message && (
                      <p className="Error-Color">
                        {errors.password_input?.message}
                      </p>
                    )}
                  </div>
                  <div class="form-group form-button">
                    <button class="form-submit" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div class="signup-image">
                <figure>
                  <img src={signupImages} alt="Example" />

                  <h3>email : nitesh@gmail.com</h3>
                  <h3>password : nitesh</h3>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
