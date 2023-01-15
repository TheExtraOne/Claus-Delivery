import { useState, useEffect } from "react";
import classes from "./available-meals.module.css";
import Card from "../UI/card";
import MealItem from "./meal-item/meal-item";

//That is how the data in firebase looks like::
// const DUMMY_MEALS = {m1: {name: "Sushi", description: "Finest fish and veggies",price: 22.99}, m2: {…}, m3: {…}, m4: {…}}}

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorHTTPS, setErrorHTTPS] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://claus--delivery-default-rtdb.europe-west1.firebasedatabase.app//meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];
      // We received an object with objects, not an array
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setErrorHTTPS(error.message);
    });
  }, []);

  if (isLoading) {
    return <div className={classes.loader}>loading</div>;
  }

  if (errorHTTPS) {
    return (
      <section className={classes.MealsError}>
        <p>{errorHTTPS}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      id={meal.id}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
