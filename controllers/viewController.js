exports.dashboard = (req, res) => {
  res.status(200).render("dashboardAdmin");
};
exports.index = (req, res) => {
  res.status(200).render("index");
};
exports.appointments = (req, res) => {
  res.status(200).render("appointments");
};
exports.patients = (req, res) => {
  res.status(200).render("patients");
};
exports.reports = (req, res) => {
  res.status(200).render("reports");
};
exports.pescriptions = (req, res) => {
  res.status(200).render("pescriptions");
};
exports.invoices = (req, res) => {
  res.status(200).render("invoice");
};
exports.login = (req, res) => {
  res.status(200).render("login");
};
