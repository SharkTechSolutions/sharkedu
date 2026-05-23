/**
 * App entry — loads enroll form HTML and initializes modal + form
 */
(async function initApp() {
  const formRoot = document.getElementById("modalFormRoot");

  if (!formRoot) {
    console.error("modalFormRoot not found");
    return;
  }

  try {
    const response = await fetch("forms/enroll-form.html");
    if (!response.ok) throw new Error("Could not load enrollment form");
    formRoot.innerHTML = await response.text();
  } catch (err) {
    console.error(err);
    formRoot.innerHTML =
      '<p class="alert alert--err is-visible">Failed to load form. Use a local server (e.g. Live Server) to run this site.</p>';
    return;
  }

  Modal.init({
    onOpenFocus: () => {
      EnrollForm.clearAlerts();
      EnrollForm.focusName();
    }
  });

  EnrollForm.init({
    onSuccessClose: () => Modal.close()
  });
})();
