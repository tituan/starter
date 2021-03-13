/**
 * File that manages the cookiebar.
 */

import 'jquery-cookiebar'

export function cookiebar() {

  $.cookieBar({
    fixed: true,
    bottom: true,
    message: "En poursuivant votre navigation, vous acceptez l'utilisation de cookies destinés à réaliser des statistiques anonymes de visites",
    acceptText: "J'accepte"
  })

}
