const formTs: Element = document.getElementById("form")
const usernameTs: Element = document.getElementById("username")
const emailTs: Element = document.getElementById("email")
const passwordTs: Element = document.getElementById("password")
const confirmPasswordTs: Element = document.getElementById("confirmPassword")

/**
 * 显示form item的错误信息
 * @param inputNode 
 * @param message 
 */
function showErrorInfo(inputNode: HTMLElement , message: string): void {
  const parentNode: HTMLElement = inputNode.parentElement
  parentNode.className = "form-control error"
  const small: HTMLElement  = parentNode.querySelector("small")
  small.innerHTML = message
}

function showSuccessInfo(inputNode: HTMLElement): void {
  const parentNode: HTMLElement = inputNode.parentElement
  parentNode.className = "form-control success"
}

function checkRequiredTs(inputNodeArr: Array<Element>): void {
  inputNodeArr.forEach((inputNode: HTMLInputElement) => {
    if (inputNode.value.trim() === "") {
      showErrorInfo(inputNode, `${getKeywords}不能为空`)
    } else {
      showSuccessInfo(inputNode)
    }
  })
}

// function getKeywords(inputNode: HTMLElement): string {
//   let requiredWord: string = inputNode.placeholder
//   return requiredWord.slice(3)
// }