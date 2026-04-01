export default function GameEntryForm() {
  return (
    <div>
      {/* Main Container */}
      <div>
        {/* Title Bar */}
        <h1>Game Entry Form</h1>
      </div>
      <div>
        {/* Form component. Do we move this to its own .jsx? */}
        <div>
          {/* Part where the form is filled out */}
          <label>
            Home Team
            <input type="text" name="" />
          </label>
          <label>
            Away Team
            <input type="text" name="" />
          </label>
          <label>
            Location
            <input type="text" name="" />
          </label>
          <label>
            Date/Time
            <input type="date" name="" />
          </label>
        </div>
        <div>{/* Preview area. No idea how we're gonna do this */}</div>
      </div>
    </div>
  );
}
