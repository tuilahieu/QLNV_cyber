var dssv = new DanhSachNV();
var validate = new Validate();

// render List to UI

var containerStudent = document.getElementById("tableDanhSach");

function renderUI() {
  containerStudent.innerHTML = "";

  var dssvLocal = JSON.parse(localStorage.getItem("listStudent")) || dssv.list;
  dssv.list = dssvLocal;

  if (dssvLocal <= 0) {
    containerStudent.innerHTML =
      "<tr><td colspan=10>Hiện tại chưa có nhân viên nào...Vui lòng thêm nhân viên để quản lí.</td></tr>";
  } else {
    for (var i = 0; i < dssvLocal.length; i++) {
      containerStudent.innerHTML += `
                <tr>
                <td>${dssv.list[i].id}</td>
                    <td>${dssv.list[i].username}</td>
                    <td>${dssv.list[i].name}</td>
                    <td>${dssv.list[i].email}</td>
                    <td>${dssv.list[i].date}</td>
                    <td>${dssv.list[i].salary}</td>
                    <td>${dssv.list[i].position}</td>
                    <td>${dssv.list[i].hourWork}</td>
                    <td>${dssv.list[i].classify}</td>

                    <td>
                      <i
                      onclick=updateStudent(${dssv.list[i].id})
                      data-toggle="modal"
                      data-target="#modalEdit"
                        class="fa fa-pencil"
                        style="color: #ffc107; font-size: 22px; cursor: pointer"
                      ></i>
                    </td>
                    <td>
                      <i
                      onclick=getStudentID(${dssv.list[i].id})
                      data-toggle="modal"
                      data-target="#modalDelete"
                        class="fa fa-trash"
                        style="color: #dc3545; font-size: 22px; cursor: pointer"
                      ></i>
                    </td>
                  </tr>
      `;
    }
  }
}

renderUI();

// validate

var checkEmpty = function () {
  var result = [...formAddEmployee.elements].every((input) => {
    return validate.checkEmpty(input);
  });
  return result;
};

// add new student
var buttonAddEmployee = document.querySelector("#modalAdd #btnThemNV");
var formAddEmployee = document.querySelector("#modalAdd form");
var [
  usernameEmployee,
  nameEmployee,
  emailEmployee,
  passwordEmployee,
  startDateEmployee,
  salaryEmployee,
  positionEmployee,
  hourWorkEmployee,
] = formAddEmployee.elements;

var errorLogAdd = document.querySelector(".errorLogAdd small");

salaryEmployee.addEventListener("change", function () {
  this.value = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(this.value);
});

salaryEmployee.addEventListener("focus", function () {
  this.value = "";
});

buttonAddEmployee.addEventListener("click", function () {
  var isValid = checkEmpty();
  var checkUsername = validate.checkUsername(usernameEmployee.value.length);
  var checkName = validate.checkName(nameEmployee.value);
  var checkPassword = validate.checkPassword(passwordEmployee.value);
  var checkEmail = validate.checkEmail(emailEmployee.value.toLowerCase());
  var checkSalary = validate.checkSalary(salaryEmployee.value);
  var checkHour = validate.checkHour(hourWorkEmployee.value);
  if (!isValid) return;

  if (!checkUsername) {
    errorLogAdd.innerHTML = "Username phải từ 4-6 kí tự...";
    return;
  }
  if (!checkName) {
    errorLogAdd.innerHTML = "Họ và tên sai định dạng...";
    return;
  }
  if (!checkPassword) {
    errorLogAdd.innerHTML = "Mật khẩu chưa đủ mạnh...";
    return;
  }
  if (!checkEmail) {
    errorLogAdd.innerHTML = "Email sai định dạng...";
    return;
  }
  if (!checkSalary) {
    errorLogAdd.innerHTML = "Lương phải nhập là số...";
    return;
  }
  if (!checkHour) {
    errorLogAdd.innerHTML = "Số giờ phải từ 80-200 tiêngs...";
    return;
  }
  var classifyEmployee = function (hour) {
    if (hour >= 192) return "Xuất sắc";
    if (hour >= 176) return "Giỏi";
    if (hour >= 160) return "Khá";
    if (hour < 160) return "Trung bình";
  };
  var newEmployee = new NhanVien(
    usernameEmployee.value,
    nameEmployee.value,
    emailEmployee.value,
    passwordEmployee.value,
    startDateEmployee.value,
    salaryEmployee.value,
    positionEmployee.value,
    hourWorkEmployee.value,
    classifyEmployee(+hourWorkEmployee.value)
  );
  dssv.list.push(newEmployee);
  localStorage.setItem("listStudent", JSON.stringify(dssv.list));
  renderUI();
});

// delete

var buttonDeleteEmployee = document.querySelector("#modalDelete #btnXoa");

buttonDeleteEmployee.addEventListener("click", deleteStudent);

function getStudentID(id) {
  localStorage.setItem("idSelected", id);
  return;
}

function deleteStudent() {
  var id = JSON.parse(localStorage.getItem("idSelected"));
  dssv.list = dssv.list.filter((sv) => sv.id !== id);
  localStorage.setItem("listStudent", JSON.stringify(dssv.list));
  // renderUI();
  window.location.reload();
  return;
}

// edit

var buttonDeleteEmployee = document.querySelector("#modalEdit #btnCapNhat");
var formEditEmployee = document.querySelector("#modalEdit form");
var [
  usernameEmployee_2,
  nameEmployee_2,
  emailEmployee_2,
  passwordEmployee_2,
  startDateEmployee_2,
  salaryEmployee_2,
  positionEmployee_2,
  hourWorkEmployee_2,
] = formEditEmployee.elements;

function updateStudent(id) {
  getStudentID(id);
  var employeeNeedUpdate = dssv.list.find((sv) => sv.id === id);
  var valueOfThisEmployee = Object.values(employeeNeedUpdate);
  console.log(valueOfThisEmployee);
  [
    usernameEmployee_2.value,
    nameEmployee_2.value,
    emailEmployee_2.value,
    passwordEmployee_2.value,
    startDateEmployee_2.value,
    salaryEmployee_2.value,
    positionEmployee_2.value,
    hourWorkEmployee_2.value,
  ] = valueOfThisEmployee;
}

function saveEditedStudent() {
  var id = JSON.parse(localStorage.getItem("idSelected"));
  var studentUpdated = dssv.list.find((sv) => sv.id === id);
  var index = dssv.list.indexOf(studentUpdated);
  dssv.list[index] = {};
  var classifyEmployee = function (hour) {
    if (hour >= 192) return "Xuất sắc";
    if (hour >= 176) return "Giỏi";
    if (hour >= 160) return "Khá";
    if (hour < 160) return "Trung bình";
  };
  studentUpdating = {
    username: usernameEmployee_2.value,
    name: nameEmployee_2.value,
    email: emailEmployee_2.value,
    password: passwordEmployee_2.value,
    startDate: startDateEmployee_2.value,
    salary: salaryEmployee_2.value,
    position: positionEmployee_2.value,
    hourWork: hourWorkEmployee_2.value,
    classify: classifyEmployee(+hourWorkEmployee_2.value),
    id: id,
    updateAt: Date.now(),
  };
  dssv.list[index] = studentUpdating;
  localStorage.setItem("listStudent", JSON.stringify(dssv.list));
}

buttonDeleteEmployee.addEventListener("click", saveEditedStudent);
