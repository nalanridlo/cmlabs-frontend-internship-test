$(document).ready(function(){
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(function(response){
        var data = response.data.categories;
        var html = '';
        for(var i=0; i<data.length; i++){
            html += '<div class="card mx-3 mb-4" style="width: 18rem; height:270px">';
            html += '<img class="card-img-top" src="'+data[i].strCategoryThumb+'" alt="'+data[i].strCategory+'" loading="lazy">';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">'+data[i].strCategory+'</h5>';
            html += '<a href="index.html?category='+data[i].strCategory+'" class="btn btn-primary mb-3" style="position:absolute; bottom:0; left:20px" >Lihat Detail</a>';
            html += '</div></div>';
        }
        $('#categories').html(html);
    })
    .catch(function(error){
        console.log(error);
    });
});

// Path: category-detail
$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('category');
    axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category)
    .then(function(response){
        var data = response.data.meals;
        var html = '';
        for(var i=0; i<data.length; i++){
            html += '<div class="card mx-3 mb-4" style="width: 18rem; min-height:420px">';
            html += '<img class="card-img-top" src="'+data[i].strMealThumb+'" alt="'+data[i].strMeal+'" loading="lazy">';
            html += '<div class="card-body">';
            html += '<h5 class="card-title">'+data[i].strMeal+'</h5>';
            html += '<a href="meal-detail.html?id='+data[i].idMeal+'" class="btn btn-primary mb-3" style="position:absolute; bottom:0; left:20px">Lihat Detail</a>';
            html += '</div></div>';
        }
        $('#categories').html(html);
    })
    .catch(function(error){
        console.log(error);
    });
});

// Path: meal-detail
$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
    .then(function(response){
        var data = response.data.meals[0];
        var html = '';

        html += '<div class="row">';
        html += '<div class="col-md-6">';
        html += '<img src="'+data.strMealThumb+'" alt="'+data.strMeal+'" class="img-fluid">';
        html += '</div>';
        html += '<div class="col-md-6">';
        html += '<h2>'+data.strMeal+'</h2>';
        html += '<h4>Instructions: </h4>';
        html += '<p>'+data.strInstructions+'</p>';
        html += '<h4>Ingredients: </h4>';
        html += '<ul>';
        for(var i=1; i<=20; i++){
            if(data['strIngredient'+i]){
                html += '<li>'+data['strIngredient'+i]+'</li>';
            }
        }
        html += '</ul>';
        html += '</div>';
        html += '</div>';
        html += '<div class="text-center">'
        html += '<h4>Tutorials: </h4>';
        html += '<div class="embed-responsive embed-responsive-16by9">';
        html += '<iframe class="embed-responsive-item mb-3" style="height:400px"; width="700px"; src="'+data.strYoutube.replace('watch?v=', 'embed/')+'" allowfullscreen></iframe>';
        html += '</div>';

        $('#mealDetails').html(html);
    })
    .catch(function(error){
        console.log(error);
    });
});