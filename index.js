const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  title: 'Tacos al Pastor',
  level: 'Amateur Chef',
  ingredients: ['pork shoulder', 'onion', 'pineapple', 'guajillo pepper', 'black pepper', 'salt', 'vinegar', 'tortillas'],
  cuisine: 'Mexican',
  dishType: 'main_course',
  duration: 30,
  creator: 'Chef Ollie'
}; 

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })


  .then(() => {
    //console.log(newRecipe.title);
    return Recipe.create(newRecipe);
  })

  .then((result) => {
    console.log(`This recipe ${result.title}`);
  })
  
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((recipes) => {
    console.log(`Added ${recipes.length} recipes to database:`);
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })

  .then((updatedRecipe) => {
    console.log(`Updated recipe: ${updatedRecipe.title}`);
  })

  .then(() => {
    return Recipe.deleteOne(
     { titel: 'Carrot Cake' },
    )
  })

  .then(() => {
    console.log('Recipe deleted');
    mongoose.connection.close();
    console.log('It is closed');
  })

  .catch(error => 
    console.log(error));


    