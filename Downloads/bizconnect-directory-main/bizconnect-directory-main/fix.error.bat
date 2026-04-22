@echo off
echo Fixing BizConnect Project Errors...

cd frontend

echo Installing missing dependencies...
npm install lucide-react axios react-router-dom formik yup @reduxjs/toolkit react-redux @headlessui/react chart.js react-chartjs-2 date-fns react-star-ratings @auth0/auth0-react

echo Installing dev dependencies...
npm install -D tailwindcss postcss autoprefixer

echo Initializing Tailwind CSS...
npx tailwindcss init -p

echo Creating missing directories...
mkdir src\pages\admin 2>nul
mkdir src\pages\business 2>nul
mkdir src\pages\user 2>nul
mkdir src\components\business 2>nul
mkdir src\components\layout 2>nul
mkdir src\components\reviews 2>nul
mkdir src\components\routing 2>nul
mkdir src\redux\slices 2>nul
mkdir src\utils 2>nul

echo Fixing case sensitivity...
rename src\pages\business\createBusiness.js CreateBusiness.js 2>nul

echo.
echo All fixes applied!
echo.
echo Now run: npm start
pause