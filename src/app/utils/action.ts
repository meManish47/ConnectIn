export default function validateForm(formData:FormData){
    const errors :string[] =[]
    const values = {
        name : formData.get("name") as string,
        dob : {
            dob_day : formData.get("dob_day")as string,
            dob_month : formData.get("dob_month")as string,
            dob_year : formData.get("dob_year")as string
        },
        email :formData.get("email")as string,
        school :formData.get("school")as string,
        address :formData.get("address")as string,
        password :formData.get("password")as string
    }
    if (values.name.length< 4){
        errors.push("Name should be atleast 4 characters long!!")
    }

    const day = parseInt(values.dob.dob_day, 10);
    const month = parseInt(values.dob.dob_month, 10);
    const year = parseInt(values.dob.dob_year, 10);

    const currentYear = new Date().getFullYear();
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day < 1 || day > 31 ||
        month < 1 || month > 12 ||
     year < 1900 || year > currentYear
    ) {
        errors.push("Please enter a valid date of birth.");
    } else {
        const constructedDate = new Date(`${year}-${month}-${day}`);
        if (
            constructedDate.getDate() !== day ||
            constructedDate.getMonth() + 1 !== month || // getMonth is 0-indexed
            constructedDate.getFullYear() !== year
            ) {
      errors.push("Date of birth is not valid .");
    }
  }
  if(!EmailRegex.test(values.email)){
    errors.push("Please enter a valid Email address !!")
  }
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  if(!passwordRegex.test(values.password)){
    errors.push("Password must be at least 8 characters, include a number and a special character.");
  }
  if(values.address.length<10){
    errors.push("Address too short!")
  }
  return errors
}