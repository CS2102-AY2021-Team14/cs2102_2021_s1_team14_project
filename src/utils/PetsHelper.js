export const mapPetInfoToPetData = ( petInfo ) => {
    const {
        name, 
        owner, 
        type
    } = petInfo;

    return {
        petName: name,
        petType: type,
        petOwner: owner,
        petOwnerName: "owner name",
        petCategories: ["Small Cat", "Four-legged"],
        petSpecialRequirements: [
          "Requires 10 feedings per day",
          "Only eats $100 cat food",
          "Hates rats",
        ],
    }
};

export const unwrapPetType = ( wrappedPetType ) => {
    return wrappedPetType.unnest;
}