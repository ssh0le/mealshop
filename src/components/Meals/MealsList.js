import styled from 'styled-components'
import MealItem from './MealItem'
import { useEffect, useState } from 'react'

const MealListWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;

    & ul {
        margin: 0;
        padding: 0;
        border: 2px solid #51585e;
        border-radius: 15px;
        width: 90%;
    }

    & .error {
        margin: 0;
        padding: 0;
        border: 2px solid red;
        border-radius: 15px;
        width: 90%;
    }

    & li:not(:last-child) {
        border-bottom: 3px solid #51585e;
        margin-bottom: 10px;
    }
`
const MealList = props => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const url = `https://mealshop-c9c1f-default-rtdb.europe-west1.firebasedatabase.app/meals.json`
    useEffect(() => {
        setIsLoading(true);
        const fetchMeals = () => {
            fetch(url).then((response) => {
                if (!response || !response.ok) {
                    throw new Error("Something bad happened:(")
                }
                return response.json()
            }).then(data => {
                const loadedMeals = []
                for(const key in data) {
                    loadedMeals.push({id: key, name: data[key].name, description: data[key].description, price: data[key].price})
                }
                setMeals(loadedMeals);
                setIsLoading(false);
            }).catch(error => {
                setIsLoading(false);
                setError(error.message);
            })
        }

        fetchMeals();

    }, [])

    if (isLoading) {
        return <MealListWrapper>
            <p>Загрузка...</p>
        </MealListWrapper>
    }

    if (error) {
        return <MealListWrapper>
            <p className='error'>{error}</p>
        </MealListWrapper>
    }
    return <MealListWrapper>
        <ul> 
            {meals.map(meal => <MealItem
                key = {meal.id}
                id = {meal.id}
                name = {meal.name}
                description = {meal.description}
                price = {meal.price}
            ></MealItem>)}
        </ul>
    </MealListWrapper>
}

export default MealList;