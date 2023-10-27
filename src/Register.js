import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export default function Register({ changeView }) {
  const [feedback, setFeedback] = useState("");

  const yupSchema = yup.object({
    name: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit comporter 2 caractères")
      .max(12, "Le champ ne doit pas contenir plus de 12 caractères"),
    email: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Le champ doit comporter 5 caractères"),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    cgu: yup.boolean().oneOf([true], "Vous devez accepter les CGU"),
    hobbies: yup.array().of(
      yup.object({
        value: yup.string().required("Ce champ doit être renseigné"),
      })
    ),
  });

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "woman",
    cgu: false,
    techno: "CSS",
    hobbies: [],
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "hobbies",
    control,
  });

  function addHobby() {
    append({
      value: "",
      level: "beginner",
    });
  }

  function deleteHobby(id) {
    remove(id);
  }

  async function submit(values) {
    console.log(values);
    let user = {};
    user.username = values.name;
    user.email = values.email;
    user.password = values.password;
    user.gender = values.gender;
    user.techno = values.techno;
    user.hobbies = values.hobbies;
    try {
      const response = await fetch("http://localhost:8000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        reset(defaultValues);
        setFeedback("L'inscription s'est bien passé. Vous allez être redirigé");
        setTimeout(() => {
          changeView();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div
      className={`mh100 d-flex flex-column justify-content-center align-items-center`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="name" className="mb10">
            Nom
          </label>
          <input {...register("name")} type="text" id="name" />
          {errors?.name && <p className="text-error">{errors.name.message}</p>}
        </div>
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
        <div className="d-flex flex-column mb20">
          <label htmlFor="confirmPassword" className="mb10">
            Confirm password
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
          />
          {errors?.confirmPassword && (
            <p className="text-error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="techno" className="mb10">
            Techno préférée
          </label>
          <select {...register("techno")} id="techno">
            <option value="CSS">CSS</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="SQL">SQl</option>
          </select>
        </div>

        <div className="d-flex flex-column mb20">
          <label htmlFor="gender" className="mb10">
            Genre
          </label>
          <div>
            <label htmlFor="man">Homme</label>
            <input {...register("gender")} type="radio" value="man" id="man" />
          </div>
          <div>
            <label htmlFor="woman">Femme</label>
            <input
              {...register("gender")}
              type="radio"
              value="woman"
              id="woman"
            />
          </div>
          <div>
            <label htmlFor="other">Autres</label>
            <input
              {...register("gender")}
              type="radio"
              value="other"
              id="other"
            />
          </div>
        </div>

        <div className="d-flex flex-column mb20 align-items-center">
          <label
            htmlFor="hobbies"
            className="mb10 d-flex justify-content-center align-items-center"
          >
            <span className="flex-fill mr10">Hobbies</span>
            <button
              onClick={addHobby}
              type="button"
              className="btn btn-primary-reverse"
            >
              +
            </button>
          </label>
          <ul>
            {fields.map((hobby, index) => (
              <div key={hobby.id}>
                <li className="mb10">
                  <input
                    {...register(`hobbies[${index}].value`)}
                    type="text"
                    className="flex-fill mr10"
                  />
                  <select
                    className="mr20"
                    {...register(`hobbies[${index}].level`)}
                  >
                    <option value="beginner">Débutant</option>
                    <option value="bigfan">Expert</option>
                  </select>
                  <button
                    onClick={() => deleteHobby(index)}
                    className="btn btn-primary"
                  >
                    -
                  </button>
                </li>
                {errors?.hobbies && errors.hobbies[index] && (
                  <p className="text-error">
                    {errors.hobbies[index].value.message}
                  </p>
                )}
              </div>
            ))}
          </ul>
        </div>

        <div className="d-flex mb20 align-items-center">
          <label htmlFor="cgu" className="mr10">
            CGU
          </label>
          <input {...register("cgu")} type="checkbox" id="cgu" />
        </div>
        {errors?.cgu && <p className="text-error">{errors.cgu.message}</p>}
        <button className="btn btn-primary">Submit</button>
        {feedback && <p className="text-good">{feedback}</p>}
      </form>
    </div>
  );
}
