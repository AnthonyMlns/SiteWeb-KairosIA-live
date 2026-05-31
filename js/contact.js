/* kAIros. — Formulaire de contact */

window.kairosContact = (function () {
  'use strict'

  function init(formId) {
    var form = document.getElementById(formId || 'contact-form')
    if (!form) return

    form.addEventListener('submit', function (e) {
      e.preventDefault()

      var status = document.getElementById('contact-form-status')
      if (!status) return

      status.className = 'contact-form-status'
      status.textContent = ''

      var data = {
        name: form.querySelector('[name="name"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim(),
        company: form.querySelector('[name="company"]').value.trim(),
        size: form.querySelector('[name="size"]').value,
        message: form.querySelector('[name="message"]').value.trim(),
      }

      if (!data.name || !data.email || !data.message) {
        status.className = 'contact-form-status error'
        status.textContent = 'Veuillez remplir les champs obligatoires.'
        return
      }

      var submitBtn = form.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.textContent = 'Envoi en cours…'

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (res) { return res.json() })
        .then(function (result) {
          if (result.success) {
            status.className = 'contact-form-status success'
            status.textContent = 'Message envoyé ! Nous vous répondrons dans les plus brefs délais.'
            form.reset()
          } else {
            throw new Error(result.error || 'Erreur inconnue')
          }
        })
        .catch(function (err) {
          status.className = 'contact-form-status error'
          status.textContent = 'Une erreur est survenue. Réessayez ou contactez-nous via le formulaire.'
        })
        .finally(function () {
          submitBtn.disabled = false
          submitBtn.textContent = 'Envoyer →'
        })
    })
  }

  return { init: init }
})()
