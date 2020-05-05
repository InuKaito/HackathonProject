// Form Validation

function validateForm() {
    var name = document.forms["form"]["name"].value;
    var lastName = document.forms["form"]["lastname"].value;
    var email = document.forms["form"]["email"].value
    if (name == "") {
      alert("Name must be filled out");
      return false;
    }
    if (lastName == "") {
        alert("Last name must be filled out");
        return false;
    }
    if(email == ""){
        alert("Email must be filled out");
        return false;
    }
}
