function Validate() {
  this.checkEmpty = function (input) {
    if (input.value === "") {
      alert(`${input.name} đang bị rỗng giá trị`);
      return false;
    }
    return true;
  };
  this.checkUsername = function (input) {
    if (input < 4 || input > 6) return false;
    return true;
  };
  this.checkName = function (input) {
    return /[A-Za-z]/.test(input);
  };
  this.checkPassword = function (input) {
    var strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    return strongPassword.test(input);
  };
  this.checkEmail = function (input) {
    var testEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return testEmail.test(input);
  };
  this.checkSalary = function (input) {
    return /^[0-9]/.test(input);
  };
  this.checkHour = function (input) {
    if (input < 80) return;
    if (input > 200) return;
    return true;
  };
}
