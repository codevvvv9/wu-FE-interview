/**
 * @author wushaolin
 * @email wslsdust@163.com
 * @create date 2020-05-19 23:05:17
 * @modify date 2020-05-19 23:05:17
 * @desc [ 重构 form的校验代码 ]
 */

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

/**
 * 显示form item的错误信息
 * @param { object } inputNode input元素
 * @param { string } message 错误信息
 */
function showError(inputNode, message) {
  const formControl = inputNode.parentNode;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
}

/**
 * 显示form-item的成功信息
 * @param { object } inputNode input元素
 */
function showSuccess(inputNode) {
  const formControl = inputNode.parentNode;
  formControl.className = "form-control success";
}

/**
 * 校验邮箱
 * @param { Object } inputNode
 */
function checkEmail(inputNode) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (regex.test(inputNode.value.trim())) {
    showSuccess(inputNode);
  } else {
    showError(inputNode, "邮箱格式错误");
  }
}

/**
 * 检验form-item的必填项
 * @param { Array } inputNodeArr 若干input元素组成的数组
 */
function checkRequired(inputNodeArr) {
  inputNodeArr.forEach((inputNode) => {
    if (inputNode.value.trim() === "") {
      showError(inputNode, `${getKeyWords(inputNode)}为必填项`);
    } else {
      showSuccess(inputNode);
    }
  });
}

/**
 * 检验input元素的长度
 * @param { object } inputNode
 * @param { number } min 最小长度
 * @param { number } max 最短长度
 */
function checkLength(inputNode, min, max) {
  if (inputNode.value.length < min) {
    showError(inputNode, `${getKeyWords(inputNode)}至少${min}字符`);
  } else if (inputNode.value.length > max) {
    showError(inputNode, `${getKeyWords(inputNode)}至多${max}字符`);
  } else {
    showSuccess(inputNode);
  }
}
/**
 * 检验两次密码是否匹配
 * @param { object } inputNode1 第一次密码的input元素
 * @param { object } inputNode2 确认密码的input元素
 */
function checkPasswordMatch(inputNode1, inputNode2) {
  const password = inputNode1.value;
  console.log("checkPasswordMatch -> password", password);
  const confirmPassword = inputNode2.value;
  console.log("checkPasswordMatch -> confirmPassword", confirmPassword);
  if (password != confirmPassword) {
    showError(inputNode2, "密码不匹配");
  }
}
/**
 * 根据input项的候选项构建必选项的关键字
 * @param { object } inputNode
 */
function getKeyWords(inputNode) {
  let requiredKeyWords = inputNode.placeholder.slice(3);
  return requiredKeyWords;
}

form.addEventListener("submit", (e) => {
  // 阻止默认冒泡，不然瞬间闪过
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
});
