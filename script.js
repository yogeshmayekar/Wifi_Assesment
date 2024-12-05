const jsonFormData = [
    {
      "key": "user_name",
      "label": "Name",
      "type": "text",
      "maxLength": "50",
      "placeholder":"Enter Name"
    },
    {
      "key": "mobile_no",
      "label": "Mobile number",
      "type": "tel",
      "maxLength": "50",
      "placeholder":"Enter Mobile number"
    },
    {
      "key": "email",
      "label": "Email",
      "type": "email",
      "maxLength": "50",
      "placeholder":"Enter Email"
    }
]

const form = document.getElementById("test_form");
// console.log("form is", form);

jsonFormData.forEach((item)=>{
    const label = document.createElement('label');
    const input = document.createElement('input');
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    label.setAttribute('for', item?.key);
    label.textContent = `${item.label}:`;

    input.setAttribute('type', item?.type);
    input.setAttribute('name', item?.key);
    input.setAttribute('id', item?.key);
    input.setAttribute('maxlength', item?.maxLength);
    input.setAttribute('placeholder', item?.placeholder);

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(formGroup);
});

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = "Submit";
form.appendChild(submitButton);

const validatingLength = (label, value)=>{
  if(value.length < 3 || value.length > 25){
    alert(`${label} must be minimum 3 characters and max 25 characters.`);
    return false;
  }
  return true;
}

const validateEmail = (label, value)=>{
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailRegex.test(value)){
    alert(`Please enter valid ${label}`);
    return false;
  }
  return true;
}

const validatePhonenNumber=(label, value)=>{
  const phoneRegex = /^\d{10}$|^\d{3}[\s\-]?\d{3}[\s\-]?\d{4}$/;
  if (!phoneRegex.test(value)) {
    alert(`Please enter a valid ${label}.`);
    return false;
  }
  return true;
}

const validateFormData = ()=>{
  let isValid = true;
  const formData = {};

  jsonFormData.forEach((item)=>{
    const getInputField = document.getElementById(item?.key)
    const value = getInputField.value.trim();

    if(!value){
      isValid = false;
      alert(`${item.label} is required.`)
    }else{
      if(item.key === "user_name" || item.key === "mobile_no"){
        isValid = validatingLength(item.label, value);
      }else if (item.key === "email"){
        isValid = validateEmail(item.label, value)
      }else if (item.key === "mobile_no") {
        isValid = validatePhonenNumber(item.label, value);
      }

    }
    if (isValid) {
      formData[item.key] = value;
    }
  })

  if (isValid) {
    // console.log("form data", formData);
    alert('Form Submitted successfully');
  }

}

const handleSubmit =(e)=>{
    e.preventDefault();
    // alert('Submitted successfully');
    validateFormData();
}

form.addEventListener('submit', handleSubmit);

