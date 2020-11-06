export const mapBidInfoToBidData = (bidInfo) => {
  const {
    pet,
    care_taker,
    pet_type,
    start_date,
    end_date,
    rating,
    review_text,
    is_successful,
    is_active
  } = bidInfo;

  return {
    petName: pet,
    careTakerName: care_taker,
    petType: pet_type,
    startDate: convertDateToString(new Date(Date.parse(start_date))),
    endDate: convertDateToString(new Date(Date.parse(end_date))),
    isSuccessful: is_successful,
    isActive: is_active,
    rating: rating,
    reviewText: review_text
  }
};

const convertDateToString = (date) => {
  const items = date.toDateString().split(" ");
  return `${items[2]} ${items[1]} ${items[3]}`;
};
