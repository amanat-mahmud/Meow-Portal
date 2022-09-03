// categories loaded using fetch then
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => addCategories(data.data.news_category))
        .catch(error => console.log(error));
}
// function call
loadCategories();
// display categories on the top
const addCategories = (categories) => {
    // will store sorted categories array
    const sortedCategory = [];
    categories.forEach(category => {
        sortedCategory.push(category.category_name);
    });
    // sorted categories to show them sorted
    sortedCategory.sort();
    // looping through sotedCategories
    sortedCategory.forEach(category => {
        const categoryContainer = document.getElementById('category-container');
        const spanElement = document.createElement('button');
        spanElement.classList.add('btn', 'mx-1');
        spanElement.innerText = `${category}`;
        categoryContainer.appendChild(spanElement);
    });
};
// if isLoaded === false meaning page contents are not loaded hence show spinner
// isLoaded for spinner 
const isLoaded = (flag) => {
    const spinner = document.getElementById('spinner');
    if (flag === false) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
};
// delegated the event 
document.getElementById('category-container').addEventListener('click', function (event) {
    // console.log(event.target.innerText);
    // spinner load start
    isLoaded(false);
    // document.getElementById('home-btn').classList.remove('btn-primary');
    // this code is used to fix double selection of navbar suppose arts is selected when click on culture it shows data of culture but also keeps the art as btn-primary but only selected category can have btn-primary
    document.getElementsByClassName('btn-primary')[0].classList.remove('btn-primary');
    event.target.classList.add('btn-primary');
    // if category is home then show no data
    if (event.target.innerText === "Home") {
        document.getElementById('topsection').innerHTML = ``;
        const cardContainer = document.getElementById('card-contaner');
        cardContainer.innerHTML = ``;
        isLoaded(true);
        return;

    }
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => loadCategoryId(data.data.news_category, event.target.innerText))
});
// using this function will show the articles on card
const loadCategoryId = (categories, selected) => {
    // isLoaded(true);
    categories.forEach(category => {
        if (category.category_name === selected) {
            // console.log(category.category_id, category.category_name);
            const url = `https://openapi.programming-hero.com/api/news/category/${category.category_id}`
            fetch(url)
                .then(res => res.json())
                .then(data => displayCategories(data.data, selected));
        }
    });
};
const displayCategories = (categories, selected) => {
    // sorted categories array based on total views
    // console.log(categories.length);
    if (categories.length > 2) {
        categories.sort((a, b) => b.total_view - a.total_view);
    }
    const cardContainer = document.getElementById('card-contaner');
    cardContainer.innerHTML = ``;
    categories.forEach(category => {
        const newCategory = category;
        console.log(newCategory);
        // console.log(category.total_view);
        document.getElementById('topsection').innerHTML = `<p class="p-4">${categories.length} items found in ${selected}</p>`;
        // console.log(category);
        const cardContainer = document.getElementById('card-contaner');
        const cardDiv = document.createElement('div');
        cardDiv.classList.add("card", "mb-3", "max-card-width");
        // const rowDiv = document.createElement('div');
        // rowDiv.classList.add("row", "g-0");
        // const colImgDiv = document.createElement('div');
        // colImgDiv.classList.add("col-md-4");
        // colImgDiv.innerHTML = `          
        // <img src="${category.author.img}" class="img-fluid rounded-start">`;
        // const colDiv = document.createElement('div');
        // colDiv.classList.add('col-md-8');
        // cardBodyDiv = document.createElement('div');
        // cardBodyDiv.classList.add('card-body');
        cardDiv.innerHTML = `
        <div class="row g-0 ">
        <div class="col-md-4">
            <img src="${category.image_url}" class="img-fluid rounded-start" alt="..." style="height: 250px; width:250px;">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${category.title}</h5>
                <p class="card-text">${category.details.slice(0, 50)}...</p>
                <div id="card-bottom" class="d-lg-flex  align-items-center mt-5 ">
                    <div class="me-5 " id="author-div">
                        <img src="${category.author.img}" alt="" srcset="" class="rounded-circle"
                            style="height: 40px; width:40px;">
                        <p>${category.author.name ? category.author.name : "Unknown"}</p>
                    </div>
                    <div class="mx-5 view">
                        <i class="fa-regular fa-eye" id="views"> ${category.total_view}M</i>
                    </div>
                    <button type="button" class="btn btn-primary ms-5" onclick="loadModal('${category._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
                </div>
            </div>
        </div>
    </div>`;
        // document.getElementById('read-more').onClick = function () {
        //     console.log("hi");
        // }
        cardContainer.appendChild(cardDiv);
    });
    // if no articles found 
    if (categories.length == 0) {
        document.getElementById('topsection').innerHTML = `<p class="p-4"> No  items found in ${selected}</p>`;
    }
    // stop loader
    isLoaded(true);
};
// used to load article data for modal
const loadModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data));
};
// used to display required data on modal
const displayModal = (datas) => {
    // console.log(datas);
    datas.forEach(data => {
        document.getElementById('exampleModalLabel').innerText = `
        ${data.title}
        `;
        document.getElementById('modal-body-inner').innerHTML = `
        <img src="${data.image_url}" class="img-fluid" >
        <p>${data.details}</p>
        <h4>Published: ${data.author.published_date}</h4>
        `;
    });
}