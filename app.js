// categories loaded using fetch then
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => addCategories(data.data.news_category))
        .catch(error => console.log(error));
}
// function call
loadCategories();
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
document.getElementById('category-container').addEventListener('click', function (event) {
    // console.log(event.target.innerText);
    // spinner load start

    // document.getElementById('home-btn').classList.remove('btn-primary');
    document.getElementsByClassName('btn-primary')[0].classList.remove('btn-primary');
    event.target.classList.add('btn-primary');
    if (event.target.innerText === "Home") {
        document.getElementById('topsection').innerHTML = ``;
        const cardContainer = document.getElementById('card-contaner');
        cardContainer.innerHTML = ``;
        return;

    }
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => loadCategoryId(data.data.news_category, event.target.innerText))
});
const loadCategoryId = (categories, selected) => {
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
        console.log(category);
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
            <img src="${category.image_url}" class="img-fluid rounded-start" alt="..." style="height: 250px; width:250px">
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
                    <button class="btn btn-primary ms-5" onclick="loadModal('${category._id}')">Read More</button>
                </div>
            </div>
        </div>
    </div>`;
        // document.getElementById('read-more').onClick = function () {
        //     console.log("hi");
        // }
        cardContainer.appendChild(cardDiv);
    });
    if (categories.length == 0) {
        document.getElementById('topsection').innerHTML = `<p class="p-4"> No  items found in ${selected}</p>`;
    }
    // stop loader
};
const loadModal = (a) => {
    console.log(a);
};