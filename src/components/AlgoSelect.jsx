import { Listbox, Transition } from "@headlessui/react"; 
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"; 
import React, { Fragment } from "react"; // Fragment to group multiple child elements
import { classNames } from "../utils/helpers"; 

// AlgoSelect Component
// Props: selectedAlgo (currently selected algorithm object), onSelect (callback to handle selection change)
const AlgoSelect = ({ selectedAlgo, onSelect }) => {
  return (
    // Listbox component handles the dropdown behavior
    <Listbox
      value={selectedAlgo} // Binds the current selection to the Listbox
      onChange={(value) => {
        if (!value) return; // Prevent selection of null or undefined values
        onSelect(value); // Trigger the onSelect callback with the new value
      }}
    >
      {({ open }) => ( // Render prop to track whether the dropdown is open
        <>
          {/* Dropdown container */}
          <div className="relative mt-1 ml-4 md:ml-0 flex min-w-[350px] justify-start items-center gap-4">
            {/* Button to trigger the dropdown */}
            <Listbox.Button
              className="relative w-full cursor-pointer inline-flex items-center bg-gray-600 text-[15px] text-white px-4 py-2 rounded-md shadow-md transition duration-150 ease-in-out hover:bg-gray-500 focus:outline-none"
            >
              {/* Display the selected algorithm name or a placeholder */}
              <span
                className={classNames(
                  selectedAlgo ? "text-white" : "text-gray-100", // Adjust text color based on whether an algorithm is selected
                  "block truncate" // Ensures the text is truncated if it overflows
                )}
              >
                {selectedAlgo?.name || "Select an algorithm"}
              </span>
              {/* Chevron icon for visual indication of dropdown */}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true" // Icon for accessibility purposes
                />
              </span>
            </Listbox.Button>

            {/* Transition for smooth opening and closing animations */}
            <Transition
              show={open} // Only show the dropdown options when open
              as={Fragment} // Avoid adding extra nodes to the DOM
              leave="transition ease-in duration-100" 
              leaveFrom="opacity-100" 
              leaveTo="opacity-0" 
            >
              {/* Dropdown options container */}
              <Listbox.Options className="absolute top-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {/* Map through the algorithms to render each option */}
                {[
                  {
                    name: "Dijkstra's algorithm", // Display name for the option
                    type: "DIJKSTRA", // Unique identifier for the algorithm
                  },
                  {
                    name: "Breadth-first Search",
                    type: "BFS",
                  },
                  {
                    name: "Depth-first Search",
                    type: "DFS",
                  },
                ].map((algo) => (
                  <Listbox.Option
                    key={algo.type} // Unique key for React rendering
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900", // Style changes on hover
                        "relative cursor-default select-none py-2 pl-3 pr-9" // Common styles for options
                      )
                    }
                    value={algo} // Value passed when the option is selected
                  >
                    {/* Render prop for option styles and content */}
                    {({ active }) => (
                      <>
                        {/* Algorithm name with dynamic styling */}
                        <span
                          className={classNames(
                            algo.type === selectedAlgo?.type
                              ? "font-semibold" // Bold font for selected item
                              : "font-normal", // Regular font for others
                            "block truncate"
                          )}
                        >
                          {algo.name}
                        </span>

                        {/* Check icon for the selected option */}
                        {algo.type === selectedAlgo?.type ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600", // Icon color based on active state
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

// return (
//   <div className="flex items-center gap-4 p-4">
//     <h1 className="text-2xl font-bold text-white">Pathfinding Visualizer</h1>
//     <Listbox
//       value={selectedAlgo}
//       onChange={(value) => {
//         if (!value) return;
//         onSelect(value);
//       }}
//     >
//       {({ open }) => (
//         <>
//           <div className="relative mt-1 flex">
//             <Listbox.Button className="relative w-fit cursor-pointer inline-flex items-center bg-gray-600 text-[15px] text-white px-4 py-2 rounded-md shadow-md transition duration-150 ease-in-out hover:bg-gray-500 focus:outline-none">
//               <span
//                 className={classNames(
//                   selectedAlgo ? "text-white" : "text-gray-100",
//                   "block truncate"
//                 )}
//               >
//                 {selectedAlgo?.name || "Select an algorithm"}
//               </span>
//               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                 <ChevronUpDownIcon
//                   className="h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//               </span>
//             </Listbox.Button>

//             <Transition
//               show={open}
//               as={Fragment}
//               leave="transition ease-in duration-100"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Listbox.Options className="absolute top-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//                 {[
//                   {
//                     name: "Dijkstra's algorithm",
//                     type: "DIJKSTRA",
//                   },
//                   {
//                     name: "Breadth-first Search",
//                     type: "BFS",
//                   },
//                   {
//                     name: "Depth-first Search",
//                     type: "DFS",
//                   },
//                 ].map((algo) => (
//                   <Listbox.Option
//                     key={algo.type}
//                     className={({ active }) =>
//                       classNames(
//                         active ? "text-white bg-indigo-600" : "text-gray-900",
//                         "relative cursor-default select-none py-2 pl-3 pr-9"
//                       )
//                     }
//                     value={algo}
//                   >
//                     {({ active }) => (
//                       <>
//                         <span
//                           className={classNames(
//                             algo.type === selectedAlgo?.type
//                               ? "font-semibold"
//                               : "font-normal",
//                             "block truncate"
//                           )}
//                         >
//                           {algo.name}
//                         </span>

//                         {algo.type === selectedAlgo?.type ? (
//                           <span
//                             className={classNames(
//                               active ? "text-white" : "text-indigo-600",
//                               "absolute inset-y-0 right-0 flex items-center pr-4"
//                             )}
//                           >
//                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                           </span>
//                         ) : null}
//                       </>
//                     )}
//                   </Listbox.Option>
//                 ))}
//               </Listbox.Options>
//             </Transition>
//           </div>
//         </>
//       )}
//     </Listbox>
//   </div>
// );
// }

export default AlgoSelect;
