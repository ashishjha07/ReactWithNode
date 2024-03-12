export async function getPlaces(){
    const response = await fetch('http://localhost:3000/places');
    if(!response.ok)
    {
        throw new Error("Failed to fetch places");
    }
    const resData = await response.json();
    return resData.places;
}

export async function getUserPlaces(){
    const response = await fetch('http://localhost:3000/user-places');
    if(!response.ok)
    {
        throw new Error("Failed to fetch user places");
    }
    const resData = await response.json();
    return resData.places;
}

export async function updateUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(!response.ok){
        throw new Error("Failed to add user places.");
    }

    const resData = await response.json();
    return resData.message;
}