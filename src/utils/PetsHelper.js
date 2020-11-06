export const mapPetInfoToPetData = (petInfo) => {
    const {
        pet_name,
        pet_owner,
        pet_type,
        pet_owner_name,
        pet_categories,
        pet_special_requirement,
        pet_requirements_description
    } = petInfo;

    return {
        petName: pet_name,
        petType: pet_type,
        petOwner: pet_owner,
        petOwnerName: pet_owner_name,
        petCategories: pet_categories[0] == null ? [] : pet_categories,
        petSpecialRequirements: getPetSpecialRequirements(pet_special_requirement, pet_requirements_description)
    }
};

const getPetSpecialRequirements = (pet_special_requirement, pet_requirements_description) => {
    let specialRequirements = [];

    if (pet_special_requirement.length == 1 && pet_requirements_description[0] == null) {
        return [];
    }

    for (let i = 0; i < pet_special_requirement.length; i++) {
        specialRequirements[i] = {
            requirement: pet_special_requirement[i],
            description: pet_requirements_description[i]
        }
    }

    return specialRequirements;
}

export const unwrapPetType = (wrappedPetType) => {
    return wrappedPetType.unnest;
}