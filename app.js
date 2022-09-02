// categories loaded using fetch then
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => console.log(error));
}
// function call
loadCategories();
const displayCategories =(categories) =>{
    // will store sorted categories array
    const sortedCategory = [];
    categories.forEach(category =>{
        sortedCategory.push(category.category_name);
    });
    // sorted categories to show them sorted
    sortedCategory.sort();
    // looping through sotedCategories
    sortedCategory.forEach(category=> {
        const categoryContainer = document.getElementById('category-container');
        const spanElement = document.createElement('button');
        spanElement.classList.add('btn','mx-2');
        spanElement.innerText = `${category}`;
        categoryContainer.appendChild(spanElement);
    });
};