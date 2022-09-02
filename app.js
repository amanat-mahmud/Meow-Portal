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
    event.target.classList.add('btn-primary');
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
                .then(data => displayCategories(data.data));
        }
    });
};
const displayCategories = (categories) => {
    // console.log(categories);
    // categories.forEach(category =>{
    //     console.log(category);
    // });
    categories.sort((a, b) => b.total_view - a.total_view);
    categories.forEach(category => {
        console.log(category);
    });
};