/**
 * File that handles forms, checks, ajax request and display of confirmation message
 */

import 'jquery-validation'
import '../../../node_modules/jquery-validation/dist/additional-methods.min.js'

export function form() {
  submitForm('.registration', '.form__confirm', 'formInscription')
}

function submitForm(src, confirm, gtmEvent) {
  $(src).submit(function(e) {
    e.preventDefault()
  }).validate(getValidateParameters(src, confirm, gtmEvent))
} 


/**
 * Getter Functions Part
 */

function getValidateParameters(src, confirm, gtmEvent = 'formInscription') {
  return {
    submitHandler: form => {
      $('.form__submit__button').attr('type', 'button')

      $.ajax({
        type: 'POST',
        url: $(form).attr('action') + window.location.search,
        data: $(form).serializeArray(),
        success: data => {
          if (data.status === 'ok') {
            serverSuccess(src, confirm)
            if ('undefined' != typeof(dataLayer)) {
              dataLayer.push({
                'event': gtmEvent
              })
            }
          } else {
            serverError(src)
            $('.form__submit__button').attr('type', 'submit')
          }
        },
        error: () => {
          serverError(src)
          $('.form__submit__button').attr('type', 'submit')
        },
        dataType: 'json'
      })
    },

    errorPlacement: (error, element) => {
      if (element.attr('type') == 'radio') {
        error.appendTo($(element).siblings('.radio-error'))
      } else {
        error.insertAfter(element)
      }
    },

    ignore: '',
    rules: getRules(),
    messages: getMessages()
  }
}

function getRules() {
  return {
    civility: 'required',
    lastname: 'required',
    firstname: 'required',
    postalcode: {
      required: true,
      pattern: /^[0-9]{5,7}$/
    },
    city: 'required',
    email: {
      required: true,
      email: true
    },
    phone: {
      required: true,
      pattern: /^(?:\+0?33|0)[\.\- ]*([0-9][\.\- ]*){9}$/
    }
  }
}

function getMessages() {
  return {
    civility: 'Indiquez votre civilité',
    lastname: 'Votre nom est manquant',
    firstname: 'Votre prénom est manquant',
    postalcode: {
      required: 'Votre code postal est manquant',
      pattern: 'Votre code postal semble invalide'
    },
    city: 'Votre ville est manquante',
    email: {
      required: 'Votre e-mail est manquant',
      email: 'Votre e-mail semble invalide'
    },
    phone: {
      required: 'Votre numéro de téléphone est manquant',
      pattern: 'Votre numéro de téléphone semble invalide'
    }
  }
}


/**
 * Messages Function Part
 */

function serverSuccess(src, confirm) {
  $(src).fadeOut(400, () => {
    $(src).next(confirm).fadeIn(400, () => {
      $('html,body').stop().animate({
        scrollTop: $(src).next(confirm).offset().top - 50
      }, 1500)
    })
  })
}

function serverError(src) {
  $(src).append(`<p class="error">Une erreur est survenue, veuillez renouveler votre essai ultérieurement</p>`)
}