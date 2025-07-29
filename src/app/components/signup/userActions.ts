//@ts-nocheck
import { addUserToDB } from "@/app/actions/prismaActions";
import toast from "react-hot-toast";
export default async function createuserinDb(formdata:FormData) {
    const values = {
      name: formdata.get("name") as string,
      dob: {
        dob_day: formdata.get("dob_day") as string,
        dob_month: formdata.get("dob_month") as string,
        dob_year: formdata.get("dob_year") as string,
      },
      email: formdata.get("email") as string,
      school: formdata.get("school") as string,
      address: formdata.get("address") as string,
      password: formdata.get("password") as string,
    };
    const dobString = `${values.dob.dob_year}-${values.dob.dob_month.padStart(
      2,
      "0"
    )}-${values.dob.dob_day.padStart(2, "0")}`;
    const dobDate = new Date(dobString);
    const userToCreate = {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      dob: dobDate,
      password: formdata.get("password") as string,
      school: formdata.get("school") as string,
      address: formdata.get("address") as string,
    };
    const userCreatedObj = await addUserToDB(userToCreate);
    if (userCreatedObj.success) {
      toast.success("User added in database");
    } else {
      console.log(userCreatedObj.message);
    }
  }