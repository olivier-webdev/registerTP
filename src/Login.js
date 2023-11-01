import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export default function Login({ setUser, changeView }) {
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const yupSchema = yup.object({
    email: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Le champ doit comporter 5 caractères"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    setFeedbackError("");
    console.log(values);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        if (!user) {
          setFeedbackError("Email et/ou password incoorects");
        } else {
          reset(defaultValues);
          setUser(user);
          setFeedback("Connexion OK. Vous allez être redirigé");
          setTimeout(() => {
            changeView("homepage");
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center flex-fill`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">
            Email
          </label>
          <input {...register("email")} type="text" id="email" />
          {errors?.email && (
            <p className="text-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            Password
          </label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
        {feedbackError && <p className="text-error">{feedbackError}</p>}
        {feedback && <p className="text-good">{feedback}</p>}
      </form>
    </div>
  );
}
