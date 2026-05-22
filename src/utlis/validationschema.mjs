import user from "./constant.mjs";
export   const uservalidation = {
        username:{
        in:["body"],
        isLength :{
            options :{
                min:3,
                max:20,
            },
            errorMessage:
                "username atleast between 3 and 10",
        },
        notEmpty:{
            errorMessage:"username should not be empty",
        },
        isString:{
            errorMessage:"usrname msut be string",
        }
    },
    name:{
        in:["body"],
        isString:{
            errorMessage:"name should be string",
        }
    },
    pass: {
    in: ["body"],
    isString: true,
    notEmpty: { errorMessage: "password is required" },
    isLength: {
      options: { min: 8 },
      errorMessage: "password must be at least 8 characters long",
    },
    custom: {
      options: (value) => {
        if (!/[A-Z]/.test(value)) throw new Error("password must contain at least one uppercase letter");
        if (!/[0-9]/.test(value)) throw new Error("password must contain at least one number");
        return true;
      },
    },
  },
}
export const userQuerySchema = {
  filter: {
    in: ["query"],
    optional: true,
    isLength: { options: { min: 3, max: 5 }, errorMessage: "provide a valid filter (3-5 chars)" },
    isString: { errorMessage: "filter must be a string" }
  },
  value: {
    in: ["query"],
    optional: true,
    isString: { errorMessage: "value must be a string" }
  }
};