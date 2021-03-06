import properties from '../js/db.js'
;('use strict')

const form = document.getElementById('form')
const clearButton = document.getElementById('clearButton')
const area = document.getElementById('area')
const propStatus = document.getElementById('propertyStatus')
const minPrice = document.getElementById('minPrice')
const type = document.getElementById('category')
const bedrooms = document.getElementById('bedrooms')
const bathrooms = document.getElementById('bathrooms')
const maxPrice = document.getElementById('maxprice')

const result = document.getElementById('result')
const title = document.querySelector('.main-title')

const mainTitle = document.createElement('h1')
const mainSubtitle = document.createElement('p')

// !Defining lotties animation here!!!

const wrapper = document.querySelector('.error')
wrapper.classList.add('hidden')
const animation = bodymovin.loadAnimation({
  container: wrapper,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets3.lottiefiles.com/packages/lf20_kw7o4s5y.json',
})

// !Storage all the input fileds value here
const filtered = {
  area: '',
  propertyStatus: '',
  minPrice: '',
  maxPrice: '',
  types: '',
  bedrooms: '',
  bathrooms: '',
}

allResults()

//Function to control all events that

function allResults() {
  document.addEventListener('DOMContentLoaded', () => {
    minprice()
    maxprice()
    ourProperties()
  })

  //!Selected all the fields********************
  //!***************************************
  area.addEventListener('change', storage)
  propStatus.addEventListener('change', storage)
  minPrice.addEventListener('change', storage)
  type.addEventListener('change', storage)
  bedrooms.addEventListener('change', storage)
  bathrooms.addEventListener('change', storage)
  maxPrice.addEventListener('change', storage)

  //!Click FORM BUTTON********************
  //!***************************************

  clearButton.addEventListener('click', clearBtn)
}

//! Function storage to keep the value

function storage(e) {
  switch (e.target.id) {
    case 'area':
      filtered.area = parseInt(e.target.value)
      filter()
      break

    case 'propertyStatus':
      filtered.propertyStatus = e.target.value
      filter()
      break
    case 'minPrice':
      filtered.minPrice = parseInt(e.target.value)
      filter()
      break
    case 'maxprice':
      filtered.maxPrice = parseInt(e.target.value)
      filter()
      break
    case 'category':
      filtered.types = e.target.value
      filter()
      break
    case 'bedrooms':
      filtered.bedrooms = parseInt(e.target.value)
      filter()
      break
    case 'bathrooms':
      filtered.bathrooms = parseInt(e.target.value)
      filter()
      break
  }
  console.log(filtered)
}

//!Showing the Final result from filtering

function filter() {
  const finalResult = properties
    .filter(areaProperties)
    .filter(statusProp)
    .filter(minPricePro)
    .filter(categoryPro)
    .filter(byBedroom)
    .filter(byBathroom)
    .filter(maxPricePro)
  propertyFiltered(finalResult)
}

// !Function to validate area properties

function areaProperties(prop) {
  const { area } = filtered
  if (area) {
    return prop.area === area
  } else {
    return prop
  }
}
// !Function to validate area status

function statusProp(prop) {
  const { propertyStatus } = filtered
  if (propertyStatus) {
    return prop.propertyStatus === propertyStatus
  } else {
    return prop
  }
}
// !Function to validate area Min price

function minPricePro(prop) {
  const { minPrice } = filtered
  if (minPrice) {
    return prop.price >= minPrice
  } else {
    return prop
  }
}
// !Function to validate Category properties

function categoryPro(prop) {
  const { types } = filtered
  if (types) {
    return prop.type === types
  } else {
    return prop
  }
}
// !Function to validate Bedrooms properties

function byBedroom(prop) {
  const { bedrooms } = filtered
  if (bedrooms) {
    return prop.bedrooms === bedrooms
  } else {
    return prop
  }
}
// !Function to validate Bathrooms properties

function byBathroom(prop) {
  const { bathrooms } = filtered
  if (bathrooms) {
    return prop.bathrooms === bathrooms
  } else {
    return prop
  }
}
// !Function to validate area Max price

function maxPricePro(prop) {
  const { maxPrice } = filtered
  if (maxPrice) {
    return prop.price <= maxPrice
  } else {
    return prop
  }
}

//! Function Property Filtered the HTML results

