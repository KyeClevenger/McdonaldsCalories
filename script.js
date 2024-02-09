    // Function to update the date and time message
    function updateDateTime() {
        const today = new Date();
        const time = today.getTime();

        if (time < 12) {
            return "Good Morning";
        } else if (time < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    }

    // Function to display the date, time, and greeting message
    function seeMessage() {
        const today = new Date();

        const currentDateTime = today.toLocaleString();
        const timingMessage = updateDateTime();

        // Update HTML elements with date, time, and greeting message

        document.querySelector('#datetime').textContent = currentDateTime;
        document.querySelector('#message').innerHTML = timingMessage;

        // Call the `updateDateTime` function every second
        setInterval(seeMessage, 1000); 
    }

    // Initial call to the seeMessage function
    seeMessage();

    // Initialize totalCalories and foodList from localStorage or default to 0 and an empty array
    let totalCalories = parseInt(localStorage.getItem('totalCalories')) || 0;
        let foodList = JSON.parse(localStorage.getItem('foodList')) || [];

    // McDonald's menu with food items and their respective calories
    const mcdonaldsMenu = [
        { name: 'Big Mac', calories: 590 },
        { name: 'Quarter Pounder', calories: 520 },
        { name: 'Double Quarter', calories: 740 },
        { name: 'Spicy', calories: 400 },
        { name: 'Cheeseburger', calories: 300 },
        { name: 'Hamburger', calories: 250 },
        { name: 'McDouble', calories: 400 },
        { name: 'Double Cheese', calories: 450 },
        { name: '10 McNuggets', calories: 420 },
        { name: '6 McNuggets', calories: 250 },
        { name: '4 McNuggets', calories: 170 },
        { name: 'Crispy', calories: 470},
        { name: 'Deluxe Crispy', calories: 530 },
        { name: 'Oreo McFlurry', calories: 510 },
        { name: 'M&M McFlurry', calories: 650 },
        { name: 'Cone', calories: 200 },
        { name: 'Apple Pie', calories: 240 },
        { name: 'L Fry', calories: 480 },
        { name: 'M Fry', calories: 320 },
        { name: 'S Fry', calories: 230 },
        { name: 'Egg Muffin', calories: 300 },
        { name: 'Hash Brown', calories: 140 },
        { name: 'Bec Mcgriddle', calories: 430 },
        { name: 'Bec Biscuit', calories: 460 },
        { name: 'Big Breakfast', calories: 1340 },
        { name: 'Burrito', calories: 300 },
        { name: 'Hotcakes', calories: 580 },
        { name: 'Oatmeal', calories: 320 },
        { name: 'Apple Slices', calories: 15 },
        { name: 'Caramel Sundae', calories: 270 },
        { name: 'Sausage Muffin', calories: 400 },
        { name: 'Sausage Biscuit', calories: 460 },
        { name: 'Coke', calories: 290 },
        { name: 'Sprite', calories: 230 },
        { name: 'Dr Pepper', calories: 280 },
        { name: 'Hi C', calories: 310 },
        { name: 'Powerade', calories: 45 },
        { name: 'Fanta', calories: 300 },
        { name: 'Sweet Tea', calories: 170 },
        { name: 'Chocolate Milk', calories: 130 },
        { name: 'Milk', calories: 100 },
        { name: 'Strawberry Smothie', calories: 330 },
        { name: 'Strawberry Shake', calories: 850 },
        { name: 'Chocolate Shake', calories: 800 },
        { name: 'Vanilla Shake', calories: 780 },
        { name: 'Mango Smothie', calories: 340 },
        { name: 'Fudge Sundae', calories: 330 },
        { name: 'Mocha Frappe', calories: 660 },
        { name: 'Caramel Frappe', calories: 650 },
        { name: 'Vanilla Coffee', calories: 280},
        { name: 'Cookie', calories: 170},
        { name: 'Blue Slushie', calories: 110},
        { name: 'Red Slushie', calories: 110},
        { name: 'Coke Slushie', calories: 110}
    ];

    // Display initial total calories on the page
    document.getElementById('totalCalories').textContent = totalCalories;

    // Display initial food list on the page
    updateFoodList();

    // Function to add calories when the "Add" button is clicked
    function addCalories() {
        // Get the entered food name and amount from the input fields
        const foodName = document.getElementById('foodName').value.toLowerCase().trim();
        const amount = parseInt(document.getElementById('amount').value);
    
        // Check if the entered foodName exists in the mcdonaldsMenu array
        const selectedFood = mcdonaldsMenu.find(item => item.name.toLowerCase() === foodName);
    
        // Use the selectedFood's calories if found, otherwise show an alert
        if (selectedFood && amount >= 1) {
            // Calculate total calories based on the predefined calories and amount
            const totalCaloriesForItem = selectedFood.calories * amount;
    
            // Update total calories and food list on the page
            totalCalories += totalCaloriesForItem;
            foodList.push({ foodName, calories: selectedFood.calories, amount });
    
            document.getElementById('totalCalories').textContent = totalCalories;
            updateFoodList();
    
            // Store the updated total calories and food list in localStorage
            localStorage.setItem('totalCalories', totalCalories);
            localStorage.setItem('foodList', JSON.stringify(foodList));
    
            // Clear input fields
            document.getElementById('foodName').value = '';
            document.getElementById('amount').value = 1;
        } else {
            // Show an alert for invalid input
            alert('Please enter a valid food item and amount.');
        }
    }

    // Function to update the displayed food list on the page
    function updateFoodList() {
        const foodListElement = document.getElementById('foodList');
        foodListElement.innerHTML = '';
    
        // Iterate through the food list and create list items with delete buttons
        foodList.forEach((foodItem, index) => {
            const listItem = document.createElement('li');
            const totalCaloriesForItem = foodItem.calories * foodItem.amount;
            
            // Display food item details and create a delete button
            listItem.innerHTML = `${foodItem.foodName}: ${totalCaloriesForItem} calories (${foodItem.amount}) 
                <button onclick="deleteFoodItem(${index})">Delete</button>`;
            
            foodListElement.appendChild(listItem);
        });
    }
    
    // Function to delete a food item
    function deleteFoodItem(index) {
        // Remove the selected food item from the array
        const deletedItem = foodList.splice(index, 1)[0];
    
        // Update total calories on the page and update the food list
        totalCalories -= deletedItem.calories * deletedItem.amount;
        document.getElementById('totalCalories').textContent = totalCalories;
        updateFoodList();
    
        // Store the updated total calories and food list in localStorage
        localStorage.setItem('totalCalories', totalCalories);
        localStorage.setItem('foodList', JSON.stringify(foodList));
    }

function isNewDay(lastResetDate) {
    const today = new Date();
    const lastReset = new Date(lastResetDate);

    // Compare the day, month, and year
    return today.getDate() !== lastReset.getDate() ||
        today.getMonth() !== lastReset.getMonth() ||
        today.getFullYear() !== lastReset.getFullYear();
}

// Function to reset JSON data
function resetData() {
    // Your JSON data reset logic goes here
    // For example, if using LocalStorage:
    localStorage.removeItem('yourDataKey');
    localStorage.setItem('lastResetDate', new Date().toISOString());
}

// Check if it's a new day and reset data if needed
const lastResetDate = localStorage.getItem('lastResetDate');

if (!lastResetDate || isNewDay(lastResetDate)) {
    resetData();
}

// Your code to use or initialize the JSON data goes here
const jsonData = JSON.parse(localStorage.getItem('yourDataKey')) || {};

// Update last reset date to today (to avoid resetting multiple times in a day)
localStorage.setItem('lastResetDate', new Date().toISOString());