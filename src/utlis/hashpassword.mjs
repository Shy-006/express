import bcrypt from "bcrypt";
const saltrounds = 10;

export const hashpassword = (pass) => {
  if (!pass) {
    throw new Error("hashpassword: pass is required");
  }
  const salt = bcrypt.genSaltSync(saltrounds);
  console.log(`salt: ${salt}`);
  return bcrypt.hashSync(pass, salt);
};

export const comparepassword = (pass,hashpassword)=> bcrypt.compareSync(pass,hashpassword);