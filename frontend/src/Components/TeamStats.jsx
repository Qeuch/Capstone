export default function TeamStats() {
  return (
    <div>
      {/* Main container*/}
      <div>
        {/* Part of the component that has the filtering options */}
        <select name="Select Year" id="">
          <option value=""></option>
        </select>
        <select name="Select Age Group" id="">
          <option value=""></option>
        </select>
        <select name="Select Unit" id="">
          <option value=""></option>
        </select>
        <select name="Select Category" id="">
          <option value=""></option>
        </select>
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
  );
}
