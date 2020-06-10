const container = document.querySelector(".watch-container ")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const totalPrice = document.getElementById("totalPrice")
const movieSelect = document.getElementById("select-movie")
//获得所选电影的票价 并且转换为number
let ticketPrice = +movieSelect.value

/**
 * 更新座位数以及总票价
 */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected")
  const selectedSeatsCount = selectedSeats.length

  count.innerHTML = selectedSeatsCount
  totalPrice.innerHTML = selectedSeatsCount * ticketPrice
}

/**
 * 电影下拉框事件监听
 */
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value
  updateSelectedCount()
})

//座位点击事件
container.addEventListener("click", e => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected")
  }
  updateSelectedCount()
})