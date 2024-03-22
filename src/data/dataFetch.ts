export const getCharacters = async () => {
    try{
    const allCharacters = await fetch("https://rickandmortyapi.com/api/character/").then(res => res.json());
    console.log(allCharacters.results)
    return allCharacters.results;
    } catch (error){
        console.log(error)
    }
}