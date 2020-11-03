export const mapPetInfoToPetData = ( petInfo ) => {
    const {
        pet_name, 
        pet_owner, 
        pet_type, 
        pet_owner_name, 
        pet_categories, 
        pet_special_requirement
    } = petInfo;

    return {
        petName: pet_name,
        petType: pet_type,
        petOwner: pet_owner,
        petOwnerName: pet_owner_name,
        petCategories: pet_categories[0] == null ? [] : pet_categories,
        petSpecialRequirements: pet_special_requirement[0] == null ? [] : pet_special_requirement
    }
};

export const unwrapPetType = ( wrappedPetType ) => {
    return wrappedPetType.unnest;
}