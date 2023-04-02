import { useState, useRef } from 'react';
// import { debounce } from "lodash";

function Search({
  value,
  setValue,
  classes,
}: {
  value: string;
  setValue: (arg: string) => void;
  classes?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue('');
    inputRef.current?.focus();
  };
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(e.target.value);
    // updateSearch(e.target.value);
  };
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className={`sm:${
          classes || 'w-[300px]'
        } rounded bg-black w-[290px] border border-solid border-gray6 px-10 py-3 hover:border-gray4  focus:border-gray3 focus:border transition-all duration-300 font-serif text-lg`}
        value={value}
        onChange={(e) => onChangeInput(e)}
        placeholder="Поиск"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 96 960 960"
        width="24"
        fill="#868E96"
        className="absolute top-1/4 left-3"
      >
        <path d="M795.761 941.696 531.326 677.5q-29.761 25.264-69.6 39.415-39.84 14.15-85.161 14.15-109.835 0-185.95-76.195Q114.5 578.674 114.5 471t76.196-183.87q76.195-76.195 184.369-76.195t183.87 76.195q75.695 76.196 75.695 184.02 0 43.328-13.641 82.97-13.641 39.641-40.924 74.402L845.5 891.957l-49.739 49.739ZM375.65 662.935q79.73 0 135.29-56.245Q566.5 550.446 566.5 471t-55.595-135.69q-55.595-56.245-135.255-56.245-80.494 0-136.757 56.245Q182.63 391.554 182.63 471t56.228 135.69q56.227 56.245 136.792 56.245Z" />
      </svg>
      {value && (
        <svg
          onClick={onClickClear}
          fill="#868E96"
          className="absolute right-3 top-1/3 -translate-y-[2px]"
          viewBox="0 0 22 22"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
