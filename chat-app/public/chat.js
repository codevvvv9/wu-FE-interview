//实现和服务端的连接
let socket = io.connect("http://localhost:4000")

//获取dom节点

let message = getElement("message")
let handle = getElement("handle")
let output = getElement("output")
let feedback = getElement("feedback")
let sendButton = getElement("send")

// 事件监听
sendButton.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  })
  message.value = ""
})

// 监听信息输入时的键盘事件
message.addEventListener("keydown", () => {
  socket.emit("typing", handle.value)
})
// 获取服务端的响应 （chat）
socket.on("chat", (data) => {
  //获取到服务端数据后，清空feedback数据
  feedback.innerHTML = ""
  output.innerHTML += `<p><strong>${data.handle}:${data.message}</strong></p>`
})

// 获取服务端广播的响应 （typing）
socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em>${data}正在输入...</em></p>`
})

/**
 * 获取某个dom节点元素
 * @param { string } id dom节点id
 */
function getElement(id) {
  let element = document.getElementById(id)
  return element
}