import * as Yup from "yup";
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);

export const getValidationSchema = (hasSubareas, requiresDate) => {
  return Yup.object().shape({
    name: Yup.string()
      .min(3, "O campo Nome precisa ter no mínimo 3 caracteres.")
      .required("O campo Nome completo é obrigatório."),
    email: Yup.string()
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,"E-mail inválido.")
      .required("O campo E-mail é obrigatório."),
    linkedin: Yup.string()
      .matches(/((https:\/\/)((www|\w\w)\.)linkedin\.com\/)((([\w]{2,3}))|([^\/]+\/(([\w|\d-&#=])+\/){1,}))$/,"Linkedin inválido.")
      .required("O campo Linkedin é obrigatório."),
    indicationLinkedin: Yup.string()
      .when('indication', {
        is: 'sim',
        then: (schema) => schema.matches(/((https:\/\/)((www|\w\w)\.)linkedin\.com\/)((([\w]{2,3}))|([^\/]+\/(([\w|\d-&#=])+\/){1,}))$/, "Linkedin inválido.")
          .required("O campo Linkedin é obrigatório."),
        otherwise: (schema) => schema.nullable(),
      }),
    area: Yup.string()
      .required("* Escolha uma opção por favor."),
    subarea: hasSubareas
      ? Yup.string().required("* Escolha uma opção por favor.")
      : Yup.string().nullable(),
    startDate: requiresDate
      ? Yup.date().min(new Date().toISOString().split("T")[0],"* A data não deve ser retroativa.").required("Por favor, escolha uma data.")
      : Yup.date().nullable(),
    volunteerMotivation: Yup.string()
      .min(200, "O campo deve ter no mínimo 200 caracteres.")
      .max(500, "O campo deve ter no máximo 500 caracteres.")
      .required("O campo é obrigatório."),
    experienceTime: Yup.string()
      .required("O campo é obrigatório."),
    jobExperience: Yup.string()
      .min(200, "O campo deve ter no mínimo 200 caracteres.")
      .max(500, "O campo deve ter no máximo 500 caracteres.")
      .required("O campo é obrigatório."),
    otherExperiences: Yup.string()
      .max(500, "O campo deve ter no máximo 500 caracteres."),
    contactAgreement: Yup.boolean().oneOf([true], "Você deve marcar esta opção."),
    volunteeringAgreement: Yup.boolean().oneOf([true], "Você deve marcar esta opção."),
    termsAgreement: Yup.boolean().oneOf([true], "Você deve marcar esta opção."),
  });
};

export const initialValues = {
  name: "",
  email: "",
  linkedin: "",
  indication:"não",
  indicationLinkedin:"",
  area: "",
  availability: "Até 5 horas semanais",
  experienceTime: "1 ano",
  turn: "turno-disponivel",
  startOption: "Imediato",
  jobExperience: "",
  volunteerMotivation: "",
  collaboration: "with-collaboration",
  otherExperiences: "",
  contactAgreement: false,
  volunteeringAgreement: false,
  termsAgreement: false
}