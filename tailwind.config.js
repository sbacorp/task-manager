/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Open Sans', 'sans-serif'],
    },
    colors: {
      'dark': '#C1C2C5',
      'dark1': '#A6A7AB',
      'dark2': '#909296',
      'dark3': '#5C5F66',
      'dark4': '#373A40',
      'dark5': '#2C2E33',
      'dark6': '#25262B',
      'dark7': '#1A1B1E',
      'dark8': '#141517 ',
      'dark9': '#101113',
      'gray0': '#F8F9FA',
      'gray1': '#F1F3F5',
      'gray2': '#E9ECEF',
      'gray3': '#DEE2E6',
      'gray4': '#CED4DA',
      'gray5': '#ADB5BD',
      'gray6': '#868E96',
      'gray7': '#495057',
      'gray8': '#343A40',
      'gray9': '#212529',
      'red0': '#FFF5F5',
      'red1': '#FFE3E3',
      'red2': '#FFC9C9',
      'red3': '#FFA8A8',
      'red4': '#FF8787',
      'red5': '#FF6B6B',
      'red6': '#FA5252',
      'red7': '#F03E3E',
      'red8': '#E03131',
      'red9': '#C92A2A',
      'pink0': '#FFF0F6',
      'pink1': '#FFDEEB',
      'pink2': '#FCC2D7',
      'pink3': '#FAA2C1',
      'pink4': '#F783AC',
      'pink5': '#F06595',
      'pink6': '#E64980',
      'pink7': '#D6336C',
      'pink8': '#C2255C',
      'pink9': '#A61E4D',
      'grape0': '#F8F0FC',
      'grape1': '#F3D9FA',
      'grape2': '#EEBEFA',
      'grape3': '#E599F7',
      'grape4': '#DA77F2',
      'grape5': '#CC5DE8',
      'grape6': '#BE4BDB',
      'grape7': '#AE3EC9',
      'grape8': '#9C36B5',
      'grape9': '#862E9C',
      'violet0': '#F3F0FF',
      'violet1': '#E5DBFF',
      'violet2': '#D0BFFF',
      'violet3': '#B197FC',
      'violet4': '##9775FA',
      'violet5': '#845EF7',
      'violet6': '#7950F2',
      'violet7': '#7048E8',
      'violet8': '#6741D9',
      'violet9': '#5F3DC4',
      'indigo0': '#EDF2FF',
      'indigo1': '#DBE4FF',
      'indigo2': '#BAC8FF',
      'indigo3': '#91A7FF',
      'indigo4': '#748FFC',
      'indigo5': '#5C7CFA',
      'indigo6': '#4C6EF5',
      'indigo7': '#4263EB',
      'indigo8': '#3B5BDB',
      'indigo9': '#364FC7',
      'blue0': '#E7F5FF',
      'blue1': '#D0EBFF',
      'blue2': '#A5D8FF',
      'blue3': '#74C0FC',
      'blue4': '#4DABF7',
      'blue5': '#339AF0',
      'blue6': '#228BE6',
      'blue7': '#1C7ED6',
      'blue8': '#1971C2',
      'blue9': '#1864AB',
      'cyan0': '#E3FAFC',
      'cyan1': '#C5F6FA',
      'cyan1': '#99E9F2',
      'cyan3': '#66D9E8',
      'cyan4': '#3BC9DB',
      'cyan5': '#22B8CF',
      'cyan6': '#15AABF',
      'cyan7': '#1098AD',
      'cyan8': '#0C8599',
      'cyan9': '#0B7285',
      'white':'#fff',
      'black': '#000',
    },
    container: {
      // you can configure the container to be centered
      center: true,
      // or have default horizontal padding
      // default breakpoints but with 40px removed
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
      },
    },
    extend: {
      width: {
        'main': '1240px'
      },
      minHeight: {
        'main': '90vh'
      },
      width:{
        '464':'464px',
      },
      fontSize:{
        '42': ['42px', '46px'],
        '22': ['22px', '34px'],
      }
      

    },
  },
  plugins: [],
}
