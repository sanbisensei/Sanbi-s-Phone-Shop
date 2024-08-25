const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    // 1. get element by id
    const phoneContainer = document.getElementById('phone-container');
    // clear element
    phoneContainer.textContent = ''

    // display show all button if there are more than 12 phones.
    const showAllContainer = document.getElementById('show-all-container')
    showAllContainer.classList = `flex justify-center items-center my-4`;
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }






    // display only first 12 phones
    if (!isShowAll) {
        phones = phones.splice(0,12);
    }






    phones.forEach(phone => {
        // console.log(phone)

        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-yellow-100 w-64 shadow-xl`;

        // 3. set inner HTML
        phoneCard.innerHTML = `
        <figure>
            <img class="mt-5"
            src=${phone.image}
            alt="phones" />
        </figure>
        <div class="card-body">
            <h2 class="card-title justify-center font-bold">${phone.phone_name}</h2>
            <div class="card-actions justify-center">
            <button onclick="detailsBtn('${phone.slug}')"  class="btn btn-accent ">Details</button>
            </div>
        </div>
        `
        // 4. append child
        phoneContainer.appendChild(phoneCard)
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}


// 
const detailsBtn = async (id) => {
    // console.log(id)

    // load single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data)
    const phone = data.data
    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const phoneName = document.getElementById('phone-details-name');
    phoneName.innerText = phone.name

    const modalImg = document.getElementById('modal-img')
    modalImg.src = phone.image;
    

    const modalData = document.getElementById('modal-data');

    modalData.innerHTML=`
    <h1><strong>Brand:</strong> ${phone.brand}</h1>

    <h1><strong>Storage:</strong> ${phone.mainFeatures.storage}</h1>
    <h1><strong>Display:</strong> ${phone.mainFeatures.DispalySize}</h1>
    <h1><strong>Memory:</strong> ${phone.mainFeatures.memory}</h1>
    <h1><strong>USB:</strong> ${phone.others.USB}</h1>
    <h1><strong>ReleaseDate:</strong> ${phone.releaseDate}</h1>
    <h1><strong>ChipSet:</strong> ${phone.mainFeatures.chipSet}</h1>
    <h1><strong>Radio:</strong> ${phone.others.Radio}</h1>
    <h1><strong>WLAN:</strong> ${phone.others.WLAN}</h1>
    `


    // show to modal
    my_modal_5.showModal()
}





// handle search button
const handleSearch = (isShowAll) => {

    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

toggleLoadingSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden')
    }

}


// handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

