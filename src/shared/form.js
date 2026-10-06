import { content } from "../config/content.js";

const f = () => content.contact.form;

/** Form fields shared by every variant; variants style the classes. */
export const formFields = () => `
  <form class="cf" novalidate>
    <label class="cf-field"><span class="cf-label">${f().name}</span><input name="name" autocomplete="name" required /></label>
    <label class="cf-field"><span class="cf-label">${f().email}</span><input name="email" type="email" autocomplete="email" required /></label>
    <label class="cf-field"><span class="cf-label">${f().message}</span><textarea name="message" rows="4" required></textarea></label>
    <input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true" />
    <div class="cf-foot">
      <button class="cf-send" type="submit">${f().send}</button>
      <p class="cf-status" role="status" aria-live="polite"></p>
    </div>
  </form>`;

/** Sends through Web3Forms (key in content.js). */
export function wireForm() {
  const form = document.querySelector(".cf");
  if (!form) return;
  const status = form.querySelector(".cf-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form.botcheck.checked) return;
    if (!form.checkValidity()) {
      form.dataset.state = "error";
      status.textContent = f().invalid;
      form.querySelector(":invalid")?.focus();
      return;
    }
    form.dataset.state = "sending";
    status.textContent = f().sending;
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: content.contact.formKey,
          subject: f().subject,
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });
      if (!(await res.json()).success) throw new Error();
      form.reset();
      form.dataset.state = "sent";
      status.textContent = f().sent;
    } catch {
      form.dataset.state = "error";
      status.textContent = f().error;
    }
  });
}