function propertyFiltered(final) {
  mainTitle.textContent = 'The latest properties'

  //  ! Hidden the lotties animation here

  wrapper.classList.add('hidden')

  clear()

  if (final.length > 0) {
    mainSubtitle.textContent = `We have ${final.length} items available right now`

    final.forEach(function (prop) {
      const item = document.createElement('div')
      item.classList.add(
        'col-lg-3',
        'col-md-6',
        'col-sm-12',
        'wow',
        'fadeInLeft',
        'delay-04s',
      )
      const {
        adress,
        title,
        img,
        area,
        propertyStatus,
        price,
        type,
        bedrooms,
        bathrooms,
      } = prop

      item.innerHTML = `
          
          <div class="property-box-8">
          <div class="photo-thumbnail">
            <div class="photo">
              <img
                src="${img}"
                alt="property-box-8"
                class="img-fluid"
              />
              <a href="#">
                <span class="blog-one__plus"></span>
              </a>
            </div>
            <div class="tag-for">${propertyStatus}</div>
            <div class="price-ratings-box">
              <p class="price">
                ??${price}
              </p>
              <div class="ratings">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-o"></i>
              </div>
            </div> 
          </div>
          <div class="detail">
            <div class="heading">
              <h3>
                <a href="properties-details.html">${title}</a>
              </h3>
              <div class="location">
                <a href="#">
                  <i
                    class="flaticon-facebook-placeholder-for-locate-places-on-maps"
                  ></i>
                  ${adress}
                </a>
              </div>
            </div>
            <div class="properties-listing">
              <span>${bedrooms} Beds</span>
              <span>${bathrooms} Baths</span>
              <span>${area} sqm</span>
            </div>
          </div>
        </div>
          
          `

      result.appendChild(item)
    })
  } else {
    mainSubtitle.textContent = ` `
    notFound()
  }
}

// Function to calculate dinamic the Min-value

function minprice() {
  for (let i = 400; i <= 600000; i++) {
    const option = document.createElement('option')

    i = i * 2
    option.value = i
    option.textContent = `??${i}`
    minPrice.appendChild(option)
  }
}

// Function to calculate dinamic the Max-value

function maxprice() {
  for (let i = 900000; i >= 1000; i--) {
    const option = document.createElement('option')

    i = Math.floor(i / 2)
    option.value = i
    option.textContent = `??${i}`
    maxPrice.appendChild(option)
  }
}

//! Function to load all properties windows load

function ourProperties() {
  clear()

  mainTitle.textContent = 'The latest properties'
  mainSubtitle.textContent = `We have ${properties.length} items available right now`

  title.appendChild(mainTitle)
  title.appendChild(mainSubtitle)

  properties.forEach(function (prop) {
    const item = document.createElement('div')
    item.classList.add(
      'col-lg-3',
      'col-md-6',
      'col-sm-12',
      'wow',
      'fadeInLeft',
      'delay-04s',
    )
    const {
      adress,
      title,
      img,
      area,
      propertyStatus,
      price,
      type,
      bedrooms,
      bathrooms,
    } = prop

    item.innerHTML = `
    
    <div class="property-box-8">
    <div class="photo-thumbnail">
    <div class="photo">
    <img
            src="${img}"
            alt="property-box-8"
            class="img-fluid"
            />
            <a href="#">
            <span class="blog-one__plus"></span>
            </a>
            </div>
            <div class="tag-for">${propertyStatus}</div>
            <div class="price-ratings-box">
            <p class="price">
            ??${price}
            </p>
            <div class="ratings">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star-o"></i>
            </div>
            </div>
            </div>
            <div class="detail">
            <div class="heading">
            <h3>
            <a href="properties-details.html">${title}</a>
          </h3>
          <div class="location">
          <a href="#">
          <i
          class="flaticon-facebook-placeholder-for-locate-places-on-maps"
          ></i>
          ${adress}
          </a>
          </div>
          </div>
          <div class="properties-listing">
          <span>${bedrooms} Beds</span>
          <span>${bathrooms} Baths</span>
          <span>${area} sqm</span>
          </div>
          </div>
          </div>
          
          `

    result.appendChild(item)
  })
}

function clear() {
  while (result.firstChild) {
    result.removeChild(result.firstChild)
  }
}

function clearBtn() {
  area.value = ''
  propStatus.value = ''
  minPrice.value = ''
  type.value = ''
  bedrooms.value = ''
  bathrooms.value = ''
  maxPrice.value = ''

  allResults()
  window.location.reload()
}

// !Function not Found Lotties animation

function notFound() {
  clear()
  wrapper.classList.remove('hidden')
  animation.play()
  mainTitle.textContent = 'Oops We could not find properties!'
  mainSubtitle.textContent = `Try again with other options`
}
