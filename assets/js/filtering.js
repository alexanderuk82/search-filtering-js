'use strict'

const form = document.getElementById('form')
const minPrice = document.getElementById('minprice')
const maxPrice = document.getElementById('maxprice')

allResults()

//Function to control all events that

function allResults() {
  document.addEventListener('DOMContentLoaded', () => {
    minprice()
    maxprice()
  })
}

// Function to calculate dinamic the Min-value

function minprice() {
  for (let i = 400; i <= 600000; i++) {
    const option = document.createElement('option')

    i = i * 2
    option.value = i
    option.textContent = `£${i}`
    minPrice.appendChild(option)
  }
}
// Function to calculate dinamic the Max-value

function maxprice() {
  for (let i = 900000; i >= 1000; i--) {
    const option = document.createElement('option')

    i = Math.floor(i / 2)
    option.value = i
    option.textContent = `£${i}`
    maxPrice.appendChild(option)
  }
}
