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