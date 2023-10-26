  // Function to generate random species
  function getRandomSpecies() {
    const speciesOptions = ['Orc', 'Goblin', 'Dragon', 'Elf', 'Dwarf', 'Troll'];
    const randomIndex = Math.floor(Math.random() * speciesOptions.length);
    return speciesOptions[randomIndex];
  }
  
  // Function to generate random sub-species
  function getRandomSubSpecies() {
    const subSpeciesOptions = ['Small', 'Large', 'Fire', 'Ice', 'Poison', 'Electric'];
    const randomIndex = Math.floor(Math.random() * subSpeciesOptions.length);
    return subSpeciesOptions[randomIndex];
  }

  export {getRandomSpecies,getRandomSubSpecies}