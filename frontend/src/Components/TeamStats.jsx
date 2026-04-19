export default function TeamStats() {
  return (
    <div className="min-h-screen w-full bg-zinc-900">
      {/* External Container */}
      <div>
        {/* Main container*/}
        <div className="flex items-center gap-4 bg-zinc-800 p-3 rounded-md shadow-md flex-wrap">
          {/*  !!!!   CSS this to make it into a single bar with filtering options please    !!!! */}
          {/* Part of the component that has the filtering options */}
          {/* Select Year option */}
          <div className="flex flex-col text-white text-sm">
            <select name="Select Year" id="">
              <option value="">Select Year</option>
            </select>
          </div>
          {/* Select Age Group option */}
          <div className="flex flex-col text-white text-sm">
            <select name="Select Age Group" id="">
              <option value="">Select Age Group</option>
            </select>
          </div>
          {/* Select Unit option */}
          <div>
            <select name="Select Unit" id="">
              <option value="">Select Unit</option>
            </select>
          </div>
          {/* Select Category option */}
          <div>
            <select name="Select Category" id="">
              <option value="">Select Category</option>
            </select>
          </div>
        </div>

        <div>
          {/* Part of the component that displays the actual data according to filtering options picked */}
          <div>
            {/* Each individual stat will have its own "container" or div tag */}
            <p>Att: {/* Number goes here */}</p>
            <p>Cmp: {/* Number goes here */}</p>
            <p>Cmp %: {/* Number goes here */}</p>
            {/* You get the idea */}
          </div>
        </div>
      </div>
    </div>
  );
}
