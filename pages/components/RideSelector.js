import { useState } from "react";
import { FaBus, FaCar, FaWalking } from "react-icons/fa";
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

  const getIconForStep = (step) => {
    if (step.toLowerCase().includes("walk")) {
      return <FaWalking className="w-4 h-4 text-blue-800 dark:text-blue-300" />;
    } else if (step.toLowerCase().includes("cab")) {
      return <FaCar className="w-4 h-4 text-blue-800 dark:text-blue-300" />;
    } else if (step.toLowerCase().includes("vta")) {
      return <FaBus className="w-4 h-4 text-blue-800 dark:text-blue-300" />;
    } else {
      return <FaWalking className="w-4 h-4 text-blue-800 dark:text-blue-300" />; // Default icon
    }
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
            <CloseButtonTopRight onClick={closePopup}>✕</CloseButtonTopRight>
            <PopupTitle>{selectedOption.type} Timeline</PopupTitle>
            <Timeline>
              {selectedOption.timeline.map((step, index) => (
                <TimelineItem key={index}>
                  <TimelineIcon>{getIconForStep(step)}</TimelineIcon>
                  <TimelineContent>
                    <TimelineTitle>{step}</TimelineTitle>
                    {index !== selectedOption.timeline.length - 1 && (
                      <TimelineTime>Estimated Time</TimelineTime>
                    )}
                    {index !== selectedOption.timeline.length - 1 && (
                      <TimelineDescription>
                        Description of the step goes here.
                      </TimelineDescription>
                    )}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
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
    flex p-4 items-center m-4 cursor-pointer hover:bg-gray-100 w-full max-w-md mx-auto rounded-lg bg-gray-900 text-white text-left
`;

const OptionDetails = tw.div`
    flex-1
`;

const Type = tw.div`
    font-medium
`;

const Description = tw.div`
    text-xs 
`;

const Duration = tw.div`
    text-xs 
`;

const Price = tw.div`
    text-sm
`;

const Popup = tw.div`
    fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50
`;

const PopupContent = tw.div`
    bg-white p-10 rounded-lg shadow-lg w-3/4 max-w-md relative
`;

const CloseButtonTopRight = tw.button`
    absolute top-2 right-2  text-gray-600 rounded-full p-2 
`;

const PopupTitle = tw.div`
    text-lg font-bold mb-4
`;

const Timeline = tw.ol`
  relative border-l border-gray-200 dark:border-gray-700
`;

const TimelineItem = tw.li`
  mb-10 ml-6
`;

const TimelineIcon = tw.span`
  absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900
`;

const TimelineContent = tw.div`
  flex flex-col gap-2
`;

const TimelineTitle = tw.h3`
  mb-1 text-lg font-semibold text-gray-900 dark:text-white
`;

const TimelineTime = tw.time`
  block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500
`;

const TimelineDescription = tw.p`
  text-base font-normal text-gray-500 dark:text-gray-400
`;

const TimelineStep = tw.div`
    text-sm text-gray-700
`;

const CloseButton = tw.button`
    mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600
`;
