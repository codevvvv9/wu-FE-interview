const container = document.querySelector(".watch-container ")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const totalPrice = document.getElementById("totalPrice")
const movieSelect = document.getElementById("select-movie")
//获得所选电影的票价 并且转换为number
let ticketPrice = +movieSelect.value

populateUI()
/**
 * 更新座位数以及总票价
 */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected")
  //本地存储所选座位的位置
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))
  const selectedSeatsCount = selectedSeats.length

  count.innerHTML = selectedSeatsCount
  totalPrice.innerHTML = selectedSeatsCount * ticketPrice
}

/**
 * 存储选择电影的信息
 * @param { string } movieIndex 所选电影的下拉框位置
 * @param { string } moviePrice 所选电影的票价
 */
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex)
  localStorage.setItem("selectedMoviePrice", moviePrice)
}

/**
 * 获取本地数据并渲染样式
 */
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
  console.log("populateUI -> selectedSeats", selectedSeats)
  //获取本地座次
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected")
      }
    })
  }

  //获取电影以及票价
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")
  if (selectedMovieIndex !== null) {
    //存了说明改变过，没存说明默认选的是第一部电影
    movieSelect.selectedIndex = selectedMovieIndex
  } else {
    movieSelect.selectedIndex = 0
  }
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice")
  if (selectedMoviePrice !== null) {
    //存了说明改变过，没存说明默认选的是第一部电影
    ticketPrice = selectedMoviePrice
  } else {
    ticketPrice = 32
  }
  
}
/**
 * 电影下拉框事件监听
 */
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value
  //本地存储所选电影、所选电影的票价
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
})

//座位点击事件
container.addEventListener("click", e => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected")
  }
  updateSelectedCount()
})

//设置初始座位以及总票价
updateSelectedCount()