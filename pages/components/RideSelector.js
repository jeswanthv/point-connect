import { useState } from "react";
import {
  FaArrowRight,
  FaBolt,
  FaBus,
  FaCar,
  FaDollarSign,
  FaTrain,
  FaWalking,
} from "react-icons/fa";
import tw from "tailwind-styled-components";

function RideSelector({ economy }) {
  const [rideOptions, setRideOptions] = useState([
    {
      type: "Economy",
      description: "Walk / Cab / VTA Ride / Caltrain",
      duration: ["10 mins", "8 mins", "15 mins", "35 mins"],
      price: ["$0.00", "$8.00", "$2.50", "$10.00"],
      timeline: ["Walk", "Cab", "vta", "caltrain", "Reach Destination"],
    },
    {
      type: "Faster Travel",
      description: ["Cab"],
      duration: ["43 min"],
      price: ["$45.00"],
      timeline: ["Cab Ride", "Reach Destination"],
    },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    economy(option.type === "Economy");
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
    } else if (step.toLowerCase().includes("train")) {
      return <FaTrain className="w-4 h-4 text-blue-800 dark:text-blue-300" />;
    } else if (step.toLowerCase().includes("destination")) {
      return (
        <FaArrowRight className="w-4 h-4 text-blue-800 dark:text-blue-300" />
      );
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
              <Type>
                {option.type === "Economy" && (
                  <FaDollarSign className="inline-block mr-2 text-green-500" />
                )}
                {option.type === "Faster Travel" && (
                  <FaBolt className="inline-block mr-2 text-yellow-500" />
                )}
                {option.type}
              </Type>
              <Description>{option.description}</Description>
              <Duration>
                {(() => {
                  const totalMinutes = option.duration.reduce((total, time) => {
                    const [value, unit] = time.split(" ");
                    const numericValue = parseInt(value, 10);
                    if (unit.includes("hour")) {
                      return total + numericValue * 60;
                    } else if (unit.includes("min")) {
                      return total + numericValue;
                    }
                    return total;
                  }, 0);
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;
                  return `${
                    hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""} ` : ""
                  }${
                    minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : ""
                  }`;
                })()}
              </Duration>
            </OptionDetails>
            <Price>
              {"$" +
                option.price
                  .reduce((total, current) => {
                    const numericValue = parseFloat(
                      current.replace(/[^0-9.-]+/g, "")
                    );
                    return total + (isNaN(numericValue) ? 0 : numericValue);
                  }, 0)
                  .toFixed(2)}
            </Price>
          </OptionButton>
        ))}
      </OptionsList>

      {selectedOption && (
        <Popup>
          <PopupContent>
            <CloseButtonTopRight onClick={closePopup}>✕</CloseButtonTopRight>
            <PopupTitle>{selectedOption.type}</PopupTitle>
            <Timeline>
              {selectedOption.timeline.map((step, index) => (
                <TimelineItem key={index}>
                  <TimelineIcon>{getIconForStep(step)}</TimelineIcon>
                  <TimelineContent>
                    <TimelineTitle>{step}</TimelineTitle>
                    {index !== selectedOption.timeline.length - 1 && (
                      <TimelineTime>
                        {selectedOption.duration[index] || "N/A"}
                      </TimelineTime>
                    )}
                    {index !== selectedOption.timeline.length - 1 && (
                      <TimelineDescription>
                        Cost: {selectedOption.price[index] || "N/A"}
                      </TimelineDescription>
                    )}
                    {/* {index !== selectedOption.timeline.length - 1 && (
                      <TimelineDescription>
                        Description of the step goes here.
                      </TimelineDescription>
                    )} */}
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
    text-xs ml-6
`;

const Duration = tw.div`
    text-xs ml-6
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
  mb-5 ml-6
`;

const TimelineIcon = tw.span`
  absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900
`;

const TimelineContent = tw.div`
  flex flex-col gap-2
`;

const TimelineTitle = tw.h3`
  text-lg font-semibold text-gray-900 dark:text-white
`;

const TimelineTime = tw.time`
  block text-sm font-normal leading-none text-gray-400 dark:text-gray-500
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
