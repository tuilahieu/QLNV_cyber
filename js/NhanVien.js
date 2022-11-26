function NhanVien(
  _username,
  _name,
  _email,
  _password,
  _date,
  _position,
  _salary,
  _hourWork,
  _classify
) {
  this.username = _username;
  this.name = _name;
  this.email = _email;
  this.password = _password;
  this.date = _date;
  this.position = _position;
  this.salary = _salary;
  this.hourWork = _hourWork;
  this.classify = _classify;
  this.id = Date.now() + Math.round(Math.random() * Date.now());
}
