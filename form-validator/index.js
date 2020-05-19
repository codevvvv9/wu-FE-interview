let username = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirmPassword")
let errorNode = document.querySelector("small")

let form = document.getElementById("form")
form.addEventListener("click", (e) => {
  // 阻止默认冒泡，不然瞬间闪过
  e.preventDefault()
  if (username.value === "") {
    // username.parentNode.classList.add("error")
    //等价于
    username.parentNode.className = "form-control error"
    showErrorInfo(username, errorNode)
  }
})

function showErrorInfo(node, errorNode) {
  let placeholder = node.placeholder.slice(3)
  errorNode.innerHTML = `${placeholder}不能为空`
}