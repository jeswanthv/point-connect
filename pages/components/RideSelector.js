import { useState } from "react";
import tw from "tailwind-styled-components";

function RideSelector({ pickupCoordinates, dropoffCoordinates }) {
  const [rideOptions, setRideOptions] = useState([
    {
      type: "Economy",
      description: "Walking and VTA Ride",
      duration: "40 min",
      price: "$5.00",
      timeline: ["Start Walking", "Board VTA", "Reach Destination"],
    },
    {
      type: "Faster Travel",
      description: "Cab",
      duration: "20 min",
      price: "$15.00",
      timeline: ["Book Cab", "Cab Ride", "Reach Destination"],
    },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const closePopup = () => {
    setSelectedOption(null);
  };

  return (
    <Wrapper>
      <Title>Choose a travel option</Title>
      <OptionsList>
        {rideOptions.map((option, index) => (
          <OptionButton key={index} onClick={() => handleOptionClick(option)}>
            <OptionDetails>
              <Type>{option.type}</Type>
              <Description>{option.description}</Description>
              <Duration>{option.duration}</Duration>
            </OptionDetails>
            <Price>{option.price}</Price>
          </OptionButton>
        ))}
      </OptionsList>

      {selectedOption && (
        <Popup>
          <PopupContent>
            <PopupTitle>{selectedOption.type} Timeline</PopupTitle>
            <Timeline>
              {selectedOption.timeline.map((step, index) => (
                <TimelineStep key={index}>{step}</TimelineStep>
              ))}
            </Timeline>
            <CloseButton onClick={closePopup}>Close</CloseButton>
          </PopupContent>
        </Popup>
      )}
    </Wrapper>
  );
}

export default RideSelector;

const Wrapper = tw.div`
    flex-1 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b
`;

const OptionsList = tw.div`
    overflow-y-scroll px-4
`;

const OptionButton = tw.button`
    flex p-4 items-center m-4 border-2 border-gray-200 cursor-pointer hover:bg-gray-100 w-full max-w-md mx-auto
`;

const OptionDetails = tw.div`
    flex-1
`;

const Type = tw.div`
    font-medium
`;

const Description = tw.div`
    text-xs text-gray-500
`;

const Duration = tw.div`
    text-xs text-blue-500
`;

const Price = tw.div`
    text-sm
`;

const Popup = tw.div`
    fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50
`;

const PopupContent = tw.div`
    bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md
`;

const PopupTitle = tw.div`
    text-lg font-bold mb-4
`;

const Timeline = tw.div`
    flex flex-col gap-2
`;

const TimelineStep = tw.div`
    text-sm text-gray-700
`;

const CloseButton = tw.button`
    mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600
`;
