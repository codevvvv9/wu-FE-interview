const formTs: Element = document.getElementById("form")
const usernameTs: Element = document.getElementById("username")
const emailTs: Element = document.getElementById("email")
const passwordTs: Element = document.getElementById("password")
const confirmPasswordTs: Element = document.getElementById("confirmPassword")

function showErrorInfo(inputNode: Element , message: string): void {
  const parentNode: HTMLElement = inputNode.parentElement
  parentNode.className = "form-control error"
  const small: HTMLElement  = parentNode.querySelector("small")
  small.innerHTML = message
}